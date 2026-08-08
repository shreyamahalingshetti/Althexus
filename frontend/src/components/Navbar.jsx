import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import { useSettings } from "../context/SettingsContext";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "/technology", label: "Technology" },
  { href: "/contact", label: "Contact" },

  { href: "#technology", label: "Technology" },
  { href: "#contact", label: "Contact" },
  { href: "/careers", label: "Careers", isPage: true },
];

export default function Navbar() {
  const { settings } = useSettings();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!isHomePage) {
      setActive("");
      return;
    }
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
  }, [isHomePage]);
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

  useEffect(() => {
    const handleScrollSimple = () => {
      setScrolled(window.scrollY > 80);
    };
    if (!isHomePage) {
      window.addEventListener("scroll", handleScrollSimple);
      handleScrollSimple();
      return () => window.removeEventListener("scroll", handleScrollSimple);
    }
  }, [isHomePage]);

  const handleClick = (e, href) => {
    if (href.startsWith("#")) {
      if (isHomePage) {
        e.preventDefault();
        if (href === "#home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
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
        <img src={logo} alt={`${settings.companyName} Logo`} />
        <div>
          <h2>{settings.companyName}</h2>
          <span>Innovate • Build • Grow</span>
        </div>
      </div>

      <ul>
        {links.map((link) => (
          <li key={link.href}>
            {link.isPage ? (
              <Link
                to={link.href}
                className={location.pathname === link.href ? "active" : ""}
              >
                {link.label}
              </Link>
            ) : (
              <Link
                to={isHomePage ? link.href : `/${link.href}`}
                className={!isHomePage ? "" : active === link.href.replace("#", "") ? "active" : ""}
                onClick={(e) => handleClick(e, link.href)}
              >
                {link.label}
              </Link>
            )}
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
      {isHomePage ? (
        <a href="#inquiry" className="btn" onClick={(e) => handleClick(e, "#inquiry")}>
          Request a Solution
        </a>
      ) : (
        <Link to="/#inquiry" className="btn">
          Request a Solution
        </Link>
      )}

    </nav>
  );
}
