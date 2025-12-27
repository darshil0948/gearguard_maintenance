export default function MaintenanceTable({ records = [], asset }) {
  return (
    <div>
      <h4>Maintenance for {asset?.name || 'Asset'}</h4>
      <ul>
        {records.length === 0 ? (
          <li className="muted">No maintenance records</li>
        ) : (
          records.map((r) => (
            <li key={r._id}>₹{Number(r.cost || 0).toFixed(2)} — {new Date(r.serviceDate || r.createdAt || Date.now()).toLocaleDateString()}</li>
          ))
        )}
      </ul>
    </div>
  );
}
