import { useState } from "react";
import useReveal from "../hooks/useReveal";
import { validateInquiryForm } from "../utils/validation";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Inquiry() {
  const [ref, visible] = useReveal();
  const [form, setForm] = useState({ name: "", email: "", phone: "", companyName: "", serviceRequired: "", projectDescription: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // "sending" | "success" | "error"

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateInquiryForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
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
      <p className="inquiry-subtitle">
        Let's discuss your ideas and find the right technology solution
        for your business.
      </p>

      {/* Contact Form */}
      <div className="contact-form-wrapper">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="cf-row">
            <div className={`cf-group ${errors.name ? "has-error" : ""}`}>
              <label htmlFor="cf-name">Full Name *</label>
              <input
                id="cf-name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <span className="cf-field-error">{errors.name}</span>}
            </div>
            <div className={`cf-group ${errors.email ? "has-error" : ""}`}>
              <label htmlFor="cf-email">Email Address *</label>
              <input
                id="cf-email"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <span className="cf-field-error">{errors.email}</span>}
            </div>
          </div>

          <div className="cf-row">
            <div className={`cf-group ${errors.phone ? "has-error" : ""}`}>
              <label htmlFor="cf-phone">Phone Number *</label>
              <input
                id="cf-phone"
                type="tel"
                name="phone"
                placeholder="+91 XXXXX XXXXX"
                value={form.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="cf-field-error">{errors.phone}</span>}
            </div>
            <div className={`cf-group ${errors.serviceRequired ? "has-error" : ""}`}>
              <label htmlFor="cf-serviceRequired">Service Required *</label>
              <select
                id="cf-serviceRequired"
                name="serviceRequired"
                value={form.serviceRequired}
                onChange={handleChange}
                className={form.serviceRequired ? "has-value" : "is-empty"}
              >
                <option value="">Select a service</option>
                <option value="Web Development">Web Development</option>
                <option value="Application Development">Application Development</option>
                <option value="SEO & Ranking">SEO & Ranking</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Design & Branding">Design & Branding</option>
                <option value="CV & Career Services">CV & Career Services</option>
                <option value="Maintenance & Support">Maintenance & Support</option>
                <option value="Other">Other</option>
              </select>
              {errors.serviceRequired && <span className="cf-field-error">{errors.serviceRequired}</span>}
            </div>
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

          <div className={`cf-group ${errors.projectDescription ? "has-error" : ""}`}>
            <label htmlFor="cf-projectDescription">Project Description *</label>
            <textarea
              id="cf-projectDescription"
              name="projectDescription"
              rows="3"
              placeholder="Tell us about your project, goals, and requirements..."
              value={form.projectDescription}
              onChange={handleChange}
            />
            {errors.projectDescription && <span className="cf-field-error">{errors.projectDescription}</span>}
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