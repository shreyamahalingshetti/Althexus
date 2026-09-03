import { useState } from "react";
import "./RequestSolution.css";
import { validateRequestSolutionForm } from "../utils/validation";

const RequestSolution = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateRequestSolutionForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    console.log("Request submitted:", formData);

    alert("Thank you! Your request has been submitted.");

    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      service: "",
      budget: "",
      timeline: "",
      message: "",
    });
  };

  return (
    <section className="request-page">
      <div className="request-container">

        <div className="request-header">
          <span className="request-label">REQUEST A SOLUTION</span>

          <h1>Send Us a Message</h1>

          <p>
            Tell us about your project, goals, and requirements.
            Our team will review your request and get back to you.
          </p>
        </div>

        <form className="request-form" onSubmit={handleSubmit} noValidate>

          <div className="form-row">

            <div className={`form-group ${errors.name ? "has-error" : ""}`}>
              <label>FULL NAME *</label>

              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className={`form-group ${errors.email ? "has-error" : ""}`}>
              <label>EMAIL ADDRESS *</label>

              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>COMPANY / ORGANIZATION</label>

              <input
                type="text"
                name="company"
                placeholder="Company name"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <div className={`form-group ${errors.phone ? "has-error" : ""}`}>
              <label>PHONE NUMBER *</label>

              <input
                type="tel"
                name="phone"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>

          </div>

          <div className="form-row">

            <div className={`form-group ${errors.service ? "has-error" : ""}`}>
              <label>SERVICE REQUIRED *</label>

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
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
              {errors.service && <span className="field-error">{errors.service}</span>}
            </div>

            <div className="form-group">
              <label>PROJECT BUDGET</label>

              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
              >
                <option value="">Select budget range</option>
                <option value="Below ₹50,000">Below ₹50,000</option>
                <option value="₹50,000 - ₹1 Lakh">
                  ₹50,000 - ₹1 Lakh
                </option>
                <option value="₹1 Lakh - ₹5 Lakhs">
                  ₹1 Lakh - ₹5 Lakhs
                </option>
                <option value="₹5 Lakhs+">₹5 Lakhs+</option>
                <option value="Not decided">Not decided</option>
              </select>
            </div>

          </div>

          <div className="form-group">
            <label>PROJECT TIMELINE</label>

            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
            >
              <option value="">Select timeline</option>
              <option value="Less than 1 month">
                Less than 1 month
              </option>
              <option value="1 - 3 months">1 - 3 months</option>
              <option value="3 - 6 months">3 - 6 months</option>
              <option value="6+ months">6+ months</option>
              <option value="Not decided">Not decided</option>
            </select>
          </div>

          <div className={`form-group ${errors.message ? "has-error" : ""}`}>
            <label>PROJECT DETAILS *</label>

            <textarea
              name="message"
              placeholder="Tell us about your project, requirements, expected features, goals, and any other details..."
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && <span className="field-error">{errors.message}</span>}
          </div>

          <div className="request-footer">
            <p>
              By submitting this form, you agree to be contacted
              regarding your project enquiry.
            </p>

            <button type="submit" className="submit-request">
              Send Project Request
              <span> →</span>
            </button>
          </div>

        </form>

      </div>
    </section>
  );
};

export default RequestSolution;

