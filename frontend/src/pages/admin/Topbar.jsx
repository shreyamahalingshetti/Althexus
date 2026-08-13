import "./Topbar.css";

function formatToday() {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Topbar({ title, subtitle, setSidebarOpen }) {
  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <button 
          className="sidebar-toggle-btn" 
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Toggle Sidebar"
        >
          ☰
        </button>
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