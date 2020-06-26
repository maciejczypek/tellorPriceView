import React from "react";
import ReactDOM from "react-dom";
// import './style/index.scss';

import Routes from "containers/App";

import * as serviceWorker from "./serviceWorker";
import Store from "./contexts/Store";

const MOUNT_NODE = document.getElementById("root");

ReactDOM.render(
  <Store>
    <Routes />
  </Store>,
  MOUNT_NODE);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
