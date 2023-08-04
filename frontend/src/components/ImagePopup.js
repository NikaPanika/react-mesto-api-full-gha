import React from 'react';

function ImagePopup({ card, isOpen, onClose }) {
    return (
        <div className={`popup popup_type_big-image ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__case">
                <button className="popup__close-button" type="button" onClick={onClose}></button>
                <img src={card.link} alt="Нужное изображение отсутствует" className="popup__photo" />
                <h2 className="popup__caption">{card.name}</h2>
            </div>
        </div>
    );
}

export default ImagePopup;