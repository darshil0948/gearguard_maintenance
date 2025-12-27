import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Maintenance({ asset }) {
  const [records, setRecords] = useState([]);
  const [cost, setCost] = useState("");

  useEffect(() => {
    api.getMaintenance(asset._id).then(setRecords);
  }, [asset]);

  const addRecord = async () => {
    await api.addMaintenance({
      assetId: asset._id,
      serviceType: "Service",
      cost
    });
    setRecords(await api.getMaintenance(asset._id));
  };

  return (
    <div>
      <h4>Maintenance for {asset.name}</h4>
      <input placeholder="Cost" onChange={e => setCost(e.target.value)} />
      <button onClick={addRecord}>Add</button>

      <ul>
        {records.map(r => (
          <li key={r._id}>₹{r.cost}</li>
        ))}
      </ul>
    </div>
  );
}
