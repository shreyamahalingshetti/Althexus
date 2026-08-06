import "./ServiceRequests.css";

export default function ServiceRequests() {
  return (
    <div className="service-page">
      <h1>Service Requests</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Company</th>
            <th>Service</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Rahul</td>
            <td>ABC Pvt Ltd</td>
            <td>Web Development</td>
            <td>rahul@gmail.com</td>
            <td>Pending</td>
          </tr>

          <tr>
            <td>2</td>
            <td>John</td>
            <td>XYZ Technologies</td>
            <td>AI Chatbot</td>
            <td>john@gmail.com</td>
            <td>Completed</td>
          </tr>

          <tr>
            <td>3</td>
            <td>David</td>
            <td>PQR Solutions</td>
            <td>Mobile App</td>
            <td>david@gmail.com</td>
            <td>Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}