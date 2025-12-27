import { useState } from "react";
import "./Auth.css";

export default function ForgotPassword({ setPage }) {
  const [email, setEmail] = useState("");

  const submit = () => {
    if (!email) {
      return alert("Please enter your email");
    }

    // For now we just simulate
    alert(
      "If this email exists, password reset instructions will be sent."
    );

    setPage("login");
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2 className="auth-title">Forgot Password</h2>

        <div className="auth-group">
          <label>Email ID</label>
          <input
            placeholder="Enter your registered email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="auth-btn" onClick={submit}>
          Reset Password
        </button>

        <div className="auth-link" onClick={() => setPage("login")}>
          ← Back to Login
        </div>
      </div>
    </div>
  );
}
