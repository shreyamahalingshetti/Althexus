import "./Careers.css";

export default function Careers() {
  return (
    <div className="careers-page">

      {/* Careers Applications Table */}
      <div className="page-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Applicant</th>
              <th>Email</th>
              <th>Position</th>
              <th>Resume</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Rahul Sharma</td>
              <td>rahul@gmail.com</td>
              <td>Frontend Developer</td>
              <td>
                <button className="resume-btn">
                  Download
                </button>
              </td>
              <td>
                <select
                  className="status-dropdown"
                  defaultValue="Pending"
                >
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>John David</td>
              <td>john@gmail.com</td>
              <td>UI/UX Designer</td>
              <td>
                <button className="resume-btn">
                  Download
                </button>
              </td>
              <td>
                <select
                  className="status-dropdown"
                  defaultValue="Pending"
                >
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>

            <tr>
              <td>3</td>
              <td>Priya Singh</td>
              <td>priya@gmail.com</td>
              <td>Backend Developer</td>
              <td>
                <button className="resume-btn">
                  Download
                </button>
              </td>
              <td>
                <select
                  className="status-dropdown"
                  defaultValue="Pending"
                >
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Careers Footer */}
      <footer className="admin-careers-footer">
        <div className="footer-content">

          <div className="footer-brand">
            <h2>ALTHEXUS</h2>

            <h4>
              Innovative Software Solutions for Modern Businesses
            </h4>

            <p>
              Empowering businesses with innovative digital solutions.
            </p>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 ALTHEXUS. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}