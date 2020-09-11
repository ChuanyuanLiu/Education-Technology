import React from "react"

// function FrameworkOverview({history}){
//     const {framework_id} = history.location.state;
//     return <h1>{framework_id}</h1>
// }

class FrameworkOverview extends React.Component{
    constructor(){
        super();
    }
    render(){
        const {framework_id} = this.props.history.location.state;
        return <h1>{framework_id}</h1>
    }
}
export default FrameworkOverview