import React, { useEffect, useState} from "react";
import 'antd/dist/antd.css';
import { Switch } from 'antd';


function StatusSwitch(props){
    return (
        <div className="StatusSwitch">
            <span>{props.switchName}</span>
            <label className="StatusSwitch-switch"><Switch size="default" /></label>
        </div>
    )
}



export default StatusSwitch