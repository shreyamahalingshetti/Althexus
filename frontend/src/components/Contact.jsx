import useReveal from "../hooks/useReveal";
import { contactCards, socials } from "../data";

export default function Contact() {
  const [ref, visible] = useReveal();

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

      <div className="socials">
        {socials.map((social, i) => (
          <a
            key={i}
            href={social.url}
            target={social.url.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
          >
            <i className={social.icon}></i>
          </a>
        ))}
      </div>
    </section>
  );
}