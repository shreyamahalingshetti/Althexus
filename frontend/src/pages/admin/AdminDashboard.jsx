import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import Topbar from "./Topbar";
import DashboardHome from "./DashboardHome";
import ServiceRequests from "./ServiceRequests";
import ContactRequests from "./ContactRequests";
import Careers from "./Careers";
import Settings from "./Settings";
import "./AdminDashboard.css";

const PAGE_META = {
  dashboard: { title: "Dashboard", subtitle: "Welcome back, Admin! Here's what's happening today." },
  services: { title: "Service Requests", subtitle: "Track and manage incoming service requests." },
  contacts: { title: "Contact Requests", subtitle: "Messages submitted through your contact form." },
  careers: { title: "Careers", subtitle: "Review applications and update hiring status." },
  settings: { title: "Settings", subtitle: "Manage your company profile and account." },
};

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
        return <DashboardHome setActivePage={setActivePage} />;
    }
  };

  const meta = PAGE_META[activePage] || PAGE_META.dashboard;

  return (
    <div className="admin-layout">

      <AdminSidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="admin-content">
        <Topbar title={meta.title} subtitle={meta.subtitle} />
        <div className="admin-page-body">
          {renderPage()}
        </div>
      </main>

    </div>
  );
}