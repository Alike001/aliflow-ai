import "./ProgressBar.css";

export function ProgressBar({
  percent,
  color = "var(--accent)",
  height = 6,               
  showLabel = false, 
}) {

  const isComplete = percent === 100;

  return (
    <div className="progress-bar">
      {showLabel && (
        <div className="progress-bar_label-row">
          <span className="progress-bar__label">Progress</span>
          <span
            className="progress-bar_percent"
            style={{
              color: isComplete ? "var(--success)" : "var(--text)",
            }}
          >
            {percent}%
          </span>
        </div>
      )}

      <div
        className="progress-bar_track"
        style={{ height }}
      >

        <div
          className="progress-bar_fill"
          style={{
            width: `${percent}%`,
            background: isComplete
              ? "linear-gradient(90deg, var(--success), #34d399)"
              : `linear-gradient(90deg, ${color}, var(--accent2))`,
          }}
        />
      </div>

    </div>
  );
}