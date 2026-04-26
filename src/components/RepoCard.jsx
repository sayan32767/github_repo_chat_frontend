const RepoCard = ({ data }) => {
  const { repo, readme, commits } = data;

  return (
    <div className="repo-card">
      <div className="repo-header">
        <img
          src={repo.owner.avatar}
          alt={repo.owner.username}
          className="avatar"
        />
        <div>
          <h2 className="repo-name">
            <a href={repo.url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>
          </h2>
          <p className="repo-owner">by {repo.owner.username}</p>
        </div>
      </div>

      {repo.description && <p className="repo-description">{repo.description}</p>}

      <div className="repo-stats">
        <span>⭐ {repo.stars.toLocaleString()}</span>
        <span>🍴 {repo.forks.toLocaleString()}</span>
        <span>🐛 {repo.issues.toLocaleString()} issues</span>
        {repo.language && <span>💻 {repo.language}</span>}
      </div>

      {commits.length > 0 && (
        <div className="commits-section">
          <h3>Latest Commits</h3>
          <ul className="commit-list">
            {commits.map((c, i) => (
              <li key={i} className="commit-item">
                <span className="commit-message">{c.message.split("\n")[0]}</span>
                <span className="commit-meta">
                  {c.author} · {new Date(c.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {readme && (
        <div className="readme-section">
          <h3>README</h3>
          <pre className="readme-content">{readme.slice(0, 2000)}{readme.length > 2000 ? "\n\n…(truncated)" : ""}</pre>
        </div>
      )}
    </div>
  );
};

export default RepoCard;
