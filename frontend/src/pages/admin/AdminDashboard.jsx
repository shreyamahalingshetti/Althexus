import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import DashboardHome from "./DashboardHome";
import ServiceRequests from "./ServiceRequests";
import ContactRequests from "./ContactRequests";
import Careers from "./Careers";
import Settings from "./Settings";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);


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