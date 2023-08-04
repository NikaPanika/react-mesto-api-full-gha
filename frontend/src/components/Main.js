import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardDelete,
    cards }) {

    const UserContext = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__about">
                    <div className="profile__avatar-container">
                        <button className="profile__overlay" onClick={onEditAvatar}></button>
                        <img src={UserContext.avatar} alt="Фотография" className="profile__avatar" />
                    </div>
                    <div className="profile__info">
                        <div className="profile__string">
                            <h1 className="profile__name">{UserContext.name}</h1>
                            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                        </div>
                        <p className="profile__description">{UserContext.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace} />
            </section>
            <section className="photo-grid">
                {
                    cards.map((item) => {
                        return (

                            <Card
                                key={item._id}
                                card={item}
                                onCardClick={onCardClick}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete}
                            />
                        )
                    })}
            </section>
        </main>
    );
};

export default Main;