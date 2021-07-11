declare var require: any;
var React = require('react');

export const Fields = (props) => {
    const { fields, setContactInfoState, setDeletedFieldsId, deletedFieldsId} = props;

    const handleChangeField = e => {
        const { name: index, value } = e.target;

        const field_id = fields[index].field_id;
        const field_name = fields[index].field_name;

        setContactInfoState(prevState => ({
            ...prevState,
            info: {
                ...prevState.info,
                fields: [...prevState.info.fields.slice(0, index), {
                    'field_id': field_id, 'field_name': field_name, 'field_value': value
                }, ...prevState.info.fields.slice(+index + 1)],
            }
        }));
    };

    const handleDeleteField = (del_fieldId) => {
        let index = deletedFieldsId.indexOf(del_fieldId);
        if (index != -1) {
            setDeletedFieldsId(prevState => ([
                ...prevState.slice(0, index), ...prevState.slice(index + 1)
            ]))
        } else {
            setDeletedFieldsId(prevState => ([
                ...prevState, del_fieldId
            ]))
        }
    }

    return (
        <div>
            {fields.map((field, current) => {
                let fieldClass = "";
                let iconImg = "/src/img/delete_icon.png";
                let disabled = false;
                if (deletedFieldsId.indexOf(field.field_id) != -1) {
                    fieldClass = "deleted-field";
                    iconImg = "/src/img/undelete_icon.png";
                    disabled = true;
                }

                return (
                    <div className={"contact__field " + fieldClass} key={field.field_id}>
                        <label>{field.field_name}<input name={current} onChange={handleChangeField} className={"contact__field__input " + fieldClass} disabled={disabled} type="text" defaultValue={field.field_value} /></label>
                        <div className="contact__icon icon-basket" onClick={handleDeleteField.bind(this, field.field_id)}>
                            <img src={iconImg} alt="delete" />
                        </div>
                    </div>
                )
            })}
        </div>
    )
};