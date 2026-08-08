import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import DashboardHome from "./DashboardHome";
import ServiceRequests from "./ServiceRequests";
import ContactRequests from "./ContactRequests";
import Careers from "./Careers";
import Settings from "./Settings";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Auth guard — redirect to login if no token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const renderPage = () => {
    switch (activePage) {
      case "services":
        return <ServiceRequests />;
      case "contacts":
        return <ContactRequests />;
      case "careers":
        return <Careers />;
      case "settings":
        return <Settings />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="admin-dashboard">

      <button
        className="hamburger-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      <AdminSidebar
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
      />

      <div className="admin-content">
        {renderPage()}
      </div>

    </div>
  );
}