import React from "react";

import Card from "../Components/Card";
import Input from "../Components/Input";
import NotRobot from "../Components/NotRobot";
import LoginButton from "../Components/LoginButtons";
import ErrorMessage from "../Components/ErrorMessage";

const Login = (props) => {
	return (
		<Card>
			<h3>Login</h3>

			<Input
				data-testid="email"
				label="✉️ Email"
				type="email"
				value={""}
				onChange={() => {}}
			/>

			<Input
				data-testid="password"
				label="🔑 Password"
				type="password"
				value={""}
				onChange={() => {}}
			/>

			<NotRobot checked={false} onChange={() => {}} />
			<ErrorMessage />

			<LoginButton onClick={() => {}} disabled={false} />
		</Card>
	);
};

export default Login;
