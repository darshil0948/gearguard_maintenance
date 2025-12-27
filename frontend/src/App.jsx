import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Equipment from "./pages/Equipment";
import Requests from "./pages/Requests";
import Teams from "./pages/Teams";
import Kanban from "./pages/Kanban";
import CalendarView from "./pages/Calendar";
import Reports from "./pages/Reports";
import Navbar from "./components/Navbar";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    // expose helper functions for quick cross-page actions (used by Dashboard quick buttons)
    window.__navigateTo = (p) => setPage(p);
    window.__setRequestsFilter = (f) => setFilters(f);
    return () => {
      delete window.__navigateTo;
      delete window.__setRequestsFilter;
    };
  }, []);

  if (!user) {
    if (page === "login")
      return <Login setUser={setUser} setPage={setPage} />;

    if (page === "register")
      return <Register setPage={setPage} />;

    if (page === "forgot")
      return <ForgotPassword setPage={setPage} />;
  }

  const logout = () => setUser(null);


  return (
    <div className="app-shell">
      <Navbar user={user} onNavigate={(p) => { setFilters({}); setPage(p); }} currentPage={page} onLogout={logout} />

      <div style={{ padding: 16 }}>
        {page === "dashboard" && <Dashboard user={user} />}
        {page === "equipment" && <Equipment setPage={setPage} setFilters={setFilters} />}
        {page === "requests" && <Requests user={user} filters={filters} />}
        {page === "teams" && <Teams />}
        {page === "kanban" && <Kanban />}
        {page === "calendar" && <CalendarView />}
        {page === "reports" && <Reports />}
        {page === "assets" && <Dashboard user={user} />}
      </div>
    </div>
  );
}
