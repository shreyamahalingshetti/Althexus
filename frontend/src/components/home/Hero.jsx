import logo from "../../assets/images/logo.jpeg";
export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-left">
        <h5>WELCOME TO</h5>

        <h1>ALTHEXUS</h1>

        <h3>Innovative Software Solutions for Modern Businesses</h3>

        <p>
          Althexus Pvt. Ltd. helps startups, businesses, and organizations
          transform ideas into powerful digital products. We specialize in Web
          Development, Mobile Apps, Artificial Intelligence, Cloud Computing,
          Business Automation, Digital Marketing, Branding, and Custom Software
          Solutions.
        </p>

        <div className="buttons">
          <a href="#services" className="btn">
            Explore Services
          </a>

          <a href="#contact" className="btn2">
            Contact Us
          </a>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-circle">
          <img src={logo} alt="Althexus Logo" />
        </div>
      </div>
    </section>
  );
}