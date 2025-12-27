import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");

  if (!user) {
    return page === "login"
      ? <Login setUser={setUser} setPage={setPage} />
      : <Register setPage={setPage} />;
  }

  return <Dashboard />;
}
