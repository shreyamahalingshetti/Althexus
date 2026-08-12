import "./Topbar.css";

function formatToday() {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Topbar({ title, subtitle }) {
  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <div className="topbar-icon">◆</div>
        <div>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>

      <div className="topbar-right">
        <div className="topbar-date">
          <span>📅</span>
          {formatToday()}
        </div>
        <div className="topbar-avatar">A</div>
      </div>
    </header>
  );
}