export default function Dashboard({ user }) {
  return (
    <div className="container">
      <div className="card">
        <h2>Welcome</h2>
        <p>Hello, {user.name || user.email}</p>
        <p>Main project features will start here.</p>
      </div>
    </div>
  );
}
