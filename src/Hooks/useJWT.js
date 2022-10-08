import React from "react";

function useJWT() {
	const refreshToken = () => {};

	function login(email, password) {}

	const sendPostRequest = (url, data) => {};

	const logout = () => {};

	return {
		login,
		logout,
		refreshToken,
		sendPostRequest,
	};
}

export default useJWT;
