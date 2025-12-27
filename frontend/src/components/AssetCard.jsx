export default function AssetCard({ asset, onSelect }) {
  return (
    <div
      onClick={() => onSelect(asset)}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "8px",
        cursor: "pointer"
      }}
    >
      <h4>{asset.name}</h4>
      <p>Type: {asset.type}</p>
    </div>
  );
}
