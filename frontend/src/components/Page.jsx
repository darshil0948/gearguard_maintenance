export default function Page({ title, actions, children }) {
  return (
    <div className="page container">
      <div className="page-header">
        <h3 className="page-title">{title}</h3>
        <div className="page-actions">{actions}</div>
      </div>
      <div className="page-body">{children}</div>
    </div>
  );
}