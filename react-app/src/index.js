import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./core.css";
import "./googleFont.css"
import Login from "./LoginPage/Login";
import EvaluationOverviewPage from "./EvaluationPage/EvaluationOverviewPage";
import Evaluation from "./EvaluationPage/EvaluationPage";
import HomePage from "./HomePage/HomePage";
import QuestionContainer from "./EvaluationPage/QuestionContainer"
import * as serviceWorker from "./serviceWorker";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <Router >
            <ul>
                <li>
                    <Link to='/'>Home Page</Link>
                </li>
                <li>
                    <Link to='/login'>Login Page</Link>
                </li>
                <li>
                    <Link to='/evaluation_list'>Evaluation List</Link>
                </li>
                <li>
                    <Link to='/evaluation_overview'>Evaluation Overview</Link>
                </li>
                <li>
                    <Link to='/question'>Question</Link>
                </li>
            </ul>

            <Route exact path='/' component={HomePage} />
            <Route path='/login' component={Login}/>
            <Route path='/evaluation_overview' component={EvaluationOverviewPage}/>
            <Route path='/evaluation_list' component={Evaluation}/>
            <Route path='/question' component={QuestionContainer} />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
