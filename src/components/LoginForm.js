import React, { useState } from "react";
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
      <form onSubmit={handleLogin}>
        <input
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
      {error && (
        <Notification msg={{ type: "error", content: "Wrong Password" }} />
      )}
    </>
  );
};

export default LoginForm;
