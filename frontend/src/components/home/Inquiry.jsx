import useReveal from "../../hooks/useReveal";

export default function Inquiry() {
  const [ref, visible] = useReveal();

  return (
    <section id="inquiry" ref={ref} className={`cta reveal ${visible ? "in-view" : ""}`}>
      <h5>DIDN'T FIND WHAT YOU NEED?</h5>
      <h2>Request a Custom Solution</h2>
      <p className="section-text">
        Every business has unique requirements. If you couldn't find the
        service you're looking for, click the button below and tell us about
        your project. Our team will review your request and get back to you
        within <strong>24–48 business hours.</strong>
      </p>

      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLScvPD6b6F0MIRWmpAvDWtz9L71YtLx-Kc75Jra2uKrg3fqxlQ/viewform"
        target="_blank"
        rel="noreferrer"
        className="btn"
      >
        <i className="fa-solid fa-paper-plane"></i> Request a Solution
      </a>
    </section>
  );
}
