declare var require: any;
var React = require('react');
import { ContactInfo } from "../../components/contactinfo";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';

export const EditContact = (props) => {
    
    const { info } = props;
    console.log(info);
    if (!info || info.length === 0) return <p></p>;

    return (
        <div className="contact-edit__container">
            <h2>Редактировать запись</h2>
            <div className="contact-edit__info">
                <label className="contact__name">Имя<input className="contact__field__input" type="text" defaultValue={info.name} />
                </label>
                {info.fields.map((field) => {
                    return (
                        <div className="contact__field" key={field.field_id}>
                            <label>{field.field_name}<input className="contact__field__input" type="text" defaultValue={field.field_value} /></label>
                        </div>
                    )
                })}
            </div>
        </div>
    );

};