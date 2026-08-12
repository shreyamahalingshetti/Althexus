import "./ServiceRequests.css";

export default function ServiceRequests() {
  return (
    <div className="service-page">
      <div className="page-card">
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
              <td>
                <select className="status-dropdown" defaultValue="Pending">
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>John</td>
              <td>XYZ Technologies</td>
              <td>AI Chatbot</td>
              <td>john@gmail.com</td>
              <td>
                <select className="status-dropdown" defaultValue="Pending">
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>

            <tr>
              <td>3</td>
              <td>David</td>
              <td>PQR Solutions</td>
              <td>Mobile App</td>
              <td>david@gmail.com</td>
              <td>
                <select className="status-dropdown" defaultValue="Pending">
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}