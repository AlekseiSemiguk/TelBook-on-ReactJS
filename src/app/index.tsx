declare var require: any;
var React = require('react');
import { CreateContactPage } from "../pages/createcontact";
import { EditContactPage } from "../pages/editcontact";
import { ContactsListPage } from "../pages/contactslist";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';

export const App = () => (
    <Router>
        <div>
            <Switch>
                <Route path="/create">
                    <CreateContactPage />
                </Route>
                <Route path="/edit/:contactId/">
                    <EditContactPage />
                </Route>
                <Route path="/">
                    <ContactsListPage />
                </Route>
            </Switch>
        </div>
    </Router>
);
