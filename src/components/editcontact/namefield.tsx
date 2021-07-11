declare var require: any;
var React = require('react');

export const NameField = (props) => {
    const { setContactInfoState, defaultName } = props;

    const handleChangeName = e => {
        const { name, value } = e.target;
        setContactInfoState(prevState => ({
            ...prevState,
            info: {
                ...prevState.info,
                [name]: value,
            }
        }));
    };

    return (
        <label className="contact__name">Имя<input name="name" onChange={handleChangeName} className="contact__field__input" type="text" defaultValue={defaultName} />
        </label>
    )
};