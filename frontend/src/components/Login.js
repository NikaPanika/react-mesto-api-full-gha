import React from "react";
import Entrance from "./Entrance";

function Login({ title, formName, buttonName, onSubmit }) {

    return (
        <Entrance
            title={title}
            formName={formName}
            buttonName={buttonName}
            onSubmit={onSubmit} />
    )
}

export default Login;