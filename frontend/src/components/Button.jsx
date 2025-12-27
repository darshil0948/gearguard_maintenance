export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        margin: "6px 0",
        backgroundColor: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      }}
    >
      {text}
    </button>
  );
}
