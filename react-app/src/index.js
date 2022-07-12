import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import * as serviceWorker from "./serviceWorker";

var root = document.documentElement;
document.addEventListener('resize', ()=>{
    root.style.setProperty('--window_height', root.screenY);
})

ReactDOM.render(
    <App />,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
