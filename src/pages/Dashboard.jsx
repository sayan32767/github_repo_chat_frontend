import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RepoInput from "../components/RepoInput";
import Sidebar from "../components/SideBar";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <span className="logo">Github Repo Chat</span>
        <button id="logout-btn" className="btn-outline" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <main className="dashboard-main">
        <Sidebar />
        <div className="dashboard-content">
          <RepoInput />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
