export default function Button({ text, children, onClick, variant = "primary", className = "" }) {
  const cls = `btn btn-${variant} ${className}`.trim();
  return (
    <button className={cls} onClick={onClick}>
      {children || text}
    </button>
  );
}
