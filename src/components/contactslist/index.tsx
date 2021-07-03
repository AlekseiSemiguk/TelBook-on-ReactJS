declare var require: any;
var React = require('react');
import { ContactInfo } from "../../components/contactinfo";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';

export const ContactsList = (props) => {
    
    const { contacts } = props;
    console.log(contacts);
    if (!contacts || contacts.length === 0) return <p>В телефонной книге нет контактов</p>;
    
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
                                        <div className="contact__icon">
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
        </div>
    );
};