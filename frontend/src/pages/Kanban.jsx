import { useEffect, useState } from "react";
import { api } from "../services/api";
import Page from "../components/Page";
import Button from "../components/Button";

const STATUSES = ["New", "In Progress", "Repaired", "Scrap"];

export default function Kanban() {
  const [columns, setColumns] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const items = await api.getRequests();
    const grouped = STATUSES.reduce((acc, s) => ({ ...acc, [s]: items.filter(i => i.status === s) }), {});
    setColumns(grouped);
    setLoading(false);
  }

  function onDragStart(e, item) {
    e.dataTransfer.setData("text/plain", item._id);
  }

  async function onDrop(e, status) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (!id) return;
    await api.updateRequest(id, { status });
    load();
  }

  return (
    <Page title="Kanban" actions={<Button variant="secondary" onClick={load}>Refresh</Button>}>
      {loading ? <div className="muted">Loading…</div> : (
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          {STATUSES.map(s => (
            <div key={s} onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(e, s)} style={{ flex: 1 }}>
              <h4 style={{ marginTop: 0 }}>{s} <small className="muted">({(columns[s] || []).length})</small></h4>
              <div className="card" style={{ minHeight: 200, padding: 12 }}>
                {(columns[s] || []).map(item => (
                  <div key={item._id} draggable onDragStart={(e) => onDragStart(e, item)} style={{ padding: 10, border: "1px solid #eee", marginBottom: 8, borderRadius: 6, background: "#fafafa" }}>
                    <div style={{ fontWeight: 700 }}>{item.subject}</div>
                    <div className="muted">{item.type} • {item.equipmentId?.name}</div>
                    <div style={{ marginTop: 8 }}>
                      <small className="muted">Assigned: {item.assignedTo?.name || "—"}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Page>
  );
}
