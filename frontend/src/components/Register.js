import React from "react";
import Entrance from "./Entrance";
import { Link } from "react-router-dom";

function Register({ title, formName, buttonName, onSubmit }) {

    return (
        <>
            <Entrance
                title={title}
                formName={formName}
                buttonName={buttonName}
                onSubmit={onSubmit}
            />
            <p className="entrance-container__subtitle">
                Уже зарегистрированы?&ensp;<Link to="/sign-in" className="entrance-container__link" >Войти</Link>
            </p>
        </>
    )
}

export default Register;