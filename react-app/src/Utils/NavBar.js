import React from 'react'
import "./NavBar.css";
import {Layout} from "antd";
const {Header} = Layout;

function NavBar({title}) {
    return (
        <Header className='NavBar'>{title}</Header>
    )
}

export default NavBar;