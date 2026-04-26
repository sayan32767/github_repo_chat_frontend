import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

const ChatBox = ({ messages, onSend, owner, repo, loading, setMessages }) => {
  const [question, setQuestion] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchChat = async () => {
      if (!owner || !repo) return;
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/chat?repo=${repo}&owner=${owner}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setMessages(data.messages);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchChat();
  }, [owner, repo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = question.trim();
    if (!q || loading) return;
    setQuestion("");
    onSend(q);
  };

  return (
    <div className="chatbox">
      <div className="chatbox-messages">
        {messages.length === 0 && (
          <p className="chatbox-empty">
            Ask anything about <strong>{owner}/{repo}</strong> — architecture, functions, logic…
          </p>
        )}
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} owner={owner} repo={repo} />
        ))}
        {loading && (
          <div className="chat-message chat-message--ai">
            <div className="chat-bubble chat-typing">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <form className="chatbox-input-row" onSubmit={handleSubmit}>
        <input
          id="chat-input"
          type="text"
          placeholder="Ask a question about this repo…"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
        />
        <button id="chat-send-btn" type="submit" className="btn-primary chat-send-btn" disabled={loading || !question.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
