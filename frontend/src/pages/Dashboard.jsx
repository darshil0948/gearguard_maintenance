import { useEffect, useState } from "react";
import { api } from "../services/api";
import Maintenance from "./Maintenance";
import Button from "../components/Button";
import StatCard from "../components/StatCard";
import "./Dashboard.css";

export default function Dashboard({ user }) {
  const [assets, setAssets] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAssets, setShowAssets] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const a = await api.getAssets();
        if (!mounted) return;
        setAssets(a || []);

        const lists = await Promise.all((a || []).map((asset) => api.getMaintenance(asset._id)));
        if (!mounted) return;
        const flat = lists.flat();
        setRecords(flat || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const totalAssets = assets.length;
  const totalMaintenance = records.length;
  const totalCost = records.reduce((s, r) => s + (Number(r.cost) || 0), 0);
  const upcoming = records.filter((r) => r.nextDueDate && new Date(r.nextDueDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
  const recent = [...records].sort((a, b) => new Date(b.serviceDate) - new Date(a.serviceDate)).slice(0, 5);

  return (
    <div>
      <div className="dashboard-container container">
        <div className="dashboard-main">
          <div className="dashboard-header">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="avatar">{(user?.name || user?.email || "U").slice(0,1).toUpperCase()}</div>
              <div>
                <h2 style={{ margin: 0 }}>Welcome, {user?.name || user?.email}</h2>
                <div className="small muted">Last login: {new Date().toLocaleString()}</div>
              </div>
            </div>

            <div className="overview-actions">
              <Button variant="secondary" onClick={() => setShowAssets((s) => !s)}>{showAssets ? "Hide" : "View"} Assets</Button>
              <Button variant="primary" onClick={() => { window.__setRequestsFilter && window.__setRequestsFilter({}); window.__navigateTo && window.__navigateTo('requests'); }}>Create Request</Button>
              <Button variant="secondary" onClick={() => { window.__navigateTo && window.__navigateTo('kanban'); }}>Open Kanban</Button>
            </div>
          </div>

          {loading ? (
            <p className="muted">Loading…</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <>
              <section className="stats-grid grid cols-4" style={{ gap: 12 }}>
                <StatCard label="Total Assets" value={totalAssets} />
                <StatCard label="Total Maintenance" value={totalMaintenance} />
                <StatCard label="Total Maintenance Cost" value={`$${totalCost.toFixed(2)}`} />
                <StatCard label="Upcoming (30d)" value={upcoming.length} />
              </section>

              <div className="panel-row" style={{ marginTop: 16 }}>
                <div className="panel">
                  <h4>Recent Maintenance</h4>
                  {recent.length === 0 ? (
                    <p className="muted">No recent maintenance</p>
                  ) : (
                    <ul className="recent-list">
                      {recent.map((r) => {
                        const asset = assets.find((a) => a._id === r.assetId);
                        const overdue = r.nextDueDate && new Date(r.nextDueDate) < new Date();
                        return (
                          <li key={r._id} onClick={() => setSelectedAsset(asset)} className={`recent-item ${overdue? 'overdue':''}`}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <div style={{ fontWeight: 700 }}>{r.subject || asset?.name || 'Maintenance'}</div>
                                <div className="muted">{asset?.name} • {new Date(r.serviceDate).toLocaleDateString()}</div>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <div className="muted">${Number(r.cost||0).toFixed(2)}</div>
                                {overdue && <div style={{ color: 'var(--danger)' }}>Overdue</div>}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                <div className="panel">
                  <h4>Assets</h4>
                  {showAssets ? (
                    <div className="assets-grid">
                      {assets.map((a) => (
                        <div key={a._id} className="card card-sm" style={{ minWidth: 200 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                              <div style={{ fontWeight: 700 }}>{a.name}</div>
                              <div className="muted">{a.category} • {a.location}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div className="small muted">Team: {a.maintenanceTeam?.name || '—'}</div>
                              <div style={{ marginTop: 8 }}>
                                <Button variant="primary" onClick={() => { setSelectedAsset(a); setShowAssets(false); }}>Open</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="muted">Click "View Assets" to see and add assets.</p>
                  )}
                </div>
              </div>

              {selectedAsset && (
                <section className="panel maintenance-panel">
                  <Maintenance asset={selectedAsset} />
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
