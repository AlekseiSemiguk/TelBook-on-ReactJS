declare var require: any;
var React = require('react');

export const Modal = (props) => {
    const {show, confirmAction, cancelAction, text} = props;

    if (!show) {
        return false;
    } else {
        return (
            <div className="modal-window__background">
                <div className="modal-window">
                    <div className="modal-window__text">{text}</div>
                    <div className="modal-window__buttons">
                        <div className="modal-window__button" onClick={confirmAction}>ОК</div>
                        <div className="modal-window__button" onClick={cancelAction}>Отмена</div>
                    </div>
                </div>
            </div>
        )
    }
};