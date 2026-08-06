import useReveal from "../../hooks/useReveal";
import { services } from "../../data/data.js";

export default function Services() {
  const [ref, visible] = useReveal();

  return (
    <section id="services" ref={ref} className={`services reveal ${visible ? "in-view" : ""}`}>
      <h5>OUR SERVICES</h5>
      <h2>Technology Solutions We Offer</h2>
      <p className="section-text">
        We provide end-to-end digital solutions that help startups,
        businesses, and enterprises grow through innovation.
      </p>

      <div className="service-grid">
        {services.map((service, i) => (
          <div className="card" key={i}>
            <i className={service.icon}></i>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <a href="#contact" className="service-btn">
              {service.btn}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
