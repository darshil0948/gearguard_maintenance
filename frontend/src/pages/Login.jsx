import { useState } from "react";
import { api } from "../services/api";
import "./Auth.css";

export default function Login({ setUser, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await api.login({ email, password });
    if (res._id) setUser(res);
    else alert("Invalid Email or Password");
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>

        <div className="auth-group">
          <label>Email ID</label>
          <input onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="auth-group">
          <label>Password</label>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </div>

        <button className="auth-btn" onClick={submit}>
          Sign In
        </button>

        <div className="auth-link" onClick={() => setPage("forgot")}>
  Forget Password ?
</div>

<div className="auth-link" onClick={() => setPage("register")}>
  New here? Sign Up
</div>

      </div>
    </div>
  );
}
