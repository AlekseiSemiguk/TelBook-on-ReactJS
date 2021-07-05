declare var require: any;
var React = require('react');
import { useState } from 'react';
import { ContactInfo } from "../../components/contactinfo";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';

export const ContactsList = (props) => {

    const [appShowModalWindow, setShowModalWindow] = useState(false);
    const [appDeletedContact, setDeletedContact] = useState(null);

    const handleDeleteContact = (del_contactId) => {
        setDeletedContact(del_contactId);
        setShowModalWindow(true);
    }

    const handleConfirmAction = () => {

        let message = {"action": "delete", "deleted_contact_id": appDeletedContact}

        fetch('https://httpbin.org/post', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        })
            .then(res => res.json())
            .then(res => console.log(res));
        setDeletedContact(null);
        setShowModalWindow(false);
    }

    const handleCancelAction = () => {
        setDeletedContact(null);
        setShowModalWindow(false);
    }

    const { contacts } = props;
    console.log(contacts);
    if (!contacts || contacts.length === 0) return <p>В телефонной книге нет контактов</p>;

    let modalwindow;

    if (appShowModalWindow == true) {
        modalwindow = (
            <div className="modal-window__background">
                <div className="modal-window">
                    <div className="modal-window__text">Подтвердите удаление контакта</div>
                    <div className="modal-window__buttons">
                        <div className="modal-window__button" onClick={handleConfirmAction}>ОК</div>
                        <div className="modal-window__button" onClick={handleCancelAction}>Отмена</div>
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <div className="contact__container">
            <h2>Телефонный справочник</h2>
            <ul className="contact__list">
                {contacts.map((contact) => {
                    return (
                        <li key={contact.id}>
                            <div className="contact__border">
                                <div className="contact__label">
                                    <div className="contact__name">{contact.name}</div>
                                    <div className="contact__icons">
                                        <div className="contact__icon">
                                            <Link to={"/edit/" + contact.id}>
                                            <img src="/src/img/edit_icon.png" alt="edit" />
                                            </Link>
                                        </div>
                                        <div className="contact__icon" onClick={handleDeleteContact.bind(this, contact.id)}>
                                            <img src="/src/img/delete_icon.png" alt="delete" />
                                        </div>
                                        <label htmlFor={contact.id} className="contact__icon">
                                            <img src="/src/img/info_icon.jpg" alt="toggle" />
                                        </label>
                                    </div>
                                </div>
                                <input className="contact-checkbox" type="checkbox" id={contact.id} />
                                <div className="contact__info__container info-container-js">
                                    <ContactInfo info={contact.fields} />
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <Link to={"/create"}>
                <div className="contact_add">Добавить запись</div>
            </Link>
            {modalwindow}
        </div>
    );
};