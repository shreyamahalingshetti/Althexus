import useReveal from "../../hooks/useReveal";

export default function Mission() {
  const [ref, visible] = useReveal();

  return (
    <section ref={ref} className={`mission reveal ${visible ? "in-view" : ""}`}>
      <div className="mission-card">
        <i className="fa-solid fa-bullseye"></i>
        <h2>Our Mission</h2>
        <p>
          To deliver innovative, reliable, and scalable technology solutions
          that empower businesses to succeed in the digital world while
          maintaining quality, transparency, and trust.
        </p>
      </div>

      <div className="mission-card">
        <i className="fa-solid fa-eye"></i>
        <h2>Our Vision</h2>
        <p>
          To become a trusted technology partner recognized for innovation,
          excellence, and creating impactful digital experiences for
          businesses around the world.
        </p>
      </div>
    </section>
  );
}
