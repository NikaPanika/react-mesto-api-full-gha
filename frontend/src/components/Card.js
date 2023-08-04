import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card,
    onCardClick,
    onCardLike,
    onCardDelete }) {
    const { name, link, likes } = card;

    const imageOnError = (event) => {
        event.currentTarget.src = 'https://sanberg.ru/photos/ITC_PLAIN_1.jpg';
        event.currentTarget.alt = 'Изображение недоступно';
    };

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const cardLikeButtonClassName =
        `photo-grid__like ${isLiked && 'photo-grid__like_on'}`;

    return (
        <article className="photo-grid__element">
            <img alt={name}
                src={link}
                className="photo-grid__photo"
                onClick={() => onCardClick(card)}
                onError={imageOnError} />
            {isOwn && <button className="photo-grid__delete" type="button" onClick={() => onCardDelete(card)}/> } 
            <div className="photo-grid__text">
                <h2 className="photo-grid__place">{name}</h2>
                <div className="photo-grid__like-container">
                    <button className={cardLikeButtonClassName} onClick={() => onCardLike(card)} type="button"></button>
                    <p className="photo-grid__like-counter">{likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;