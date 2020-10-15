import React, {useEffect, useState} from "react"
import NavBar from "../Utils/NavBar";
import TextInput from "../Utils/TextInput";
import BigButton from "../Utils/BigButton";
import StatusSwitch from "../Utils/StatusSwitch";
import Reminder from "../Utils/Reminder";
import ReportInfo from "./ReportInfo";
import {ReportInfoData} from "../Utils/DataClass.js";
import "./ReportPage.css"
import {PlusOutlined, CloseOutlined} from "@ant-design/icons";

function ReportPublishPage({history}){
    const {report_id, title} = history.location.state
    const [mailList, setMailList] = useState([])

    useEffect(()=>{},[mailList])
    const sendReport = () =>{
        //TODO
    }

    const hanldeChange = (id, value) =>{
        setMailList(preList =>{
            preList[id] = value
            console.log(preList)
            return preList
        })
    }
    const handleDelete = (id) =>{
        let newList = mailList
        newList.splice(id, 1)
        setMailList([...newList])
    }
    const handleAdd = () =>{
        setMailList(prev =>{
            return[...prev, ""]
        })
    }
    return (
        <div className="flex_container">
            <NavBar>
                Publish {title}
            </NavBar>
    
            <div className="content scrollable">
                <div className="mailTo"><h3>Mail To:</h3>
                    <div className="mailList">
                        {mailList.map((data, i) => {
                            return <MailLabel id={i} hanldeChange={hanldeChange} handleDelete={handleDelete}/>
                        })}
                        <div className="addNew" onClick={handleAdd}>Add Receiver <PlusOutlined/></div>

                    </div>
                    
                </div>

            </div>

            <div className='footer'>
                <BigButton
                    onClick={sendReport}
                >
                    Send
                </BigButton>
            </div>
        </div>)

}

function MailLabel({id, hanldeChange, handleDelete}){
    return (
        <div>
            <div>
                <input  type="text" 
                        placeholder="Type Email to send" 
                        id={id}
                        onChange={e => hanldeChange(e.target.id, e.target.value)}
                        className="mailLabel"
                        >
                </input>
                <span onClick={()=> {
                        handleDelete(id)
                    }}><CloseOutlined/>
                </span>
            </div>
        </div>
    )
}

export default ReportPublishPage