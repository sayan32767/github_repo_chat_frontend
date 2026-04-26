import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRepoStatus, fetchRepo, processRepo, queryRepo } from "../api/api";
import RepoDetails from "../components/RepoDetails";
import ProcessButton from "../components/ProcessButton";
import ChatBox from "../components/ChatBox";

const RepoPage = () => {
  const { owner, repo } = useParams();
  const navigate = useNavigate();

  const [repoDetails, setRepoDetails] = useState(null);
  const [status, setStatus] = useState("not_processed");
  const [pageLoading, setPageLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const init = async () => {
      setPageLoading(true);
      setError("");
      try {
        const [ghRes, statusRes] = await Promise.allSettled([
          fetchRepo(owner, repo),
          getRepoStatus(owner, repo),
        ]);

        if (ghRes.status === "fulfilled") {
          setRepoDetails(ghRes.value.data);
        } else {
          setError("Repository not found on GitHub.");
        }

        if (statusRes.status === "fulfilled") {
          const s = statusRes.value.data;
          if (s.processed) setStatus("processed");
          else if (s.processing) setStatus("processing");
          else setStatus("not_processed");
        }
      } finally {
        setPageLoading(false);
      }
    };

    init();
  }, [owner, repo]);

  const handleProcess = async () => {
    setStatus("processing");
    setError("");
    try {
      await processRepo(owner, repo);
      setStatus("processed");
    } catch (err) {
      setError(err.response?.data?.error || "Processing failed. Please try again.");
      setStatus("not_processed");
    }
  };

  const handleQuery = async (question) => {
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setChatLoading(true);
    try {
      const res = await queryRepo(`${owner}/${repo}`, question);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: res.data.answer,
          sources: res.data.sources || [],
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Failed to get an answer. Please try again.", sources: [] },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="repo-page-loading">
        <div className="spinner" />
        <p>Loading repository…</p>
      </div>
    );
  }

  return (
    <div className="repo-page">
      <div className="repo-page-topbar">
        <button className="btn-outline back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>
        <span className="repo-page-breadcrumb">
          {owner} / {repo}
        </span>
      </div>

      {error && <p className="error-msg">{error}</p>}

      {repoDetails && <RepoDetails data={repoDetails} />}

      {status === "not_processed" && (
        <ProcessButton onProcess={handleProcess} disabled={false} />
      )}

      {status === "processing" && (
        <div className="processing-banner">
          <div className="spinner spinner--sm" />
          <span>Processing repository… this may take a minute.</span>
        </div>
      )}

      {status === "processed" && (
        <ChatBox
          messages={messages}
          onSend={handleQuery}
          owner={owner}
          repo={repo}
          loading={chatLoading}
          setMessages={setMessages}
        />
      )}
    </div>
  );
};

export default RepoPage;
