import { useEffect, useState } from "react";
import { api } from "../services/api";
import InputField from "../components/InputField";
import Button from "../components/Button";
import MaintenanceTable from "../components/MaintenanceTable";

export default function Maintenance({ asset }) {
  const [records, setRecords] = useState([]);
  const [cost, setCost] = useState("");

  useEffect(() => {
    api.getMaintenance(asset._id).then(setRecords);
  }, [asset]);

  const addMaintenance = async () => {
    if (!cost) return alert("Enter cost");

    await api.addMaintenance({
      assetId: asset._id,
      serviceType: "Service",
      cost,
      serviceDate: new Date()
    });

    setRecords(await api.getMaintenance(asset._id));
    setCost("");
  };

  return (
    <div>
      <h4>Maintenance – {asset.name}</h4>

      <InputField
        placeholder="Service cost"
        onChange={e => setCost(e.target.value)}
      />
      <Button text="Add Maintenance" onClick={addMaintenance} />

      <MaintenanceTable records={records} />
    </div>
  );
}
