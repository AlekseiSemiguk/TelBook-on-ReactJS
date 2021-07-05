declare var require: any;
var React = require('react');
import { useState, useEffect } from 'react';
import { ContactsList } from "../../components/contactslist";

export const ContactsListPage = () => {
    const [appContactsState, setContactsState] = useState({
        contacts: null,
    });

    useEffect(() => {
        const apiUrl = 'src/pages/contactslist/TelBook.json';
        fetch(apiUrl)
            .then((response) => response.json())
            //.then((data) => console.log('This is your data', data));
            .then((data) => setContactsState({ contacts: data.contacts }));
    }, [setContactsState]);

    return (
        <ContactsList contacts={appContactsState.contacts} />
    )
};
