import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RequestSolution from "./pages/RequestSolution";

import Technology from "./components/Technology";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

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

        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}