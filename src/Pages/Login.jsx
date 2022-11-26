import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../Components/Card";
import Input from "../Components/Input";
import NotRobot from "../Components/NotRobot";
import LoginButton from "../Components/LoginButtons";
import ErrorMessage from "../Components/ErrorMessage";
import useJWT from "./../Hooks/useJWT";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notRobot, setNotRobot] = useState(false);
  const [showError, setShowError] = useState(false);

  const login = useJWT().login;
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (event.target.type === "email") {
      setEmail(event.target.value);
    } else if (event.target.type === "password") {
      setPassword(event.target.value);
    } else if (event.target.type === "checkbox") {
      setNotRobot(event.target.value);
    }
  };

  const handleSubmit = () => {
    login(email, password)
      .then((res) => navigate("/"))
      .catch((error) => {
        setShowError(true);
        setNotRobot(false);
        setPassword("");
      });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateInputs = (email, password, notRobot,showError) =>
    email && password && (!showError || notRobot) && validateEmail(email);

  return (
    <Card>
      <h3>Login</h3>

      <Input
        data-testid="email"
        label="✉️ Email"
        type="email"
        value={email}
        onChange={handleChange}
      />

      <Input
        data-testid="password"
        label="🔑 Password"
        type="password"
        value={password}
        onChange={handleChange}
      />

      {showError && (
        <>
          <NotRobot checked={notRobot} onChange={handleChange} />
          <ErrorMessage />
        </>
      )}

      <LoginButton onClick={handleSubmit} disabled={!validateInputs(email, password, notRobot,showError)} />
    </Card>
  );
};

export default Login;
