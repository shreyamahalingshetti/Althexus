import "./Careers.css";

export default function Careers() {
  return (
    <div className="careers-page">
      <h1>Careers</h1>

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
              <button className="resume-btn">Download</button>
            </td>
            <td>Pending</td>
          </tr>

          <tr>
            <td>2</td>
            <td>John David</td>
            <td>john@gmail.com</td>
            <td>UI/UX Designer</td>
            <td>
              <button className="resume-btn">Download</button>
            </td>
            <td>Reviewed</td>
          </tr>

          <tr>
            <td>3</td>
            <td>Priya Singh</td>
            <td>priya@gmail.com</td>
            <td>Backend Developer</td>
            <td>
              <button className="resume-btn">Download</button>
            </td>
            <td>Selected</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}