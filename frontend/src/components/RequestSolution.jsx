import { useState } from "react";
import "./RequestSolution.css";

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

        <form className="request-form" onSubmit={handleSubmit}>

          <div className="form-row">

            <div className="form-group">
              <label>FULL NAME *</label>

              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>EMAIL ADDRESS *</label>

              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
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

            <div className="form-group">
              <label>PHONE NUMBER *</label>

              <input
                type="tel"
                name="phone"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>SERVICE REQUIRED *</label>

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Select a service</option>
                <option value="Website Development">
                  Website Development
                </option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="AI Solutions">
                  AI Solutions
                </option>
                <option value="Cloud Services">
                  Cloud Services
                </option>
                <option value="Cyber Security">
                  Cyber Security
                </option>
                <option value="Business Consultation">
                  Business Consultation
                </option>
                <option value="Other">Other</option>
              </select>
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

          <div className="form-group">
            <label>PROJECT DETAILS *</label>

            <textarea
              name="message"
              placeholder="Tell us about your project, requirements, expected features, goals, and any other details..."
              value={formData.message}
              onChange={handleChange}
              required
            />
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

