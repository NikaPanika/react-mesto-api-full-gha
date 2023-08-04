import {useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [place, setPlace] = useState("");
    const [link, setLink] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: place,
            link: link,
        });

    }

    function handleChangePlace(e) {
        setPlace(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

   useEffect(() => {
        setPlace("");
        setLink("");
    }, [isOpen]);

    return (
        <PopupWithForm
            title={"Новое место"}
            name={"new-place"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input type="text"
                className="popup__input popup__input_type_place"
                name="name"
                placeholder="Название"
                required
                minLength='2'
                maxLength='30'
                id="place-input"
                onChange={handleChangePlace} 
                value={place}/>
            <span className="popup__input-error place-input-error"></span>
            <input type="url"
                className="popup__input popup__input_type_link"
                name="link"
                placeholder="Ссылка на картинку"
                required id="link-input"
                onChange={handleChangeLink}
                value={link} />
            <span className="popup__input-error link-input-error"></span>
        </PopupWithForm>)
}

export default AddPlacePopup;