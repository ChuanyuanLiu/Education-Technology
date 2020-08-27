import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./LoginPage/App";
import HomePage from "./HomePage/HomePage";
import * as serviceWorker from "./serviceWorker";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <ul>
                <li>
                    <Link to='/'>Home Page</Link>
                </li>
                <li>
                    <Link to='/login'>Login Page</Link>
                </li>
            </ul>

            <Route exact path='/' component={HomePage} />
            <Route path='/login' component={App} />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
