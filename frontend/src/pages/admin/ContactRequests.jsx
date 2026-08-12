import "./ContactRequests.css";

export default function ContactRequests() {
  return (
    <div className="contact-page">
      <div className="page-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Rahul</td>
              <td>rahul@gmail.com</td>
              <td>Project Inquiry</td>
              <td>Need a company website.</td>
              <td>06-08-2026</td>
            </tr>

            <tr>
              <td>2</td>
              <td>John</td>
              <td>john@gmail.com</td>
              <td>Support</td>
              <td>Need help with my project.</td>
              <td>06-08-2026</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}