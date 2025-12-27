export default function Navbar({ title = "GearGuard", user, onNavigate, currentPage, onLogout }) {
  return (
    <header className="navbar">
      <div className="nav-left">
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div className="nav-brand">{title}</div>
        </div>
        <nav className="nav-links">
          <button className={currentPage === "dashboard" ? 'active' : ''} onClick={() => onNavigate("dashboard")}>Dashboard</button>
          <button className={currentPage === "equipment" ? 'active' : ''} onClick={() => onNavigate("equipment")}>Equipment</button>
          <button className={currentPage === "requests" ? 'active' : ''} onClick={() => onNavigate("requests")}>Requests</button>
          <button className={currentPage === "teams" ? 'active' : ''} onClick={() => onNavigate("teams")}>Teams</button>
          <button className={currentPage === "kanban" ? 'active' : ''} onClick={() => onNavigate("kanban")}>Kanban</button>
          <button className={currentPage === "calendar" ? 'active' : ''} onClick={() => onNavigate("calendar")}>Calendar</button>
          <button className={currentPage === "reports" ? 'active' : ''} onClick={() => onNavigate("reports")}>Reports</button>
          <button className={currentPage === "assets" ? 'active' : ''} onClick={() => onNavigate("assets")}>Assets</button>
        </nav>
      </div>

      <div className="nav-user">
        <div style={{ color: "#cbd5e1" }}>{user?.name || user?.email}</div>
        <button onClick={onLogout} className="btn btn-ghost">Logout</button>
      </div>
    </header>
  );
}
