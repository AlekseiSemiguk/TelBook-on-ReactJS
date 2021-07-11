declare var require: any;
var React = require('react');
import { useState } from 'react';

export const AddNewField = (props) => {
    const [newFieldNameState, setNewFieldNameState] = useState("");
    const [newFieldId, setNewFieldId] = useState(1);

    const { setContactInfoState, setErrors } = props;

    const handleChangeNewFieldName = e => {
        const { value } = e.target;
        setNewFieldNameState(value)
    }

    const handleNewField = e => {
        if (newFieldNameState == "") {
            setErrors(["Введите название нового поля"]);
        } else {
            setErrors([]);
            const field_id = "not_assigned " + newFieldId;
            setNewFieldId(newFieldId + 1);
            const field_name = newFieldNameState;

            setContactInfoState(prevState => ({
                ...prevState,
                info: {
                    ...prevState.info,
                    fields: [...prevState.info.fields.slice(0), { 'field_id': field_id, 'field_name': field_name, 'field_value': "" }],
                }
            }));

            setNewFieldNameState("");
        }
    }


    return (
        <div className="contact-new-field">
            <label>Добавить новое поле<input onChange={handleChangeNewFieldName} name="new_field" className="contact__field__input" type="text"
                placeholder="Введите название поля" value={newFieldNameState} /></label>
            <div onClick={handleNewField} className="contact_fieldadd_button">Добавить</div>
        </div>
    )
};