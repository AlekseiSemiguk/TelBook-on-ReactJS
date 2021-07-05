declare var require: any;
var React = require('react');
import { EditContact } from "../../components/editcontact";
import { useState } from 'react';

export const CreateContactPage = () => {
    const [appContactInfoState, setContactInfoState] = useState({
        info: {
            "id": "new_contact",
            "name": "",
            "fields": []
        }
    });
    
    return (
        <EditContact type="new_contact" setContactInfoState={setContactInfoState} appContactInfoState={appContactInfoState} />
    )
    
};