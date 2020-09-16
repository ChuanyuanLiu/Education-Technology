import React, { useEffect, useState} from "react"
import NavBar from "../Utils/NavBar";
import TextInput from "../Utils/TextInput"
import StatusSwitch from "../Utils/StatusSwitch"

function FrameworkOverview({history}){
    const {framework_id} = history.location.state
    const [framework_data, setFramework] = useState(null)
    function initializeFramework(){
        const new_framework = {
            framework_title: "New Framework",
            framework_author: "",
            sections: []
          }
        setFramework(new_framework)
    }
    useEffect(() => {
        if(framework_id !== -1){
            fetch(
                `http://localhost:3001/framework?framework_id=${framework_id}`
            )
                .then(response => response.json())
                .then(setFramework)
        }else{
            initializeFramework()
        }
    },[])
    if (framework_data == null) {
        return <h1>Loading...</h1>;
    }
    console.log(framework_data.framework_id)
    return  <div>
                <NavBar>
                    <TextInput text="New Framework"/>
                </NavBar>
                <StatusSwitch />
                <SectionList />
                {/* {framework_data.framework_id} */}
            </div>
}
function SectionList(){
    return (
        <div>
            <div className='section_header'>Sections</div>
            <div></div>
        </div>
       
    )
        
    
}
function Section(){
    return <div>Sections Here</div>
}


export default FrameworkOverview