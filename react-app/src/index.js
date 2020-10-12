import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import { Auth0Provider } from "@auth0/auth0-react";
import * as serviceWorker from "./serviceWorker";

var root = document.documentElement;
document.addEventListener('resize', ()=>{
    root.style.setProperty('--window_height', root.screenY);
})

ReactDOM.render(
    <Auth0Provider
        domain="edtechevaluation.au.auth0.com"
        clientId="f7XkkPm5SPP79RC22KdVMTvyHddTR3p6"
        redirectUri={window.location.origin + "/home_page"}
    >
        <App />
    </Auth0Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
