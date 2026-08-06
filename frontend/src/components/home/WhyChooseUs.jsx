import useReveal from "../../hooks/useReveal";
import { whyCards } from "../../data/data";
export default function WhyChooseUs() {
  const [ref, visible] = useReveal();

  return (
    <section ref={ref} className={`why reveal ${visible ? "in-view" : ""}`}>
      <h5>WHY CHOOSE US</h5>
      <h2>Why Businesses Choose Althexus</h2>
      <p className="section-text">
        We focus on quality, innovation, and long-term partnerships. Every
        project is handled with attention to detail, ensuring solutions that
        are secure, scalable, and future-ready.
      </p>

      <div className="why-grid">
        {whyCards.map((card, i) => (
          <div className="why-card" key={i}>
            <i className={card.icon}></i>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
