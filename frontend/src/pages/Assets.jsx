import { useEffect, useState } from "react";
import { api } from "../services/api";
import AssetCard from "../components/AssetCard";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Maintenance from "./Maintenance";
import Page from "../components/Page";

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
    <Page title="Assets">
      <div className="card card-hover" style={{ maxWidth: 720, marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <InputField placeholder="Asset name" value={name} onChange={e => setName(e.target.value)} />
          <Button variant="primary" onClick={addAsset}>Add Asset</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {assets.map(asset => (
          <div key={asset._id} className="card card-hover">
            <AssetCard asset={asset} onSelect={setSelectedAsset} />
          </div>
        ))}
      </div>

      {selectedAsset && <section className="panel maintenance-panel"><Maintenance asset={selectedAsset} /></section>}
    </Page>
  );
}
