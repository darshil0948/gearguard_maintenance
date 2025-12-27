import { useEffect, useState } from "react";
import { api } from "../services/api";
import Page from "../components/Page";

export default function Reports() {
  const [requests, setRequests] = useState([]);
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    load();
    api.getEquipments().then(setEquipments);
  }, []);

  async function load() {
    const list = await api.getRequests();
    setRequests(list || []);
  }

  const perTeam = () => {
    const map = {};
    requests.forEach(r => {
      const team = (equipments.find(e => e._id === (r.equipmentId?._id || r.equipmentId)) || {}).maintenanceTeam;
      const name = team?.name || "Unassigned";
      map[name] = (map[name] || 0) + 1;
    });
    return map;
  };

  const perCategory = () => {
    const map = {};
    requests.forEach(r => {
      const cat = (equipments.find(e => e._id === (r.equipmentId?._id || r.equipmentId)) || {}).category || "Uncategorized";
      map[cat] = (map[cat] || 0) + 1;
    });
    return map;
  };

  return (
    <Page title="Reports">
      <div className="grid cols-2" style={{ gap: 20 }}>
        <div className="card">
          <h4>Requests per Team</h4>
          {Object.entries(perTeam()).map(([k,v]) => (
            <div key={k} style={{ padding: 8, borderBottom: "1px solid #eee" }}>{k}: <strong>{v}</strong></div>
          ))}
        </div>

        <div className="card">
          <h4>Requests per Equipment Category</h4>
          {Object.entries(perCategory()).map(([k,v]) => (
            <div key={k} style={{ padding: 8, borderBottom: "1px solid #eee" }}>{k}: <strong>{v}</strong></div>
          ))}
        </div>
      </div>
    </Page>
  );
}
