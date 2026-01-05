import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const savedData = JSON.parse(localStorage.getItem("studentData"));

    if (!savedData) {
      setMsg("No user registered!");
      return;
    }

    if (savedData.email === email && savedData.password === password) {
      localStorage.setItem("loggedInUser", JSON.stringify(savedData));
      navigate("/dashboard");
    } else {
      setMsg("Invalid credentials!");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {msg && <p className="error">{msg}</p>}

      <form onSubmit={handleLogin}>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
