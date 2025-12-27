export default function StatCard({ label, value, className = "" }) {
  return (
    <div className={`stat-card ${className}`.trim()}>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
}