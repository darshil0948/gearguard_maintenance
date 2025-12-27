import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");

  if (!user) {
    if (page === "login")
      return <Login setUser={setUser} setPage={setPage} />;

    if (page === "register")
      return <Register setPage={setPage} />;

    if (page === "forgot")
      return <ForgotPassword setPage={setPage} />;
  }

  return <Dashboard user={user} />;
}
