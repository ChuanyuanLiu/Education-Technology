import React from "react"
import "./EvaluationPage.css"
import { UserOutlined} from '@ant-design/icons'
function FrameworkComponent(props){
    function resolveTime(time){
        var splittedTime = time.split("-")
        var year = splittedTime[0]
        var month = splittedTime[1]
        var day = splittedTime[2].split('T')[0]
        return year + '/'+ month + '/' + day
    }
    return (
        <div className="evaluationInfo" onClick = {() => props.handleClick(props.item.framework_id)}>          
            <div className="frameTitle">{props.item.framework_title}</div>
            <div className="author"><UserOutlined style={{fontSize: "20px"}}/>  {props.item.framework_author}</div>
            <div>
                <div className="framework">
                    {props.item.framework_title}
                </div>
                <div className="date">
                    {resolveTime(props.item.framework_creation_time)}
                </div>
            </div>
        </div>
        
    )
}

export default FrameworkComponent