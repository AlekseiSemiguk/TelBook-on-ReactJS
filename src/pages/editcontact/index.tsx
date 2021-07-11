declare var require: any;
var React = require('react');
import { useState, useEffect } from 'react';
import {
    useParams,
} from 'react-router-dom';
import { EditContact } from "../../components/editcontact";

export const EditContactPage = (props) => {
    const { contactId } = useParams();

    const { addLogRequest } = props;

    const [contactInfoState, setContactInfoState] = useState({
        info: null, loading: true,
    });

    useEffect(() => {
        addLogRequest("GET запрос .../contacts/" + contactId);
        const apiUrl = '../src/pages/editcontact/' + contactId + '.json';
        fetch(apiUrl)
            .then((response) => { return response.json() })
            .then((data) =>  setContactInfoState({ info: data, loading: false }));
    }, [setContactInfoState]);

    return (
        <EditContact type="edit_contact" setContactInfoState={setContactInfoState} contactInfoState={contactInfoState} addLogRequest={addLogRequest }/>
    )

};