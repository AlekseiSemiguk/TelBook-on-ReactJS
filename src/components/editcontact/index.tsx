declare var require: any;
var React = require('react');
import { useState } from 'react';
import { Errors } from "./errors";
import { AddNewField } from "./addnewfield";
import { Fields } from "./fields";
import { NameField } from "./namefield";
import { Modal } from "../modal/success";
import {
    Link,
} from 'react-router-dom';

export const EditContact = (props) => {
    
    const [deletedFieldsId, setDeletedFieldsId] = useState([]);
    const [errors, setErrors] = useState([]);
    const [showModalWindow, setShowModalWindow] = useState(false);

    const { setContactInfoState, contactInfoState, type, addLogRequest } = props;

    let loading;
    if (contactInfoState.loading) {
        loading = contactInfoState.loading;
    } else {
        loading = false;
    }

    const info = contactInfoState.info;
    
    function handleSubmit(e) {
        e.preventDefault();
        if (contactInfoState.info.name == "") {
            setErrors(['Поле "Имя" не может быть пустым']);
        } else {
            setErrors([]);
            let bodyRequest = [];
            bodyRequest[0] = contactInfoState.info;
            bodyRequest[1] = { deletedFields: deletedFieldsId};
            addLogRequest("POST запрос: body = " + JSON.stringify(bodyRequest));

            fetch('https://httpbin.org/post', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyRequest)
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res); setShowModalWindow(true)
                });
        }
    }

    let label;
    let button;
    let modalText;
    if (type == "new_contact") {
        label = <h2>Создать новую запись</h2>;
        button = "Создать";
        modalText = "Запись успешно создана";
    } else if (type == "edit_contact") {
        label = <h2>Редактировать запись</h2>;
        button = "Сохранить изменения";
        modalText = "Изменения сохранены";
    }
    
    if (loading) return <p>загрузка сведений о контакте...</p>;

    return (
        <div className="contact-edit__container">
            <div className="contact__top">
                {label}
                <div className="contact__icon">
                    <Link className="link" to="/">
                        <img src="/src/img/on_main.png" alt="on-main" />
                    </Link>
                </div>
            </div>
            <form className="contact-edit__info" onSubmit={handleSubmit}>
                <NameField setContactInfoState={setContactInfoState} defaultName={ info.name}/>
                <Fields fields={info.fields} setContactInfoState={setContactInfoState} setDeletedFieldsId={setDeletedFieldsId} deletedFieldsId={deletedFieldsId}/>
                <AddNewField setErrors={setErrors} setContactInfoState={setContactInfoState}/>
                <Errors errors={errors} />
                <input className="contact-edit__submit" type="submit" value={ button } />
            </form>
            <Modal text={modalText} show={showModalWindow} redirectLink='/'/>
        </div>
    );
};
