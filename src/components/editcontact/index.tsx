declare var require: any;
var React = require('react');
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';

export const EditContact = (props) => {
    const [appNewFieldNameState, setNewFieldNameState] = useState("");
    const [appNewFieldId, setNewFieldId] = useState(1);
    const [appErrors, setErrors] = useState([]);

    const { setContactInfoState } = props;
    const { appContactInfoState } = props;
    const { type } = props;

    const info = appContactInfoState.info;

    if (!info || info.length === 0) return <p></p>;

    function handleSubmit(e) {
        e.preventDefault();
        if (appContactInfoState.info.name == "") {
            setErrors(['Поле "Имя" не может быть пустым']);
        } else {
            setErrors([]);
            console.log(JSON.stringify(appContactInfoState.info));

            fetch('https://httpbin.org/post', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(appContactInfoState.info)
            })
                .then(res => res.json())
                .then(res => console.log(res));
        }
    }

    const handleChangeName = e => {
        const { name, value } = e.target;
        setContactInfoState(prevState => ({
            ...prevState,
            info: {
                ...prevState.info,
                [name]: value,
            }
        }));
        console.log(appContactInfoState);
    };

    const handleChangeField = e => {
        const { name, value } = e.target;

        const field_id = info.fields[name].field_id;
        const field_name = info.fields[name].field_name;

        setContactInfoState(prevState => ({
            ...prevState,
            info: {
                ...prevState.info,
                fields: [...prevState.info.fields.slice(0, name), {
                    'field_id': field_id, 'field_name': field_name, 'field_value': value}, ...prevState.info.fields.slice(+name + 1)],
            }
        }));

        console.log(appContactInfoState);
    };

    const handleChangeNewFieldName = e => {
        const { value } = e.target;
        setNewFieldNameState(value)
    }

    const handleNewField = e => {
        if (appNewFieldNameState == "") {
            setErrors(["Введите название нового поля"]);
        } else {
            setErrors([]);
            const field_id = "not_assigned " + appNewFieldId;
            setNewFieldId(appNewFieldId + 1);
            const field_name = appNewFieldNameState;

            setContactInfoState(prevState => ({
                ...prevState,
                info: {
                    ...prevState.info,
                    fields: [...prevState.info.fields.slice(0), { 'field_id': field_id, 'field_name': field_name, 'field_value': ""}],
                }
            }));

            setNewFieldNameState("");
        }
    }

    let label;

    if (type == "new_contact") {
        label = <h2>Создать новую запись</h2>
    } else if (type == "edit_contact") {
        label = <h2>Редактировать запись</h2>
    }

    let errors

    if (appErrors) {
        errors = (appErrors.map((error) => {
            return (<div className="contact-edit__error">{error}</div>)
        }))
    }

    console.log(appErrors);

    return (
        <div className="contact-edit__container">
            {label}
            <form className="contact-edit__info" onSubmit={handleSubmit}>
                <label className="contact__name">Имя<input name="name" onChange={handleChangeName} className="contact__field__input" type="text" defaultValue={info.name} />
                </label>
                {info.fields.map((field, current) => {
                    return (
                        <div className="contact__field" key={field.field_id}>
                            <label>{field.field_name}<input name={current} onChange={handleChangeField} className="contact__field__input" type="text" defaultValue={field.field_value} /></label>
                        </div>
                    )
                })}
                <div className="contact-new-field">
                    <label>Добавить новое поле<input onChange={handleChangeNewFieldName} name="new_field" className="contact__field__input" type="text"
                        placeholder="Введите название поля" value={appNewFieldNameState} /></label>
                    <div onClick={handleNewField} className="contact_fieldadd_button">Добавить</div>
                </div>
                {errors}
                <input className="contact-edit__submit" type="submit" value="Сохранить изменения" />
            </form>
        </div>
    );

};