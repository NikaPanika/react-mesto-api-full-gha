const jwt = require('jsonwebtoken');
const AuthError = require('../erorrs/authError');

/* const { NODE_ENV } = process.env;
const { JWT_SECRET } = process.env; */

const JWT_SECRET = 'strange-secret-key';

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  /* const token = req.cookies.jwt; */
  const bearer = 'Bearer ';
  if (!authorization || !authorization.startsWith(bearer)) {
    throw new AuthError('Сначала авторизируйтесь');
  }
  const token = authorization.replace(bearer, '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthError('Сначала авторизируйтесь');
  }

  req.user = payload;

  next();
};

module.exports = auth;
