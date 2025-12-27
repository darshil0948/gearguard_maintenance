import { useEffect, useState } from "react";
import { api } from "../services/api";
import InputField from "../components/InputField";
import Button from "../components/Button";

import Page from "../components/Page";

export default function Requests({ user, filters }) {
  const [requests, setRequests] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [subject, setSubject] = useState("");
  const [equipmentId, setEquipmentId] = useState("");
  const [type, setType] = useState("Corrective");
  const [scheduledDate, setScheduledDate] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  useEffect(() => {
    refresh(filters);
    api.getEquipments().then(setEquipments);
  }, [filters]);

  async function refresh(opts = {}) {
    const list = await api.getRequests(opts);
    setRequests(list || []);
  }

  async function onEquipmentChange(id) {
    setEquipmentId(id);
    if (!id) {
      setSelectedEquipment(null);
      return;
    }
    const eq = await api.getEquipment(id);
    setSelectedEquipment(eq);
  }

  const create = async () => {
    if (!subject || !equipmentId) return alert("Subject and Equipment required");
    const payload = { subject, equipmentId, type, notes };
    if (type === "Preventive" && scheduledDate) payload.scheduledDate = new Date(scheduledDate);
    const r = await api.createRequest(payload);
    if (r._id) {
      setSubject("");
      setEquipmentId("");
      setType("Corrective");
      setScheduledDate("");
      setNotes("");
      setSelectedEquipment(null);
      refresh();
    } else {
      alert("Failed to create request");
    }
  };

  const updateStatus = async (id, status) => {
    await api.updateRequest(id, { status });
    refresh();
  };

  return (
    <Page title="Maintenance Requests" actions={<Button variant="primary" onClick={create}>Create Request</Button>}>

      {filters?.equipmentId && (
        <div style={{ marginBottom: 8 }}>
          <strong>Filter:</strong> Equipment: {equipments.find(e => e._id === filters.equipmentId)?.name || filters.equipmentId} <button onClick={() => refresh({})}>Clear</button>
        </div>
      )}

      <div className="card card-hover" style={{ maxWidth: 720, marginBottom: 12 }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <InputField placeholder="Subject" onChange={e => setSubject(e.target.value)} value={subject} />

          <div>
            <label>Equipment</label>
            <select className="select" value={equipmentId} onChange={e => onEquipmentChange(e.target.value)}>
              <option value="">-- select equipment --</option>
              {equipments.map(eq => <option key={eq._id} value={eq._id}>{eq.name}</option>)}
            </select>
          </div>

          {selectedEquipment && (
            <div style={{ margin: "6px 0", padding: 8, background: "#f8fafc", borderRadius: 6 }}>
              <div><strong>Auto-filled:</strong> Team: {selectedEquipment.maintenanceTeam?.name || "—"}</div>
            </div>
          )}

          <div>
            <label>Type</label>
            <select className="select" value={type} onChange={e => setType(e.target.value)}>
              <option>Corrective</option>
              <option>Preventive</option>
            </select>
          </div>

          {type === "Preventive" && (
            <div>
              <label>Scheduled Date</label>
              <input className="input" type="date" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} />
            </div>
          )}

          <InputField placeholder="Notes" onChange={e => setNotes(e.target.value)} value={notes} />

          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="primary" onClick={create}>Create Request</Button>
            <Button variant="secondary" onClick={() => { setSubject(''); setEquipmentId(''); setType('Corrective'); setScheduledDate(''); setNotes(''); setSelectedEquipment(null); }}>Clear</Button>
          </div>
        </div>
      </div>

      <div>
        <h4>All Requests</h4>
        {requests.length === 0 && <div className="muted">No requests yet</div>}
        {requests.map(r => (
          <div key={r._id} className="card card-hover" style={{ padding: 12, marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>{r.subject}</strong>
                <div className="muted">{r.type} • {new Date(r.createdAt).toLocaleString()}</div>
                <div className="muted">Equipment: {r.equipmentId?.name || r.equipmentId}</div>
                {r.scheduledDate && <div className="muted">Scheduled: {new Date(r.scheduledDate).toLocaleDateString()}</div>}
              </div>

              <div style={{ textAlign: "right" }}>
                <div>
                  <select value={r.status} onChange={e => updateStatus(r._id, e.target.value)}>
                    <option>New</option>
                    <option>In Progress</option>
                    <option>Repaired</option>
                    <option>Scrap</option>
                  </select>
                </div>
                <div className="muted">Assigned: {r.assignedTo?.name || "—"}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}
