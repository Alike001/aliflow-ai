import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "./ProgressBar";
import "./CourseCard.css";

export function CourseCard({ course, enrolled, progress }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  function handleClick() {
    navigate(`/courses/${course.id}`);
  }

  return (
    <div
      className={`course-card ${isHovered ? "course-card--hovered" : ""}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderColor: isHovered ? course.color + "55" : "var(--border)",
        boxShadow: isHovered
          ? `0 12px 36px ${course.color}20`
          : "none",
      }}
    >
      <div
        className="course-card_thumbnail"
        style={{
          background: `linear-gradient(
            135deg,
            ${course.color}30,
            ${course.accent}18
          )`,
        }}
      >
        <div
          className="course-card_emoji"
          style={{
            background: `linear-gradient(
              135deg,
              ${course.color},
              ${course.accent}
            )`,
            boxShadow: `0 8px 24px ${course.color}40`,
          }}
        >
          {course.emoji}
        </div>

        <div
          className="course-card_level-badge"
          style={{
            color:  course.accent,
            border: `1px solid ${course.color}44`,
          }}
        >
          {course.level}
        </div>

        {enrolled && (
          <div className="course-card_enrolled-badge">
            Enrolled
          </div>
        )}
      </div>

      <div className="course-card_body">

        <div
          className="course-card_category"
          style={{ color: course.color }}
        >
          {course.category}
        </div>

        <h3 className="course-card_title">{course.title}</h3>

        <p className="course-card_subtitle">{course.subtitle}</p>

        <div className="course-card_meta">
          {[
            { icon: "⭐", value: course.rating },
            { icon: "👥", value: course.students.toLocaleString() },
            { icon: "⏱",  value: course.duration },
          ].map(({ icon, value }) => (
            <span key={value} className="course-card_meta-item">
              {icon} {value}
            </span>
          ))}
        </div>

        {enrolled && (
          <div className="course-card_progress">
            <ProgressBar
              percent={progress}
              color={course.color}
              showLabel
            />
          </div>
        )}

      </div>
    </div>
  );
}