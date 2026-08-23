import { useState } from "react";
import useReveal from "../hooks/useReveal";
import { useSettings } from "../context/SettingsContext";

function getSocialIcon(platform = "") {
  const p = platform.toLowerCase();
  if (p.includes("linkedin")) return "fab fa-linkedin";
  if (p.includes("instagram")) return "fab fa-instagram";
  if (p.includes("whatsapp")) return "fab fa-whatsapp";
  if (p.includes("twitter") || p.includes("x")) return "fab fa-x-twitter";
  if (p.includes("facebook")) return "fab fa-facebook";
  if (p.includes("youtube")) return "fab fa-youtube";
  if (p.includes("github")) return "fab fa-github";
  if (p.includes("website") || p.includes("globe")) return "fa-solid fa-globe";
  return "fa-solid fa-globe";
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Contact() {
  const [ref, visible] = useReveal();
  const { settings } = useSettings();

  const whatsappChannel = settings.socialLinks?.find(
    (l) => l.platform?.toLowerCase() === "whatsapp channel"
  );

  const cards = [
    {
      icon: "fa-solid fa-envelope",
      title: "Email",
      text: settings.email || "althexusofficial@gmail.com",
    },
    {
      icon: "fa-solid fa-location-dot",
      title: "Location",
      html: (settings.address || "Meerut, Uttar Pradesh\nRemote-First Company").replace(
        /\n/g,
        "<br />"
      ),
    },
    {
      icon: "fa-solid fa-headset",
      title: "Support",
      text: settings.phone
        ? `Phone: ${settings.phone}`
        : "Available for project discussions and business inquiries.",
    },
  ];

  if (whatsappChannel && whatsappChannel.url) {
    cards.push({
      icon: "fab fa-whatsapp",
      title: "WhatsApp Channel",
      text: "Join our official channel for announcements, updates, and news.",
      link: whatsappChannel.url,
    });
  }

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
          We'd love to hear your ideas and discuss how{" "}
          {settings.companyName} can help turn them into reality.
        </p>
      </div>

      {/* Info Cards */}
      <div className="contact-grid">
        {cards.map((card, i) => (
          <div className="contact-card" key={i}>
            <i className={card.icon}></i>
            <h3>{card.title}</h3>
            {card.title === "Email" ? (
              <p>
                <a href={`mailto:${card.text}`} style={{ color: "inherit", textDecoration: "none" }}>
                  {card.text}
                </a>
              </p>
            ) : card.html ? (
              <p dangerouslySetInnerHTML={{ __html: card.html }} />
            ) : (
              <>
                <p>{card.text}</p>
                {card.link && (
                  <p style={{ marginTop: "12px" }}>
                    <a
                      href={card.link}
                      target="_blank"
                      rel="noreferrer"
                      className="contact-card-link"
                      style={{
                        color: "#4fc3ff",
                        textDecoration: "none",
                        fontWeight: "600",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                    >
                      Join Channel <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.8em" }}></i>
                    </a>
                  </p>
                )}
              </>
            )}
          </div>
        ))}
      </div>



      {/* Social Links */}
      {settings.socialLinks && settings.socialLinks.filter(social => social.url && social.url.trim() !== "").length > 0 && (
        <div className="socials">
          {settings.socialLinks.filter(social => social.url && social.url.trim() !== "").map((social, i) => (
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