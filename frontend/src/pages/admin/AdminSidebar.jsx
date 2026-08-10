import { useNavigate } from "react-router-dom";
export default function AdminSidebar({ setActivePage, isOpen }) {
 const navigate = useNavigate(); 
  return (
    <div
      className={`admin-sidebar ${isOpen ? "open" : "closed"}`}
      style={{
        width: isOpen ? "250px" : "0px",
        background: "#111827",
        color: "#fff",
        padding: isOpen ? "20px" : "0px",
        overflow: "hidden",
        transition: "0.3s ease",
        flexShrink: 0,
      }}
    >
      <h2>ALTHEXUS</h2>

      <p
        style={{ cursor: "pointer" }}
        onClick={() => setActivePage("dashboard")}
      >
        📊 Dashboard
      </p>

      <p
        style={{ cursor: "pointer" }}
        onClick={() => setActivePage("services")}
      >
        📋 Service Requests
      </p>



      <p
        style={{ cursor: "pointer" }}
        onClick={() => setActivePage("careers")}
      >
        💼 Careers
      </p>

      <p
        style={{ cursor: "pointer" }}
        onClick={() => setActivePage("settings")}
      >
        ⚙️ Settings
      </p>

      <button
  className="logout-btn"
  onClick={() => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  }}
>
  🚪 Logout
</button>
    </div>
  );
}