import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import { useSettings } from "../context/SettingsContext";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#technology", label: "Technology" },
  { href: "#contact", label: "Contact" },
  { href: "/careers", label: "Careers", isPage: true },
];

export default function Navbar() {
  const { settings } = useSettings();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      if (isHomePage) {
        const sections = document.querySelectorAll("section[id]");
        let current = "";
        sections.forEach((section) => {
          const top = section.offsetTop - 120;
          if (window.scrollY >= top) current = section.getAttribute("id");
        });
        setActive(current);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleClick = (e, href) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      if (isHomePage) {
        e.preventDefault();
        if (href === "#home") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            zIndex: 998, backdropFilter: "blur(2px)",
          }}
        />
      )}

      <header
        style={{
          position: "sticky", top: 0, zIndex: 999,
          background: scrolled ? "rgba(6,19,33,.97)" : "rgba(8,18,35,.85)",
          boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,.35)" : "none",
          width: "100%", backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          transition: "background 0.35s, box-shadow 0.35s",
        }}
      >
        <nav className="navbar-inner">
          {/* Logo */}
          <div className="logo">
            <img src={logo} alt={`${settings.companyName} Logo`} />
            <div>
              <h2>{settings.companyName}</h2>
              <span>Innovate • Build • Grow</span>
            </div>
          </div>

          {/* Desktop links */}
          <ul className="nav-links">
            {links.map((link) => {
              const isActive = link.isPage 
                ? location.pathname === link.href 
                : (isHomePage 
                    ? (active === link.href.replace("#", "") || (active === "" && link.href === "#home"))
                    : location.pathname === `/${link.href.replace("#", "")}`
                  );
              return (
                <li key={link.href}>
                  {link.isPage ? (
                    <Link to={link.href} className={isActive ? "active" : ""}>
                      {link.label}
                    </Link>
                  ) : (
                    <Link
                      to={isHomePage ? link.href : `/${link.href}`}
                      className={isActive ? "active" : ""}
                      onClick={(e) => handleClick(e, link.href)}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="nav-cta">
            {isHomePage ? (
              <a href="#inquiry" className="btn-primary" onClick={(e) => handleClick(e, "#inquiry")}>
                Request a Solution
              </a>
            ) : (
              <Link to="/#inquiry" className="btn-primary">Request a Solution</Link>
            )}
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <span /><span /><span />
          </button>
        </nav>

        {/* Mobile drawer */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                {link.isPage ? (
                  <Link to={link.href} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    to={isHomePage ? link.href : `/${link.href}`}
                    onClick={(e) => handleClick(e, link.href)}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div style={{ padding: "0 24px 28px" }}>
            {isHomePage ? (
              <a href="#inquiry" className="btn" style={{ display: "block", textAlign: "center" }}
                onClick={(e) => handleClick(e, "#inquiry")}>
                Request a Solution
              </a>
            ) : (
              <Link to="/#inquiry" className="btn" style={{ display: "block", textAlign: "center" }}
                onClick={() => setMenuOpen(false)}>
                Request a Solution
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
