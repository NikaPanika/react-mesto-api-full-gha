const http2 = require('http2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const AuthError = require('../erorrs/authError');
const DuplicationError = require('../erorrs/dataDuplication');
const NotFoundError = require('../erorrs/notFound');
const BadRequest = require('../erorrs/badRequest');

const { JWT_SECRET = 'strange-secret-key' } = process.env;
const { NODE_ENV } = process.env;

const {
  HTTP_STATUS_CREATED,
} = http2.constants;

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then(() => res.status(HTTP_STATUS_CREATED)
          .send({
            name, about, avatar, email,
          }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new DuplicationError('Пользователь с таким Email уже существует'));
          } else if (err.name === 'ValidationError') {
            next(new BadRequest('Невалидные данные'));
          } else {
            next(err);
          }
        });
    }).catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильные почта или пароль');
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправильные почта или пароль');
          }
          const token = jwt.sign(
            { id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'strange-secret-key',
            { expiresIn: '7d' },
          );
          return res.send({ jwt: token });
        })
        .catch(next);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const { id } = req.user;
  User.findById(id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const returnUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const returnUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send(user);
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { id } = req.user;

  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true, upsert: false })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Невалидные данные'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { id } = req.user;
  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true, upsert: false })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Невалидные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser, returnUsers, returnUserById, updateProfile, updateAvatar, login, getUser,
};
