import { useEffect, useState } from "react";
import { api } from "../services/api";
import Page from "../components/Page";
import Button from "../components/Button";
import InputField from "../components/InputField";

function formatDateKey(d) {
  return d.toISOString().slice(0,10);
}

export default function CalendarView() {
  const [days, setDays] = useState([]);
  const [requestsByDate, setRequestsByDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [subject, setSubject] = useState("");
  const [equipmentId, setEquipmentId] = useState("");
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i=0;i<30;i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      arr.push(d);
    }
    setDays(arr);
    load();
    api.getEquipments().then(setEquipments);
  }, []);

  async function load() {
    const items = await api.getRequests({ type: "Preventive" });
    const grouped = {};
    (items || []).forEach(r => {
      if (!r.scheduledDate) return;
      const k = formatDateKey(new Date(r.scheduledDate));
      grouped[k] = grouped[k] || [];
      grouped[k].push(r);
    });
    setRequestsByDate(grouped);
  }

  async function schedule() {
    if (!subject || !equipmentId || !selectedDate) return alert("Subject, equipment and date required");
    const payload = { subject, equipmentId, type: "Preventive", scheduledDate: new Date(selectedDate) };
    const r = await api.createRequest(payload);
    if (r._id) {
      setSubject(""); setEquipmentId(""); setSelectedDate(null);
      load();
    } else alert("Failed to create");
  }

  return (
    <Page title="Calendar" actions={<Button variant="secondary" onClick={load}>Refresh</Button>}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8 }}>
        {days.map(d => {
          const k = formatDateKey(d);
          const list = requestsByDate[k] || [];
          return (
            <div key={k} onClick={() => setSelectedDate(k)} style={{ minHeight: 80, padding: 8, border: "1px solid #eee", borderRadius: 6, background: selectedDate===k?"#eef2ff":"#fff", cursor: "pointer" }}>
              <div style={{ fontWeight: 700 }}>{d.toLocaleDateString()}</div>
              <div className="muted">{list.length} preventive</div>
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div style={{ marginTop: 12 }}>
          <h4>Schedule for {selectedDate}</h4>
          <div style={{ maxWidth: 640 }}>
            <InputField placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
            <select className="select" value={equipmentId} onChange={e => setEquipmentId(e.target.value)}>
              <option value="">-- select equipment --</option>
              {equipments.map(eq => <option key={eq._id} value={eq._id}>{eq.name}</option>)}
            </select>
            <div style={{ marginTop: 8 }}>
              <Button variant="primary" onClick={schedule}>Create Scheduled Request</Button>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}
