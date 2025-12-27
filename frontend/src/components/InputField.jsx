export default function InputField({ placeholder, type = "text", onChange, value = "", className = "input" }) {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
