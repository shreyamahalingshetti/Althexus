import "./DashboardHome.css";

export default function DashboardHome() {
  return (
    <div className="dashboard-home">
      <h1>Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card">
          <h3>📋 Service Requests</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>📩 Contact Requests</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>💼 Careers</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>👥 Total Visitors</h3>
          <p>0</p>
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
              <td>Pending</td>
            </tr>

            <tr>
              <td>John</td>
              <td>AI Chatbot</td>
              <td>Completed</td>
            </tr>

            <tr>
              <td>David</td>
              <td>Mobile App</td>
              <td>Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}