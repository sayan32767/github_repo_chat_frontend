import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatMessage = ({ message, owner, repo }) => {
  const isUser = message.role === "user";

  return (
    <div className={`chat-message ${isUser ? "chat-message--user" : "chat-message--ai"}`}>
      <div className="chat-bubble">
        <div className="chat-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.content}
          </ReactMarkdown>
        </div>
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="chat-sources">
            <p className="chat-sources-label">Sources:</p>
            <ul className="chat-sources-list">
              {message.sources.map((src, i) => (
                <li key={i}>
                  <a
                    href={`https://github.com/${owner}/${repo}/blob/main/${src.filePath}`}
                    target="_blank"
                    rel="noreferrer"
                    className="chat-source-link"
                  >
                    📄 {src.filePath}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
