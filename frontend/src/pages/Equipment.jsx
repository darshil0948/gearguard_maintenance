import { useEffect, useState } from "react";
import { api } from "../services/api";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Page from "../components/Page";

export default function Equipment({ setPage, setFilters }) {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [location, setLocation] = useState("");
  const [teams, setTeams] = useState([]);
  const [maintenanceTeam, setMaintenanceTeam] = useState("");
  const [counts, setCounts] = useState({});

  useEffect(() => {
    refresh();
    api.getTeams().then(setTeams);
  }, []);

  async function refresh() {
    const items = await api.getEquipments();
    setList(items || []);

    // fetch open request counts for badges
    const counts = {};
    await Promise.all((items || []).map(async (eq) => {
      const reqs = await api.getEquipmentRequests(eq._id);
      counts[eq._id] = (reqs || []).filter(r => r.status !== 'Repaired' && r.status !== 'Scrap').length;
    }));
    setCounts(counts);
  }

  const add = async () => {
    if (!name) return alert("Enter name");
    await api.createEquipment({ name, serialNumber, category, department, ownerName, location, maintenanceTeam: maintenanceTeam || undefined });
    setName("");
    setSerialNumber("");
    setCategory("");
    setDepartment("");
    setOwnerName("");
    setLocation("");
    setMaintenanceTeam("");
    refresh();
  };

  return (
    <Page title="Equipment">
      <div className="page-grid">
        <div className="content-column">
          <h4>All Equipment</h4>
          {list.length === 0 && <div className="muted">No equipment yet</div>}
          {list.map(eq => (
            <div key={eq._id} className="card card-hover" style={{ padding: 12, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <strong>{eq.name}</strong> <span className="muted">{eq.serialNumber}</span>
                  <div className="muted">{eq.category} • {eq.department} • {eq.location}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="muted">Team: {eq.maintenanceTeam?.name || "—"}</div>
                  <div style={{ marginTop: 8 }}>
                    <Button variant="primary" onClick={async () => {
                      const reqs = await api.getEquipmentRequests(eq._id);
                      const count = reqs.length;
                      if (setFilters && setPage) {
                        setFilters({ equipmentId: eq._id });
                        setPage('requests');
                      } else {
                        alert(`${count} requests for ${eq.name}`);
                      }
                    }}>Maintenance ({counts[eq._id] || 0})</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="form-column">
          <div className="card card-hover" style={{ marginBottom: 12 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <InputField placeholder="Name" onChange={e => setName(e.target.value)} value={name} />
              <InputField placeholder="Serial Number" onChange={e => setSerialNumber(e.target.value)} value={serialNumber} />
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                <InputField placeholder="Category" onChange={e => setCategory(e.target.value)} value={category} />
                <InputField placeholder="Department" onChange={e => setDepartment(e.target.value)} value={department} />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                <InputField placeholder="Owner Name" onChange={e => setOwnerName(e.target.value)} value={ownerName} />
                <InputField placeholder="Location" onChange={e => setLocation(e.target.value)} value={location} />
              </div>

              <div>
                <label>Maintenance Team</label>
                <select className="select" value={maintenanceTeam} onChange={e => setMaintenanceTeam(e.target.value)}>
                  <option value="">-- none --</option>
                  {teams.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                </select>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="primary" onClick={add}>Add Equipment</Button>
                <Button variant="secondary" onClick={() => { setName(''); setSerialNumber(''); setCategory(''); setDepartment(''); setOwnerName(''); setLocation(''); setMaintenanceTeam(''); }}>Clear</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
