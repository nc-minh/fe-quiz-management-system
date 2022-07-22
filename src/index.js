import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import "antd/dist/antd.css";
const MOUNT_NODE = document.getElementById("app");

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	MOUNT_NODE
);
