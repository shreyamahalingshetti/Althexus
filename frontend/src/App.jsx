import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SettingsProvider } from "./context/SettingsContext";

import Home from "./pages/Home";
import Careers from "./pages/Careers";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RequestSolution from "./pages/RequestSolution";

import Technology from "./components/Technology";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


/* ================================
   ADMIN PROTECTED ROUTE
================================ */

function AdminProtectedRoute() {
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn");

  if (isAdminLoggedIn !== "true") {
    return <Navigate to="/admin/login" replace />;
  }

  return <AdminDashboard />;
}


export default function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <Routes>

          {/* ================================
              MAIN WEBSITE
          ================================= */}

          <Route path="/" element={<Home />} />

          <Route path="/careers" element={<Careers />} />

          <Route
            path="/technology"
            element={
              <>
                <Navbar />
                <Technology />
                <Footer />
              </>
            }
          />

          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <Contact />
                <Footer />
              </>
            }
          />

          <Route
            path="/request-solution"
            element={
              <>
                <Navbar />
                <div className="request-solution-page">
                  <RequestSolution />
                </div>
                <Footer />
              </>
            }
          />


          {/* ================================
              NORMAL LOGIN
          ================================= */}

          <Route path="/login" element={<Login />} />


          {/* ================================
              ADMIN LOGIN
          ================================= */}

          <Route
            path="/admin"
            element={<Navigate to="/admin/login" replace />}
          />

          <Route
            path="/admin/login"
            element={<Login />}
          />


          {/* ================================
              ADMIN DASHBOARD
          ================================= */}

          <Route
            path="/admin/dashboard"
            element={<AdminProtectedRoute />}
          />

        </Routes>
      </SettingsProvider>
    </BrowserRouter>
  );
}