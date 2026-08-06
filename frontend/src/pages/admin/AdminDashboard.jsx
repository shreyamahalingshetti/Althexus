import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import DashboardHome from "./DashboardHome";
import ServiceRequests from "./ServiceRequests";
import ContactRequests from "./ContactRequests";
import Careers from "./Careers";
import Settings from "./Settings";


export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

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
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar setActivePage={setActivePage} />
      <div style={{ flex: 1, padding: "20px" }}>
        {renderPage()}
      </div>
    </div>
  );
}