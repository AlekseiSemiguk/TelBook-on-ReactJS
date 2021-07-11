declare var require: any;
var React = require('react');
import { Contacts } from "./contacts";
import {
    Link,
} from 'react-router-dom';

export const ContactsList = (props) => {

    const { reloadContacts, contacts, loading, addLogRequest } = props;
    
    if (loading) return <p>загрузка записей телефонной книги...</p>;

    return (
        <div className="contact__container">
            <h2>Телефонный справочник</h2>
            <Contacts reloadContacts={reloadContacts} contacts={contacts} addLogRequest={addLogRequest}/>
            <Link to={"/create"}>
                <div className="contact_add">Добавить запись</div>
            </Link>
        </div>
    );
};