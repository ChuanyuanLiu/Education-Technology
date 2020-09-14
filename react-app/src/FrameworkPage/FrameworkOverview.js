import React, { useEffect, useState} from "react"
import NavBar from "../Utils/NavBar";
import TextInput from "../Utils/TextInput"

function FrameworkOverview({history}){
    const {framework_id} = history.location.state
    const [framework_data, setFramework] = useState(null)
    useEffect(() => {
        fetch(
            `http://localhost:3001/framework?framework_id=${framework_id}`
        )
            .then(response => response.json())
            .then(setFramework)

    },[])

    if (framework_data == null) {
        return <h1>Loading...</h1>;
    }

    return  <div>
                <NavBar>
                    <TextInput text={framework_data.framework_id}/>
                </NavBar>
                <StatusSwitch />
                <Section />
                {/* {framework_data.framework_id} */}
            </div>
}

function StatusSwitch(){
    return <div>Switch Here</div>
}
function Section(){
    return <div>Sections Here</div>
}

export default FrameworkOverview