export default function InputField({ placeholder, type = "text", onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      style={{
        padding: "8px",
        margin: "6px 0",
        width: "100%"
      }}
    />
  );
}
