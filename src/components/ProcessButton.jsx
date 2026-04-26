const ProcessButton = ({ onProcess, disabled }) => {
  return (
    <div className="process-section">
      <p className="process-hint">
        This repository has not been processed yet. Process it to enable the AI assistant.
      </p>
      <button
        id="process-btn"
        className="btn-primary process-btn"
        onClick={onProcess}
        disabled={disabled}
      >
        {disabled ? "Processing…" : "⚙ Process Repository"}
      </button>
    </div>
  );
};

export default ProcessButton;
