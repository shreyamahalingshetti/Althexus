export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-content">
        <div>
          <h2>ALTHEXUS</h2>
          <p>Building Tomorrow's Technology</p>
          <br />
          <p>Empowering businesses with innovative digital solutions.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <a href="#home">Home</a>
          <br />
          <a href="#about">About</a>
          <br />
          <a href="#services">Services</a>
          <br />
          <a href="#contact">Contact</a>
        </div>

        <div>
          <h3>Connect</h3>
          <p>Email:</p>
          <p>althexusofficial@gmail.com</p>
          <br />
          <p>Meerut, Uttar Pradesh</p>
          <p>Remote-First Company</p>
        </div>
      </div>

      <hr />

      <p className="copyright">
        © {year} Althexus Pvt. Ltd. All Rights Reserved.
      </p>
    </footer>
  );
}
