import React from "react";
import 'antd/dist/antd.css';
import { Switch } from 'antd';


function StatusSwitch(props){
    return (
        <div className="StatusSwitch">
            <span>{props.switchName}</span>
            <label className="StatusSwitch-switch">
                <Switch onChange={props.handleChange} 
                        size="default" 
                        checked={props.value}/>
            </label>
        </div>
    )
}



export default StatusSwitch