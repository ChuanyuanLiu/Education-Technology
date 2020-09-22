import React from "react"
import { UserOutlined} from '@ant-design/icons'
import {resolveTime} from "../Utils/Helper"
function FrameworkComponent(props){
    return (
        <div className="elementInfo" onClick = {() => props.handleClick(props.item.framework_id)}>          
            <div className="elementTitle">{props.item.framework_title}</div>
            <div className='elementStatus'>
                {props.item.framework_active_status ? "Active" : "Inactive"}
            </div>
            <div className="elementAuthor"><UserOutlined style={{fontSize: "20px"}}/>  {props.item.framework_author}</div>
            <div>
                <div className="elementDate">
                    {resolveTime(props.item.framework_creation_time)}
                </div>
            </div>
        </div>
        
    )
}

export default FrameworkComponent