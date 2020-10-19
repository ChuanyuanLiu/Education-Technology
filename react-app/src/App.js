import React from "react"
import Login from "./LoginPage/Login";
import EvaluationOverviewPage from "./EvaluationPage/EvaluationOverviewPage";
import Evaluation from "./EvaluationPage/EvaluationPage";
import EvaluationSelection from "./EvaluationPage/EvaluationSelection";
import HomePage from "./HomePage/HomePage";
import QuestionPage from "./EvaluationPage/QuestionPage"
import {BrowserRouter as Router, Route} from "react-router-dom";
import "antd/dist/antd.css";
import "./core.css";
import "./googleFont.css";
import FrameworkSelection from "./FrameworkPage/FrameworkSelection";
import FrameworkPage from "./FrameworkPage/FrameworkPage";
import FrameworkOverviewPage from "./FrameworkPage/FrameworkOverview";
import FrameworkQuestionPage from "./FrameworkPage/FrameworkQuestionPage";
import ReportPage from "./ReportPage/ReportPage";
import UserManagementPage from "./UserManagementPage/UserManagementPage";
import UserOverview from "./UserManagementPage/UserOverview";
import ReportOverview from "./ReportPage/ReportOverview";
import ReportPublishPage from "./ReportPage/ReportPublishPage";
function App(){
    const AUTH_ROLE = "Senior Consultant"
    return (
        <div className='element_container'>
            <React.StrictMode>
                <Router >
                    <Route exact path='/' component={Login} />
                    <Route path='/home_page' component={HomePage}/>
                    <Route path='/evaluation_overview' component={EvaluationOverviewPage}/>
                    <Route path='/evaluation' component={Evaluation}/>
                    <Route path='/question' component={QuestionPage} />
                    <Route path='/new_evaluation' component={FrameworkSelection} />
                    <Route path='/framework' component={FrameworkPage} />
                    <Route path='/framework_overview' component={FrameworkOverviewPage} />
                    <Route path='/framework_question' component={FrameworkQuestionPage} />
                    <Route path='/report' component={ReportPage} />
                    <Route path='/new_report' component={EvaluationSelection} />
                    <Route path='/user_management' component={UserManagementPage} />
                    <Route path='/user_overview' component={UserOverview} />
                    <Route path='/report_overview' component={ReportOverview} />
                    <Route path='/report_publish' component={ReportPublishPage} />
                </Router>
            </React.StrictMode>

        </div>

    )
}

export default App