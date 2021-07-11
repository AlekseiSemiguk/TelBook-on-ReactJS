declare var require: any;
var React = require('react');
import { CreateContactPage } from "../pages/createcontact";
import { EditContactPage } from "../pages/editcontact";
import { ContactsListPage } from "../pages/contactslist";
import { RequestWindow } from "../components/request";
import { useState } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

export const App = () => {
    const [globalState, setGlobalState] = useState({
        requestLog: []
    });

    const addLogRequest = (request_text) => {
        const arRequestLog = globalState.requestLog.slice(0);
        arRequestLog.push(request_text);
        setGlobalState({ requestLog: arRequestLog});
    }

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/create/">
                        <CreateContactPage addLogRequest={addLogRequest}/>
                    </Route>
                    <Route path="/edit/:contactId/">
                        <EditContactPage addLogRequest={addLogRequest}/>
                    </Route>
                    <Route path="/">
                        <ContactsListPage addLogRequest={addLogRequest}/>
                    </Route>
                    <Route path="/contacts/">
                        <ContactsListPage addLogRequest={addLogRequest} />
                    </Route>
                </Switch>
                <RequestWindow arLogs={globalState.requestLog} />
            </div>
        </Router>
    )
};
