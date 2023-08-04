import {useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value/* Значение инпута, полученное с помощью рефа */,
        });
    }

    useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm
            title={"Обновить аватар"}
            name={"avatar"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input type="url"
                className="popup__input popup__input_type_link"
                name="link"
                placeholder="Ссылка на картинку"
                required
                id="link-avatar"
                ref={avatarRef} />
            <span className="popup__input-error link-avatar-error"></span>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;