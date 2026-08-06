import useReveal from "../../hooks/useReveal";
import { process } from "../../data/data";
export default function Process() {
  const [ref, visible] = useReveal();

  return (
    <section ref={ref} className={`process reveal ${visible ? "in-view" : ""}`}>
      <h5>OUR PROCESS</h5>
      <h2>How We Work</h2>

      <div className="process-grid">
        {process.map((step) => (
          <div className="process-card" key={step.number}>
            <div className="number">{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
