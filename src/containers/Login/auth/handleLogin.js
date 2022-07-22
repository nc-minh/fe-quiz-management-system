import React, { memo, useCallback } from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";

import LoginButton from "./loginButton";
import { loginApi } from "../../../services/api/checkAccount";
import { config } from "../../../config/config";
import Notification from "../../../components/Notification";
import paths from "../../App/paths";
import { setLocalStorage } from "../../../services/storage/LocalStorage";

function HandleLogin() {
	const navigate = useNavigate();
	const handleSuccess = useCallback(async (res) => {
		// create heanders include tokenGG send to server
		const { data, success } = await loginApi(res.tokenId);
		if (success && data) {
			const user = {
				email: data.data.email,
				role: data.data.role,
			};
			// set tokenLogin in localStorage
			setLocalStorage("token_login", data.data.tokenLogin);
			setLocalStorage("user", user);
			if (data.data.role === "ADMIN") {
				navigate(paths.AdminDash);
			} else if (data.data.role === null) {
				Notification("error", "Account does not exist in the system!");
			} else {
				navigate(paths.ListExam);
			}
		} else {
			Notification("error", "Login error. Please try again!");
		}
	}, []);

	const handleFailure = useCallback(() => {
		Notification("error", "Have an error occurred. Please try again!");
	});

	return (
		<GoogleLogin
			clientId={config.google.clientId}
			render={(renderProps) => (
				<div
					onClick={renderProps.onClick}
					onKeyDown={renderProps.handleClick}
					aria-hidden="true"
				>
					<LoginButton />
				</div>
			)}
			onSuccess={handleSuccess}
			onFailure={handleFailure}
			cookiePolicy="single_host_origin"
		/>
	);
}

export default memo(HandleLogin);
