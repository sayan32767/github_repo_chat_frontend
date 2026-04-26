import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [repos, setRepos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/repo/history", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setRepos(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchHistory();
  }, []);

//   if (repos.length === 0) return null;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        {/* <span className="sidebar-icon">🕘</span> */}
        <h3 className="sidebar-title">Recent</h3>
      </div>
      <ul className="sidebar-list">
        {repos.map((repo) => {
          const [owner, name] = repo.repoFullName.split("/");
          return (
            <li
              key={repo.repoFullName}
              className="sidebar-item"
              onClick={() => navigate(`/repo/${owner}/${name}`)}
            >
              <div className="sidebar-item-name">
                <span className="sidebar-owner">{owner}</span>
                <span className="sidebar-slash">/</span>
                <span className="sidebar-repo">{name}</span>
              </div>
              <span className="sidebar-date">
                {new Date(repo.lastAccessedAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;