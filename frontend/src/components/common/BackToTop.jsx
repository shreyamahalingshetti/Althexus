import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      id="topBtn"
      onClick={scrollTop}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "fixed",
        right: "25px",
        bottom: "25px",
        width: "55px",
        height: "55px",
        border: "none",
        borderRadius: "50%",
        background: "#0d6efd",
        color: "#fff",
        cursor: "pointer",
        fontSize: "20px",
        display: visible ? "block" : "none",
        zIndex: 999,
        transition: ".3s",
        boxShadow: "0 8px 25px rgba(0,0,0,.35)",
        transform: hover ? "scale(1.1)" : "scale(1)",
      }}
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
}
