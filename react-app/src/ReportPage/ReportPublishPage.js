import React, {useState} from "react"
import NavBar from "../Utils/NavBar";
import BigButton from "../Utils/BigButton";
import "./ReportPage.css"
import {PlusOutlined, CloseOutlined} from "@ant-design/icons";

function ReportPublishPage({history}){
    const {report_id, title} = history.location.state
    const [mailList, setMailList] = useState([])
    const post_send_email_url = "https://localhost:3001/report/sendemail?"
    //Regex to match email address
    const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const sendReport = () =>{
        let count = 0
        let url = post_send_email_url
        let email
        for (email of mailList) {
            //remove white space of beginning and end
            email = email.trimStart()
            email = email.trimEnd()
            if(email_regex.test(email)){
                url = url+ "emailaddress="+ email + "&"
                count++
            } 
        }
        url += "report_id=" + report_id
        if(count > 0){
            fetch(url)
                .then(response => response.text())
                .then(data => {
                        console.log(data)
                        if(data === "The call to the SQL database was successful.") alert("Email is sent successful")
                        else alert("Publish failed")
                    }
                )
        }else{
            alert("Please add at least one email to publish")
        }
    }

    const hanldeChange = (id, value) =>{
        setMailList(preList =>{
            preList[id] = value
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