declare var require: any;
var React = require('react');

export const Errors = (props) => {
    const { errors } = props;

    if (errors) {
        return (
        <div>
            {errors.map((error, index) => {
                return (<div key={index} className="contact-edit__error">{error}</div>)
            })}
        </div>
    )} else {
        return false;
    }
        
};