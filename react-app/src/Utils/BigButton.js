import React from "react"
import {Button} from "antd"
import 'antd/dist/antd.css';

import "./BigButton.css"

function BigButton(props){
    //two types of event to handle
        //"direct": direct to a new page
        //"submit": submit data to API

    return (<Button onClick={props.handleClick}
                    type="primary" 
                    size="large" 
                    htmlType="submit"
                    shape="round" 
                    block
        >{props.name}</Button>)
}

export default BigButton