import "./DashboardHome.css";

const CARDS = [
  { icon: "📋", label: "Service Requests", value: 0, color: "blue" },
  { icon: "📩", label: "Contact Requests", value: 0, color: "pink" },
  { icon: "💼", label: "Careers", value: 0, color: "amber" },
  { icon: "👥", label: "Total Visitors", value: 0, color: "green" },
];

const QUICK_ACTIONS = [
  { icon: "📋", label: "Service Requests", page: "services" },
  { icon: "📩", label: "Contact Requests", page: "contacts" },
  { icon: "💼", label: "Careers", page: "careers" },
  { icon: "⚙️", label: "Settings", page: "settings" },
];

export default function DashboardHome({ setActivePage }) {
  return (
    <div className="dashboard-home">

      <div className="dashboard-cards">
        {CARDS.map((c) => (
          <div className="kpi-card" key={c.label}>
            <div className={`kpi-icon kpi-${c.color}`}>{c.icon}</div>
            <div className="kpi-value">{c.value}</div>
            <div className="kpi-label">{c.label}</div>
            <div className={`kpi-bar kpi-bar-${c.color}`} />
          </div>
        ))}
      </div>

      <div className="quick-actions">
        <h2>⚡ Quick Actions</h2>

        <div className="quick-actions-grid">
          {QUICK_ACTIONS.map((a) => (
            <button
              key={a.page}
              className="quick-action-tile"
              onClick={() => setActivePage && setActivePage(a.page)}
            >
              <span className="quick-action-icon">{a.icon}</span>
              <span>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="recent-section">
        <h2>Recent Activity</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Request</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Rahul</td>
              <td>Web Development</td>
              <td><span className="status-pill status-pending">Pending</span></td>
            </tr>

            <tr>
              <td>John</td>
              <td>AI Chatbot</td>
              <td><span className="status-pill status-completed">Completed</span></td>
            </tr>

            <tr>
              <td>David</td>
              <td>Mobile App</td>
              <td><span className="status-pill status-pending">Pending</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}