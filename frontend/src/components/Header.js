import React from 'react';
import headerLogo from '../images/logo.svg';
import { Route, Routes, NavLink } from "react-router-dom";;

function Header({ userEmail, signOut, isLogged }) {
    return (
        <header className="header">
            <div className="header__container">
                <img src={headerLogo} alt="Логотип Mesto" className="header__logo" />
                <div className="header__menu">
                    {isLogged && <p className="header__email">{userEmail}</p>}
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <NavLink
                                    className="header__link"
                                    to="/sign-in"
                                    onClick={signOut}>Выйти</NavLink>
                            }
                        />
                        <Route
                            path="/sign-up"
                            element={
                                <NavLink
                                    className="header__link"
                                    to="/sign-in">Войти</NavLink>
                            }
                        />
                        <Route
                            path="/sign-in"
                            element={
                                <NavLink
                                    className="header__link"
                                    to="/sign-up">Регистрация</NavLink>
                            }
                        />
                    </Routes>
                </div>
            </div>
        </header>
    )
};

export default Header;