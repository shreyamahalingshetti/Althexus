import "./Settings.css";

export default function Settings() {
  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-card">
        <h2>Company Information</h2>

        <label>Company Name</label>
        <input
          type="text"
          defaultValue="ALTHEXUS"
        />

        <label>Company Email</label>
        <input
          type="email"
          defaultValue="info@althexus.com"
        />

        <label>Admin Password</label>
        <input
          type="password"
          placeholder="Enter new password"
        />

        <button>Save Changes</button>
      </div>
    </div>
  );
}