import { useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

const MENU_ITEMS = [
  { key: "dashboard", icon: "📊", label: "Dashboard" },
  { key: "services", icon: "📋", label: "Service Requests" },
  { key: "careers", icon: "💼", label: "Careers" },
  { key: "settings", icon: "⚙️", label: "Settings" },
];

export default function AdminSidebar({ activePage, setActivePage, sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  return (
    <>
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>

        {/* Logo */}
        <div className="sidebar-logo">
          <span className="logo-symbol">🔴</span> ALTHEXUS
        </div>

        {/* Search */}
        <div className="sidebar-search">
          <span>🔍</span>
          <input type="text" placeholder="Search..." />
        </div>

        {/* Menu */}
        <nav className="sidebar-nav">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.key}
              className={`sidebar-link ${activePage === item.key ? "active" : ""}`}
              onClick={() => {
                setActivePage(item.key);
                setSidebarOpen(false);
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom Profile */}
        <div className="sidebar-footer">

          <div className="admin-user">
            <div className="admin-avatar">A</div>
            <div>
              <div className="admin-name">admin</div>
              <div className="admin-role">admin</div>
            </div>
          </div>

          <button
            className="sidebar-logout"
            onClick={() => {
              localStorage.removeItem("adminLoggedIn");
              localStorage.removeItem("adminToken");
              navigate("/");
              setSidebarOpen(false);
            }}
          >
            🚪 Logout
          </button>

        </div>

      </aside>
    </>
  );
}
