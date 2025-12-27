export default function Navbar({ title = "GearGuard" }) {
  return (
    <div style={{
      padding: "10px 20px",
      background: "#222",
      color: "#fff"
    }}>
      <h2>{title}</h2>
    </div>
  );
}
