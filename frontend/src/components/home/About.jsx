import useReveal from "../../hooks/useReveal";
import aboutImg from "../../assets/images/about.jpg";
export default function About() {
  const [ref, visible] = useReveal();

  return (
    <section id="about" ref={ref} className={`about reveal ${visible ? "in-view" : ""}`}>
      <div className="about-image">
        <img src={aboutImg} alt="About Althexus" />
      </div>

      <div className="about-text">
        <h5>ABOUT US</h5>
        <h2>Empowering Businesses Through Technology</h2>
        <p>
          Althexus Pvt. Ltd. is a modern technology company committed to
          helping businesses grow through innovative software solutions,
          digital transformation, and intelligent technologies.
        </p>
        <p>
          Whether you're a startup looking to launch your first product or an
          established business aiming to improve operations, our team focuses
          on building secure, scalable, and user-friendly solutions.
        </p>

        <div className="about-boxes">
          <div className="about-card">
            <i className="fa-solid fa-lightbulb"></i>
            <h4>Innovation</h4>
            <p>We believe every great solution starts with a creative idea.</p>
          </div>

          <div className="about-card">
            <i className="fa-solid fa-handshake"></i>
            <h4>Partnership</h4>
            <p>We work closely with our clients to build lasting relationships.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
