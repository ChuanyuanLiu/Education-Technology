import React from 'react'
import "./NavBar.css";
import { useHistory } from "react-router-dom";
import { Button } from 'antd';
import { LeftSquareOutlined } from '@ant-design/icons';





function NavBar({title}) {
    const history = useHistory();
    function handleClick(){
        history.goBack()
    }
    return (
        <div className="NavBar">
            <header className="barHeader">
                <div className="backIcon">
                    <Button onClick={handleClick}
                        type="primary" 
                        icon={<LeftSquareOutlined 
                                style={{fontSize:'30px'}}
                    />}>
                    </Button>
                </div>
                {title}</header>
        </div>
    )
}

export default NavBar;