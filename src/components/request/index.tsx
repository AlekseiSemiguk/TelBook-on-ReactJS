declare var require: any;
var React = require('react');

export const RequestWindow = (props) => {

    const { arLogs } = props;
        
    return (
        <div className="request-window">
            <div className="request-window__title">
                Запросы на сервер
            </div>
            <div className="request-window__text">
                {arLogs.map((log, index) => {
                    return (
                        <div key={index}>
                            {log}
                        </div>
                    )
                })}
            </div>
        </div>
    )

};