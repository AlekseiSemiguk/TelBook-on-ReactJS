declare var require: any;
var React = require('react');
import { useState } from 'react';
import {
    Redirect
} from 'react-router-dom';

export const Modal = (props) => {

    const [redirect, setRedirect] = useState(false);

    const { show, redirectLink, text } = props;

    const confirmHandle = () => {
        setRedirect(true);
    }

    if (!show) {
        return false;
    } else if (redirect) {
        return (
            <Redirect to={redirectLink} />
        )
    } else {
        return (
            <div className="modal-window__background">
                <div className="modal-window">
                    <div className="modal-window__text">{text}</div>
                    <div className="modal-window__buttons">
                        <div className="modal-window__button" onClick={confirmHandle}>ОК</div>
                    </div>
                </div>
            </div>
        )
    }
};