import { useEffect, useState } from "react";
import { api } from "../services/api";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Page from "../components/Page";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    const list = await api.getTeams();
    setTeams(list || []);
  }

  const create = async () => {
    if (!name) return alert("Team name required");
    await api.createTeam({ name, description });
    setName("");
    setDescription("");
    refresh();
  };

  const remove = async (id) => {
    if (!confirm("Delete this team?")) return;
    await api.deleteTeam(id);
    refresh();
  };

  const update = async (id) => {
    const newName = prompt("Team name" );
    if (!newName) return;
    await api.updateTeam(id, { name: newName });
    refresh();
  };

  return (
    <Page title="Maintenance Teams">
      <div className="card card-hover" style={{ maxWidth: 720, marginBottom: 12 }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <InputField placeholder="Team name" onChange={e => setName(e.target.value)} value={name} />
          <InputField placeholder="Description" onChange={e => setDescription(e.target.value)} value={description} />
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="primary" onClick={create}>Create Team</Button>
            <Button variant="secondary" onClick={() => { setName(''); setDescription(''); }}>Clear</Button>
          </div>
        </div>
      </div>

      <div>
        <h4>All Teams</h4>
        {teams.length === 0 && <div className="muted">No teams yet</div>}
        {teams.map(t => (
          <div key={t._id} className="card card-hover" style={{ padding: 12, marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong>{t.name}</strong>
                <div className="muted">Members: {(t.members || []).length}</div>
                <div className="muted">{t.description}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <Button variant="secondary" className="" onClick={() => update(t._id)} style={{ marginRight: 8 }}>Edit</Button>
                <Button variant="ghost" onClick={() => remove(t._id)}>Delete</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}
