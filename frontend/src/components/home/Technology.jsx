import useReveal from "../../hooks/useReveal";
import { technologies } from "../../data/data.js";
export default function Technology() {
  const [ref, visible] = useReveal();

  return (
    <section
      id="technology"
      ref={ref}
      className={`technology reveal ${visible ? "in-view" : ""}`}
    >
      <h5>TECHNOLOGIES</h5>
      <h2>Technologies We Work With</h2>

      <div className="tech-grid">
        {technologies.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
    </section>
  );
}
