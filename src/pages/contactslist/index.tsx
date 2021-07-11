declare var require: any;
var React = require('react');
import { useState, useEffect } from 'react';
import { ContactsList } from "../../components/contactslist";

export const ContactsListPage = (props) => {
    const [contactsState, setContactsState] = useState({
        contacts: null, loading: true,
    });

    const [reloadPage, setReloadPage] = useState(false);

    const reloadContacts = () => {
        setReloadPage(!reloadPage);
    }

    const { addLogRequest } = props;
                
    useEffect(() => {
        addLogRequest("GET запрос .../contacts/");
        const apiUrl = 'src/pages/contactslist/TelBook.json';
        fetch(apiUrl)
            .then((response) => { return response.json() })
            .then((data) => setContactsState({ contacts: data.contacts, loading: false }));
    }, [reloadPage]);

    return (
        <ContactsList reloadContacts={reloadContacts} contacts={contactsState.contacts} loading={contactsState.loading} addLogRequest={addLogRequest}/>
    )
};
