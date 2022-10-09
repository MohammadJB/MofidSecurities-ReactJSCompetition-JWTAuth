import React from "react";
import axios from "axios";

function useJWT() {
  const refreshToken = () => {
    return new Promise((resolve, reject) => {
      const refreshToken = localStorage.getItem("refresh");
      axios
        .post("http://127.0.0.1:4000/api/token", {
          token: refreshToken,
        })
        .then((response) => {
          localStorage.setItem("access", response.data.access);
          localStorage.setItem("refresh", response.data.refresh);
          resolve({
            access: response.data.access,
            refresh: response.data.refresh,
          });
        })
        .catch((error) => reject(error));
    });
  };

  function login(email, password) {
    return new Promise((resolve, reject) => {
      axios
        .post("http://127.0.0.1:4000/api/login", {
          password,
          email,
        })
        .then((response) => {
          const accessToken = response.data.access;
          const refreshToken = response.data.refresh;
          localStorage.setItem("access", accessToken);
          localStorage.setItem("refresh", refreshToken);
          resolve({
            access: accessToken,
            refresh: refreshToken,
          });
        })
        .catch((error) => reject(error));
    });
  }

  const sendPostRequest = (url, data) => {
    return new Promise((resolve) => {
      const accessToken = localStorage.getItem("access");
      axios
        .post(url, data, { headers: { jwt: accessToken } })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          refreshToken().then(() => {
            const accessToken = localStorage.getItem("access");
            axios
              .post(url, data, { headers: { jwt: accessToken } })
              .then((response) => {
                resolve(response);
              });
          });
        });
    });
  };

  const logout = () => {
    return new Promise((resolve) => {
      const refreshToken = localStorage.getItem("refresh");
      axios
        .delete("http://127.0.0.1:4000/api/logout", {
          token: refreshToken,
        })
        .then(() => {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          resolve();
        });
    });
  };

  return {
    login,
    logout,
    refreshToken,
    sendPostRequest,
  };
}

export default useJWT;
