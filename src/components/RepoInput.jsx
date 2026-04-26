import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RepoInput = () => {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (owner.trim() && repo.trim()) {
      navigate(`/repo/${owner.trim()}/${repo.trim()}`);
    }
  };

  return (
    <div className="repo-input-wrapper">
      <h2 className="repo-input-title">GitHub Repository AI Assistant</h2>
      <p className="repo-input-subtitle">
        Enter a GitHub repository to explore and ask questions about its code.
      </p>
      <form className="repo-input-form" onSubmit={handleSubmit}>
        <input
          id="owner-input"
          type="text"
          placeholder="Owner (e.g. facebook)"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          required
        />
        <input
          id="repo-name-input"
          type="text"
          placeholder="Repository (e.g. react)"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          required
        />
        <button id="explore-btn" type="submit" className="btn-primary">
          Explore Repository →
        </button>
      </form>
    </div>
  );
};

export default RepoInput;
