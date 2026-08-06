export default function AdminSidebar({ setActivePage }) {
  return (
    <div
      style={{
        width: "250px",
        background: "#111827",
        color: "#fff",
        padding: "20px",
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
        onClick={() => setActivePage("contacts")}
      >
        📩 Contact Requests
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
    </div>
  );
}