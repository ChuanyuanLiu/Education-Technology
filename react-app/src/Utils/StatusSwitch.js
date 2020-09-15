import React, { useEffect, useState} from "react";
import 'antd/dist/antd.css';
import { Switch } from 'antd';


function StatusSwitch(){
    return (
        <div className="StatusSwitch">
            <span>Active</span>
            <label className="StatusSwitch-switch"><Switch size="default" /></label>
        </div>
    )
}



export default StatusSwitch