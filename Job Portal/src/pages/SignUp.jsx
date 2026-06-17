import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      setMsg("Invalid credentials.");
      return;
    }
    localStorage.setItem("authUser", JSON.stringify(user));
    setMsg("Signed in. Redirecting to Search...");
    setTimeout(() => navigate("/search"), 700);
  }

  return (
    <div>
      <h3>Sign In</h3>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Sign In</button>
      </form>
      {msg && <p className="msg">{msg}</p>}
    </div>
  );
}