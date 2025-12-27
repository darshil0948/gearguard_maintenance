import { useEffect, useState } from "react";
import { api } from "../services/api";
import AssetCard from "../components/AssetCard";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Maintenance from "./Maintenance";

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [name, setName] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    api.getAssets().then(setAssets);
  }, []);

  const addAsset = async () => {
    if (!name) return alert("Enter asset name");
    await api.addAsset({ name, type: "Vehicle" });
    setAssets(await api.getAssets());
    setName("");
  };

  return (
    <div>
      <h3>Assets</h3>

      <InputField
        placeholder="Asset name"
        onChange={e => setName(e.target.value)}
      />
      <Button text="Add Asset" onClick={addAsset} />

      <div>
        {assets.map(asset => (
          <AssetCard
            key={asset._id}
            asset={asset}
            onSelect={setSelectedAsset}
          />
        ))}
      </div>

      {selectedAsset && <Maintenance asset={selectedAsset} />}
    </div>
  );
}
