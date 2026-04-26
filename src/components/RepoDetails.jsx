import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const RepoDetails = ({ data }) => {
  const { repo, readme, commits } = data;

  const languageEntries = repo.languages ? Object.entries(repo.languages) : [];
  const totalBytes = languageEntries.reduce((sum, [, bytes]) => sum + bytes, 0);

  return (
    <div className="repo-details-card">
      <div className="repo-details-header">
        <img
          src={repo.owner.avatar}
          alt={repo.owner.username}
          className="repo-details-avatar"
        />
        <div>
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="repo-details-name"
          >
            {repo.owner.username}/{repo.name}
          </a>
          {repo.description && (
            <p className="repo-details-desc">{repo.description}</p>
          )}
        </div>
      </div>

      <div className="repo-details-stats">
        <span>⭐ {repo.stars.toLocaleString()}</span>
        <span>🍴 {repo.forks.toLocaleString()}</span>
        <span>🐛 {repo.issues.toLocaleString()} issues</span>
        {repo.language && <span>💻 {repo.language}</span>}
      </div>

      {languageEntries.length > 0 && (
        <div className="repo-languages">
          <p className="repo-section-label">Languages</p>
          <div className="lang-bar">
            {languageEntries.map(([lang, bytes]) => (
              <div
                key={lang}
                className="lang-bar-segment"
                style={{ flex: bytes }}
                title={`${lang}: ${((bytes / totalBytes) * 100).toFixed(1)}%`}
              />
            ))}
          </div>
          <div className="lang-list">
            {languageEntries.map(([lang, bytes]) => (
              <span key={lang} className="lang-badge">
                {lang}{" "}
                <span className="lang-pct">
                  {((bytes / totalBytes) * 100).toFixed(1)}%
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {commits?.length > 0 && (
        <div className="repo-commits">
          <p className="repo-section-label">Recent Commits</p>
          <ul className="commit-list">
            {commits.map((c, i) => (
              <li key={i} className="commit-item">
                <span className="commit-message">
                  {c.message.split("\n")[0]}
                </span>
                <span className="commit-meta">
                  {c.author} · {new Date(c.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {readme && (
        <div className="repo-readme">
          <p className="repo-section-label">README</p>
          <pre className="readme-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {readme.length > 2000
              ? readme.slice(0, 2000)
              : readme}
            </ReactMarkdown>
          </pre>
        </div>
      )}
    </div>
  );
};

export default RepoDetails;