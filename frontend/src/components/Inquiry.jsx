import useReveal from "../hooks/useReveal";

export default function Inquiry() {
  const [ref, visible] = useReveal();

  return (
    <section
      id="inquiry"
      ref={ref}
      className={`cta reveal ${visible ? "in-view" : ""}`}
    >
      <h2>Have a Project in Mind?</h2>

      <p>
        Let's discuss your ideas and find the right technology solution
        for your business.
      </p>
    </section>
  );
}