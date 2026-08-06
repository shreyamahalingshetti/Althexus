import useReveal from "../hooks/useReveal";

export default function CTA() {
  const [ref, visible] = useReveal();

  return (
    <section ref={ref} className={`cta reveal ${visible ? "in-view" : ""}`}>
      <h2>Ready to Start Your Next Project?</h2>
      <p>
        Whether you need a website, mobile app, AI solution, cloud
        infrastructure, or a completely custom digital product, Althexus is
        ready to help.
      </p>

      <a href="#inquiry" className="btn">
        Request a Solution
      </a>
    </section>
  );
}
