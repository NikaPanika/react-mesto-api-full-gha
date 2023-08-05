import '../index.css';
import { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from "./Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";
import Register from './Register';
import InfoTooltip from './InfoTooltip';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
    auth
      .checkToken(token)
      .then((res) => {
        if (res) {
          setIsLogged(true);
          navigate("/", { replace: true });
          setUserEmail(res.email);
          setCurrentUser(res);
        }
      })
      .catch(console.error);
    }
  }, []);

  useEffect(() => {
    if (isLogged) {
      api.getUser()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(`Ошибка profile: ${err}`)
        });
      api.getInitialCards()
        .then((initialCards) => {
          setCards(initialCards.data);
        }).catch((err) => {
          console.log(`Ошибка cards: ${err}`)
        })
    };
  }, [isLogged]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsLoginConfirmed(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? newCard.data : c));
      }).catch((err) => {
        console.log(`Ошибка cards: ${err}`)
      });
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      }).catch((err) => {
        console.log(`Ошибка cards: ${err}`)
      });
  }

  function handleUpdateUser(inputs) {
    api
      .setUserInfo(inputs) //сделать запрос к серверу на добавление
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error)
  }

  function handleUpdateAvatar(link) {

    api
      .setAvatar(link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();

      })
      .catch(console.error);
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [text, setText] = useState("");
  const [isLoginConfirmed, setIsLoginConfirmed] = useState(false);

  function handleLogin({ email, password }) {
    auth
      .login({ email, password })
      .then((res) => {
        console.log(res);
        setUserEmail(email);
        setIsLogged(true);
        navigate("/", { replace: true });
        localStorage.setItem("jwt", res.token);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleRegister({ email, password }) {

    auth
      .register({ email, password })
      .then(() => {
        navigate("/sign-in", { replace: true });
        setIsRegistered(true);
        setText("Вы успешно зарегистрировались!");
      })
      .catch((err) => {
        console.log(err);
        setIsRegistered(false);
        setText("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(() => {
        setIsLoginConfirmed(true);
      });
  }

  function onSignOut() {
    //localStorage.removeItem("jwt");
    setUserEmail("");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header userEmail={userEmail} signOut={onSignOut} isLogged={isLogged} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              isLogged={isLogged}
            />
          }
        />
        <Route
          path="*"
          element={isLogged ? (<Navigate to="/" />) : (<Navigate to="/sign-up" replace />)}
        />

        <Route
          path="/sign-up"
          element={
            <Register
              onSubmit={handleRegister}
              title={"Регистрация"}
              formName={"sign-up"}
              buttonName={"Зарегистрироваться"}
            />
          }
        />

        <Route
          path="/sign-in"
          element={
            <Login
              onSubmit={handleLogin}
              title={"Вход"}
              formName={"sign-in"}
              buttonName={"Войти"}
            />
          }
        />
      </Routes>
      <InfoTooltip
        isOpen={isLoginConfirmed}
        name={'confirmation'}
        onClose={closeAllPopups}
        text={text}
        isRegistered={isRegistered} />
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit} />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar} />
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups} />
      <div className="popup popup-delete">
        <div className="popup__container">
          <form className="popup__form popup__form_popup-delete">
            <button className="popup__close-button" type="button"></button>
            <h2 className="popup__header popup-delete__header">Вы уверены?</h2>
            <button className="popup__save-button popup-delete__save-button" type="submit">Да</button>
          </form>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
