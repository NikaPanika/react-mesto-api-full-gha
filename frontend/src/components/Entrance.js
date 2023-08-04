import { useState } from 'react';

function Entrance({ title, formName, buttonName, onSubmit }) {

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(loginData);
    };

    return (
        <div className="entrance-container">
            <h2 className="entrance-container__title">{title}</h2>
            <form
                className="entrance-container__form "
                name={formName}
                onSubmit={handleSubmit}
            >
                <div>
                    <input type="text"
                        className="popup__input popup__input_type_black"
                        name="email"
                        placeholder="Email"
                        required
                        minLength='2'
                        maxLength='30'
                        id="email-input"
                        onChange={(e) => handleChange(e)}
                    />
                    <span className="popup__input-error place-input-error"></span>

                    <input type="password"
                        className="popup__input popup__input_type_black"
                        name="password"
                        placeholder="Пароль"
                        required
                        minLength="2"
                        maxLength="200"
                        id="password-input"
                        onChange={(e) => handleChange(e)}
                    />
                    <span className="form__input-error form__about-input-error"></span>

                </div>
                <div>
                    <button
                        className="popup__save-button popup__save-button_type_black"
                        type="submit"
                    >{buttonName}</button>
                </div>
            </form>
        </div>
    );
}

export default Entrance;