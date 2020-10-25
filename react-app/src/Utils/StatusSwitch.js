import React from "react";
import 'antd/dist/antd.css';
import { Switch } from 'antd';


function StatusSwitch(props){
    return (
        <div className="StatusSwitch">
            {props.value ? "Active" : "Inactive"}
            <label className="StatusSwitch-switch">
                <Switch onChange={props.handleChange} 
                        size="default" 
                        checked={props.value}
                        disabled={props.disabled}
                        defaultChecked={false}/>
            </label>
        </div>
    )
}



export default StatusSwitch