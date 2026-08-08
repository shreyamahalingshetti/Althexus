import useReveal from "../hooks/useReveal";
import { useSettings } from "../context/SettingsContext";

function getSocialIcon(platform = "") {
  const p = platform.toLowerCase();
  if (p.includes("linkedin")) return "fab fa-linkedin";
  if (p.includes("instagram")) return "fab fa-instagram";
  if (p.includes("whatsapp")) return "fab fa-whatsapp";
  if (p.includes("twitter") || p.includes("x")) return "fab fa-x-twitter";
  if (p.includes("facebook")) return "fab fa-facebook";
  if (p.includes("github")) return "fab fa-github";
  return "fa-solid fa-globe";
}

export default function Contact() {
  const [ref, visible] = useReveal();
  const { settings } = useSettings();

  const cards = [
    {
      icon: "fa-solid fa-envelope",
      title: "Email",
      text: settings.email || "althexusofficial@gmail.com",
    },
    {
      icon: "fa-solid fa-location-dot",
      title: "Location",
      html: (settings.address || "Meerut, Uttar Pradesh\nRemote-First Company").replace(/\n/g, "<br />"),
    },
    {
      icon: "fa-solid fa-headset",
      title: "Support",
      text: settings.phone ? `Phone: ${settings.phone}` : "Available for project discussions and business inquiries.",
    },
  ];

  return (

    <section
      id="contact"
      ref={ref}
      className={`contact reveal ${visible ? "in-view" : ""}`}
    >
      <div className="contact-header">
        <div className="section-label">CONTACT US</div>

        <h2>Let's Build Something Amazing Together</h2>

        <p>
          We'd love to hear your ideas and discuss how Althexus can help turn
          them into reality.
        </p>
      </div>

      <div className="contact-cards">
        {contactCards.map((card, i) => (
    <section id="contact" ref={ref} className={`contact reveal ${visible ? "in-view" : ""}`}>
      <h5>CONTACT US</h5>
      <h2>Let's Build Something Amazing Together</h2>
      <p>
        We'd love to hear your ideas and discuss how {settings.companyName} can help turn
        them into reality.
      </p>

      <div className="contact-grid">
        {cards.map((card, i) =>
          <div className="contact-card" key={i}>
            <i className={card.icon}></i>

            <h3>{card.title}</h3>

            {card.html ? (
              <p dangerouslySetInnerHTML={{ __html: card.html }} />
            ) : (
              <p>{card.text}</p>
            )}
          </div>
        ))}
      </div>

      {settings.socialLinks && settings.socialLinks.length > 0 && (
        <div className="socials">
          {settings.socialLinks.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target={social.url?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              title={social.platform}
            >
              <i className={getSocialIcon(social.platform)}></i>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}