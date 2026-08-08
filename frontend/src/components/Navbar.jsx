import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.jpeg";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "/technology", label: "Technology" },
  { href: "/contact", label: "Contact" },
];
  export default function Navbar() {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((section) => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
          current = section.getAttribute("id");
        }
      });
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const handleClick = (e, href) => {
  if (href === "/technology" || href === "/contact") {
    e.preventDefault();
    navigate(href);
    return;
  }

  if (href === "#home") {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const target = document.querySelector(href);

  if (target) {
    e.preventDefault();
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

  return (
    <nav
      style={{
        background: scrolled ? "rgba(6,19,33,.96)" : "rgba(8,18,35,.80)",
        boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,.35)" : "none",
      }}
    >
      <div className="logo">
        <img src={logo} alt="Althexus Logo" />
        <div>
          <h2>ALTHEXUS</h2>
          <span>Innovate • Build • Grow</span>
        </div>
      </div>

      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={active === link.href.replace("#", "") ? "active" : ""}
              onClick={(e) => handleClick(e, link.href)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <a
  href="/request-solution"
  className="btn"
  onClick={(e) => {
    e.preventDefault();
    navigate("/request-solution");
  }}
>
  Request a Solution
</a>
      <button
  className="admin-btn"
  onClick={() => navigate("/login")}
>
  Admin Login
</button>
    </nav>
  );
}
