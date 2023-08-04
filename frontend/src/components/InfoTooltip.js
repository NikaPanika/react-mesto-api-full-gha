import React from "react";
import fail from "../images/fail.svg";
import success from "../images/Union.svg";

function InfoTooltip({ isOpen, onClose, name, isRegistered, text }) {

    return (
        <>
            <div
                className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
            >
                <div className="popup__container">
                    <button className="popup__close-button" type="button" onClick={onClose} />
                    <div className="info-tooltip__container">
                        <img className="info-tooltip__image"
                            src={isRegistered ? success : fail}
                            alt={name} />
                        <h2 className="info-tooltip__subtitle">{text}</h2>
                    </div>
                </div>
            </div>
        </>

    );
}

export default InfoTooltip;