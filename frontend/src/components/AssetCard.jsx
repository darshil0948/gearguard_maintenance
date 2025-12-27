import { useEffect, useState } from "react";
import { api } from "../services/api";
import Maintenance from "./Maintenance";

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.getAssets().then(setAssets);
  }, []);

  const addAsset = async () => {
    await api.addAsset({ name, type: "Vehicle" });
    setAssets(await api.getAssets());
  };

  return (
    <div>
      <h3>Assets</h3>
      <input placeholder="Asset name" onChange={e => setName(e.target.value)} />
      <button onClick={addAsset}>Add</button>

      <ul>
        {assets.map(a => (
          <li key={a._id} onClick={() => setSelected(a)}>
            {a.name}
          </li>
        ))}
      </ul>

      {selected && <Maintenance asset={selected} />}
    </div>
  );
}
