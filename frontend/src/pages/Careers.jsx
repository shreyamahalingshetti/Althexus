import { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobApplicationModal from "../components/JobApplicationModal";

const searchItems = [
  { name: "Home", cat: "Page", href: "/" },
  { name: "About Althexus", cat: "Page", href: "/#about" },
  { name: "Services", cat: "Page", href: "/#services" },
  { name: "Perks & benefits", cat: "Page", href: "#perks" },
  { name: "Hiring process", cat: "Page", href: "#process" },
];

export default function Careers() {
  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeRole, setActiveRole] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const API_BASE_URL = "http://localhost:5000";

  // Fetch job openings from backend
  const fetchOpenings = async () => {
    setLoading(true);
    setError(null);
    try {
      // GET /api/job-openings is a public endpoint, no token required
      const response = await fetch(`${API_BASE_URL}/api/job-openings?limit=100`);
      if (!response.ok) {
        throw new Error(`Failed to load job openings (Status: ${response.status})`);
      }
      const resData = await response.json();
      setOpenings(resData.data || []);
    } catch (err) {
      setError(err.message || "Failed to retrieve job openings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpenings();
  }, []);

  // Compute dynamic categories/departments from fetched data
  const categories = useMemo(() => {
    const list = openings.map((o) => o.category || "IT");
    return ["All", ...new Set(list)];
  }, [openings]);

  // Filter openings by category and status
  const visibleRoles = useMemo(() => {
    const filtered = activeCategory === "All"
      ? openings
      : openings.filter((o) => (o.category || "IT") === activeCategory);
    return filtered;
  }, [openings, activeCategory]);

  function openRole(role) {
    if ((role.status || "OPEN") === "CLOSED") return;
    setActiveRole(role);
    setModalOpen(true);
  }

  return (
    <div className="careers-page">
      <Navbar active="careers" searchItems={searchItems} />

      {/* ---------- HERO ---------- */}
      <section className="hero" style={{ padding: "90px 0 76px" }}>
        <div className="wrap hero-inner">
          <div className="eyebrow on-dark"><span className="dot"></span>CAREERS AT ALTHEXUS</div>
          <h1 style={{ fontSize: "clamp(34px,5vw,52px)" }}>Build real products, not busywork.</h1>
          <p className="lede">
            We're a small, remote-first team shipping client work that actually goes live. If you
            want ownership over real features from day one, we're hiring.
          </p>
          <a href="#roles" className="btn-primary">View open roles →</a>
        </div>
      </section>

      {/* ---------- VALUES ---------- */}
      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow"><span className="dot"></span>How we work</div>
            <h2>What it's actually like here</h2>
            <p>No filler values-poster language — this is what we mean day to day.</p>
          </div>
          <div className="icon-card-grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
            <div className="icon-card"><span className="eyebrow" style={{ marginBottom: 12 }}>[OWN-01]</span><h3>Real ownership</h3><p>Interns and juniors ship features that go to production, not sandbox tasks.</p></div>
            <div className="icon-card"><span className="eyebrow" style={{ marginBottom: 12 }}>[OWN-02]</span><h3>Direct feedback</h3><p>Small team, short feedback loops. You'll know exactly where you stand.</p></div>
            <div className="icon-card"><span className="eyebrow" style={{ marginBottom: 12 }}>[OWN-03]</span><h3>Remote-first</h3><p>Work from anywhere — we coordinate async and keep meetings minimal.</p></div>
            <div className="icon-card"><span className="eyebrow" style={{ marginBottom: 12 }}>[OWN-04]</span><h3>Learn by shipping</h3><p>You'll touch client work across stacks, not one narrow slice forever.</p></div>
          </div>
        </div>
      </section>

      {/* ---------- OPEN ROLES ---------- */}
      <section id="roles" className="roles">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow"><span className="dot"></span>Open roles</div>
            <h2>Current openings</h2>
            <p>Don't see an exact fit? Apply anyway — tell us where you'd add value.</p>
          </div>

          {loading ? (
            <div style={{ color: "var(--text-dim-light)", padding: "40px 0", fontSize: "16px", textAlign: "center" }}>
              Loading job openings...
            </div>
          ) : error ? (
            <div style={{
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "10px",
              padding: "20px",
              color: "#ef4444",
              maxWidth: "500px",
              margin: "0 auto",
              textAlign: "center"
            }}>
              <p style={{ margin: "0 0 15px 0", fontWeight: "600" }}>{error}</p>
              <button
                onClick={fetchOpenings}
                style={{
                  padding: "8px 16px",
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                Retry
              </button>
            </div>
          ) : openings.length === 0 ? (
            <div className="empty-note">No openings right now — check back soon.</div>
          ) : (
            <>
              <div className="filter-chips">
                {categories.map((c) => (
                  <button
                    key={c}
                    className={`chip${activeCategory === c ? " active" : ""}`}
                    onClick={() => setActiveCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="role-list">
                {visibleRoles.length === 0 ? (
                  <div className="empty-note">
                    No openings in {activeCategory} right now — check back soon, or apply to a role in another category.
                  </div>
                ) : (
                  visibleRoles.map((role) => {
                    const isClosed = (role.status || "OPEN") === "CLOSED";
                    const roleCode = role.code || `JOB-${role._id.substring(role._id.length - 4).toUpperCase()}`;

                    return (
                      <div
                        className="role-card"
                        key={role._id}
                        onClick={() => openRole(role)}
                        style={isClosed ? { opacity: 0.6, cursor: "not-allowed" } : {}}
                      >
                        <div className="role-left">
                          <div className="role-id">
                            {!isClosed && <span className="live"></span>}
                            [{roleCode}] · {role.category || "IT"} · {isClosed ? "CLOSED" : "OPEN"}
                          </div>
                          <h3>{role.title}</h3>
                          <div className="role-meta">
                            <span>{role.type}</span>
                            <span>{role.location || "Remote"}</span>
                          </div>
                        </div>
                        {isClosed ? (
                          <span className="role-apply" style={{ color: "var(--text-dim-light)" }}>Closed</span>
                        ) : (
                          <span className="role-apply">Apply →</span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ---------- PERKS ---------- */}
      <section id="perks">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow"><span className="dot"></span>Perks</div>
            <h2>What you get</h2>
          </div>
          <div className="perks-grid">
            <div className="perk-card"><h4>Flexible hours</h4><p>Work the hours that suit you, as long as deadlines are met.</p></div>
            <div className="perk-card"><h4>Certificate & LOR</h4><p>Formal completion certificate and letter of recommendation for interns.</p></div>
            <div className="perk-card"><h4>Direct mentorship</h4><p>Work alongside senior developers on real client projects.</p></div>
            <div className="perk-card"><h4>Path to full-time</h4><p>Strong interns are considered first for paid, full-time roles.</p></div>
            <div className="perk-card"><h4>Portfolio-ready work</h4><p>Ship things you can actually show in interviews and on GitHub.</p></div>
            <div className="perk-card"><h4>Remote stipend</h4><p>Support for internet/tools on qualifying full-time roles.</p></div>
          </div>
        </div>
      </section>

      {/* ---------- HIRING PROCESS ---------- */}
      <section id="process" className="process">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow on-dark"><span className="dot"></span>Hiring process</div>
            <h2>What happens after you apply</h2>
          </div>
          <div className="proc-grid">
            <div className="proc-card"><div className="idx">01 / APPLY</div><h3>Apply</h3><p>Send your details and a link to your work — resume, GitHub, or portfolio.</p></div>
            <div className="proc-card"><div className="idx">02 / REVIEW</div><h3>Review</h3><p>We review applications within 3–5 business days.</p></div>
            <div className="proc-card"><div className="idx">03 / CALL</div><h3>Intro call</h3><p>A short, casual call about your background and the role — no whiteboard traps.</p></div>
            <div className="proc-card"><div className="idx">04 / DECIDE</div><h3>Decision</h3><p>We confirm fit and next steps, usually within a week of the call.</p></div>
          </div>
        </div>
      </section>

      <Footer />

      <JobApplicationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        jobOpening={activeRole}
      />
    </div>
  );
}
