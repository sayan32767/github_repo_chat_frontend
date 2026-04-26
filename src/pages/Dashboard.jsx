import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchRepo } from "../api/api";
import RepoCard from "../components/RepoCard";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleFetch = async (e) => {
    e.preventDefault();
    setError("");
    setData(null);
    setLoading(true);
    try {
      const res = await fetchRepo(owner.trim(), repo.trim());
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch repository");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <span className="logo">GitFetcher</span>
        <button id="logout-btn" className="btn-outline" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        <h2>Fetch a GitHub Repository</h2>
        <form className="fetch-form" onSubmit={handleFetch}>
          <input
            id="owner-input"
            type="text"
            placeholder="Owner (e.g. facebook)"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
          />
          <input
            id="repo-input"
            type="text"
            placeholder="Repository (e.g. react)"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            required
          />
          <button id="fetch-btn" type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Fetching…" : "Fetch Repo"}
          </button>
        </form>

        {error && <p className="error-msg">{error}</p>}
        {data && <RepoCard data={data} />}
      </main>
    </div>
  );
};

export default Dashboard;
