declare var require: any;
var React = require('react');
import { useState } from 'react';
import { Fields } from "./fields";
import { Modal } from "../modal/confirm";
import {
    Link,
    Redirect,
} from 'react-router-dom';

export const Contacts = (props) => {
    const [showModalWindow, setShowModalWindow] = useState(false);
    const [deletedContact, setDeletedContact] = useState(null);
    const { contacts, addLogRequest, reloadContacts } = props;

    const handleDeleteContact = (del_contactId) => {
        setDeletedContact(del_contactId);
        setShowModalWindow(true);
    }

    const handleConfirmAction = () => {
        const message = { "action": "delete", "deleted_contact_id": deletedContact }
        addLogRequest("POST запрос: body = " + JSON.stringify(message));

        fetch('https://httpbin.org/post', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                reloadContacts();
                setDeletedContact(null);
                setShowModalWindow(false);
            });
    }

    const handleCancelAction = () => {
        setDeletedContact(null);
        setShowModalWindow(false);
    }
    
    if (!contacts || contacts.length == 0) {
        return <h5> записи в телефонной книге отсутствуют</h5>
    } else {
        return (
            <div>
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
                                        <Fields info={contact.fields} />
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <Modal show={showModalWindow} text="Подтвердите удаление контакта" confirmAction={handleConfirmAction} cancelAction={handleCancelAction} />
            </div>
        )
    }

};