declare var require: any;
var React = require('react');
import { EditContact } from "../../components/editcontact";
import { useState } from 'react';

export const CreateContactPage = (props) => {
    const { addLogRequest } = props;
    const [contactInfoState, setContactInfoState] = useState({
        info: {
            "id": "new_contact",
            "name": "",
            "fields": []
        }
    });
    
    return (
        <EditContact type="new_contact" setContactInfoState={setContactInfoState} contactInfoState={contactInfoState} addLogRequest={addLogRequest}/>
    )
    
};