declare var require: any;
var React = require('react');
import { useState, useEffect } from 'react';
import {
    useParams,
} from 'react-router-dom';
import { EditContact } from "../../components/editcontact";

export const EditContactPage = () => {
    const { contactId } = useParams();

    const [appContactInfoState, setContactInfoState] = useState({
        info: null,
    });

    useEffect(() => {
        const apiUrl = '../src/pages/editcontact/' + contactId + '.json';
        fetch(apiUrl)
            .then((response) => response.json())
            //.then((data) => console.log('This is your data', data));
            .then((data) => setContactInfoState({ info: data }));
    }, [setContactInfoState]);

    return (
        <EditContact info={appContactInfoState.info} />
    )

};