import React, { useState } from "react";
import PropTypes from "prop-types";
import Notification from "./Notification";
import { addUser } from "../services/users";

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const newUser = await addUser({ username, password });
      localStorage.setItem("loggedinUser", JSON.stringify(newUser));
      setUser(newUser);
    } catch (err) {
      setError(true);
      setTimeout(() => setError(null), 2000);
    }
  };
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin} id="login-form">
        <input
          value={username}
          placeholder="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          value={password}
          placeholder="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id="submit-btn">Login</button>
      </form>
      {error && (
        <Notification msg={{ type: "error", content: "Wrong Password" }} />
      )}
    </>
  );
};
LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};
export default LoginForm;
