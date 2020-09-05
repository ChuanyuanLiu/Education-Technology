import React from "react"
import Login from "./LoginPage/Login";
import EvaluationOverviewPage from "./EvaluationPage/EvaluationOverviewPage";
import Evaluation from "./EvaluationPage/EvaluationPage";
import HomePage from "./HomePage/HomePage";
import QuestionContainer from "./EvaluationPage/QuestionContainer"
import {BrowserRouter as Router, Route} from "react-router-dom";
import "antd/dist/antd.css";
import "./core.css";
import "./googleFont.css"
import FrameworkSelection from "./EvaluationPage/FrameworkSelection";
function App(){
    return (
        <React.StrictMode>
            <Router >
                <Route exact path='/' component={Login} />
                <Route path='/home_page' component={HomePage}/>
                <Route path='/evaluation_overview' component={EvaluationOverviewPage}/>
                <Route path='/evaluation' component={Evaluation}/>
                <Route path='/question' component={QuestionContainer} />
                <Route path='/new_evaluation' component={FrameworkSelection} />

            </Router>
         </React.StrictMode>
    )
}

export default App