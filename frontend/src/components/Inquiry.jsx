import { useState } from "react";
import useReveal from "../hooks/useReveal";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Inquiry() {
  const [ref, visible] = useReveal();
  const [form, setForm] = useState({ name: "", email: "", phone: "", companyName: "", serviceRequired: "", projectDescription: "" });
  const [status, setStatus] = useState(null); // "sending" | "success" | "error"

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`${API_BASE_URL}/service-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", companyName: "", serviceRequired: "", projectDescription: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="inquiry"
      ref={ref}
      className={`cta reveal ${visible ? "in-view" : ""}`}
    >
      <h2>Have a Project in Mind?</h2>
      <p>
        Let's discuss your ideas and find the right technology solution
        for your business.
      </p>

      {/* Contact Form */}
      <div className="contact-form-wrapper">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send Us a Message</h3>

          <div className="cf-row">
            <div className="cf-group">
              <label htmlFor="cf-name">Full Name *</label>
              <input
                id="cf-name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="cf-group">
              <label htmlFor="cf-email">Email Address *</label>
              <input
                id="cf-email"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="cf-row">
            <div className="cf-group">
              <label htmlFor="cf-phone">Phone Number *</label>
              <input
                id="cf-phone"
                type="tel"
                name="phone"
                placeholder="+91 XXXXX XXXXX"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="cf-group">
              <label htmlFor="cf-companyName">Company / Organization</label>
              <input
                id="cf-companyName"
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={form.companyName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="cf-group">
            <label htmlFor="cf-serviceRequired">Service Required *</label>
            <select
              id="cf-serviceRequired"
              name="serviceRequired"
              value={form.serviceRequired}
              onChange={handleChange}
              required
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "12px",
                padding: "14px 18px",
                color: "#fff",
                fontSize: "0.97rem",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="" style={{ color: "#000" }}>Select a service</option>
              <option value="Website Development" style={{ color: "#000" }}>Website Development</option>
              <option value="Mobile App Development" style={{ color: "#000" }}>Mobile App Development</option>
              <option value="AI Solutions" style={{ color: "#000" }}>AI Solutions</option>
              <option value="Cloud Services" style={{ color: "#000" }}>Cloud Services</option>
              <option value="Cyber Security" style={{ color: "#000" }}>Cyber Security</option>
              <option value="Business Consultation" style={{ color: "#000" }}>Business Consultation</option>
              <option value="Other" style={{ color: "#000" }}>Other</option>
            </select>
          </div>

          <div className="cf-group">
            <label htmlFor="cf-projectDescription">Project Description *</label>
            <textarea
              id="cf-projectDescription"
              name="projectDescription"
              rows="5"
              placeholder="Tell us about your project, goals, and requirements..."
              value={form.projectDescription}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="cf-submit" disabled={status === "sending"}>
            {status === "sending" ? (
              <>Sending… <i className="fa-solid fa-spinner fa-spin"></i></>
            ) : (
              <>Send Request <i className="fa-solid fa-paper-plane"></i></>
            )}
          </button>

          {status === "success" && (
            <p className="cf-feedback cf-success">
              <i className="fa-solid fa-circle-check"></i> Request sent! We'll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="cf-feedback cf-error">
              <i className="fa-solid fa-circle-xmark"></i> Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}