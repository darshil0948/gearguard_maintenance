import { useState } from "react";
import { api } from "../services/api";
import "./Auth.css";

export default function Register({ setPage }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
  });

  const submit = async () => {
    if (form.password !== form.confirm) {
      return alert("Passwords do not match");
    }

    await api.register({
      name: form.name,
      email: form.email,
      password: form.password
    });

    alert("Account created");
    setPage("login");
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        <div className="auth-group">
          <label>Name</label>
          <input onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>

        <div className="auth-group">
          <label>Email ID</label>
          <input onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>

        <div className="auth-group">
          <label>Password</label>
          <input
            type="password"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div className="auth-group">
          <label>Re-enter Password</label>
          <input
            type="password"
            onChange={e => setForm({ ...form, confirm: e.target.value })}
          />
        </div>

        <button className="auth-btn" onClick={submit}>
          Sign Up
        </button>

        <div className="auth-link" onClick={() => setPage("login")}>
  ← Back to Login
</div>

      </div>
    </div>
  );
}
