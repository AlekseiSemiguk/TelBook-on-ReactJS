declare var require: any;
var React = require('react');

export const ContactInfo = (props) => {
    let { info } = props;
    if (!info || info.length === 0) return <p>Информация о контакте отсутствует</p>;
    return (
        <div className="contact__info">
            {info.map((field) => {
                return (
                    <div key={field.field_id} className="contact__info__row">
                        <div className="contact__info__field">{field.field_name}</div>
                        <div className="contact__info__value">{field.field_value}</div>
                    </div>
                )
             })}
        </div>   
    );
};