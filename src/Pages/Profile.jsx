import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Row from "../Components/Row";
import UserData from "../Components/UserData";
import LogoutButton from "../Components/LogoutButton";
import useJWT from "./../Hooks/useJWT";

const Profile = () => {
  const [user, setUser] = React.useState({});

  const sendPostRequest = useJWT().sendPostRequest;
  const logout = useJWT().logout;
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      sendPostRequest("http://127.0.0.1:4000/api/user", {})
        .then((response) => setUser(response.data.user))
        .catch(() => {
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    logout().then(() => navigate("/login"));
  };

  return (
    <div className="container">
      <Row>
        <UserData label="Name">{user.name}</UserData>
        <UserData label="Family">{user.lastname}</UserData>
      </Row>

      <Row>
        <UserData label="Phone">{user.phone}</UserData>
        <UserData label="Address">{user.address}</UserData>
      </Row>

      <Row>
        <UserData label="Email">{user.email}</UserData>
        <UserData label="Password">{user.password}</UserData>
      </Row>

      <LogoutButton onClick={handleLogout} />
    </div>
  );
};

export default Profile;
