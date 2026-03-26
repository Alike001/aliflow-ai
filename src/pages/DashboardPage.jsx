import { useNavigate } from "react-router-dom";
import { COURSES } from "../data/courses";
import { useAuth } from "../hooks/useAuth";
import { useProgress } from "../hooks/useProgress";
import { ProgressBar } from "../components/ProgressBar";
import "./DashboardPage.css";

export default function DashboardPage() {
  const { user } = useAuth();
  const { enrollments, getProgress } = useProgress();
  const navigate = useNavigate();

  const enrolledCourses = COURSES.filter((c) =>
    enrollments.has(c.id)
  );

  
  const completedLessons = enrolledCourses.reduce((total, course) => {
    const pct = getProgress(course.id, course.lessons.length);
    const doneInCourse = Math.round((pct / 100) * course.lessons.length);
    return total + doneInCourse;
  }, 0);

  const totalLessons = enrolledCourses.reduce(
    (total, course) => total + course.lessons.length,
    0
  );

  const stats = [
    {
      icon:  "📚",
      value: enrolledCourses.length,
      label: "Enrolled Courses",
      color: "var(--accent)",
    },
    {
      icon:  "✅",
      value: completedLessons,
      label: "Lessons Completed",
      color: "var(--success)",
    },
    {
      icon:  "🎯",
      value: totalLessons,
      label: "Total Lessons",
      color: "var(--warning)",
    },
  ];

  return (
    <div className="dashboard-page">

      <div className="dashboard-page_header">
        <h1 className="dashboard-page_title">
          Welcome back, {user.name.split(" ")[0]}
        </h1>
        <p className="dashboard-page_subtitle">
          Here's your learning overview
        </p>
      </div>

      <div className="dashboard-page_stats">
        {stats.map(({ icon, value, label, color }) => (
          <div key={label} className="dashboard-page_stat-card">
            <div className="dashboard-page_stat-icon">{icon}</div>
            <div
              className="dashboard-page_stat-value"
              style={{ color }}
            >
              {value}
            </div>
            <div className="dashboard-page_stat-label">{label}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-page_courses-section">
        <h2 className="dashboard-page_section-title">
          Your Courses
        </h2>

        {enrolledCourses.length === 0 ? (

          <div className="dashboard-page_empty">
            <div className="dashboard-page_empty-icon">🎓</div>
            <p className="dashboard-page_empty-text">
              No courses enrolled yet.
            </p>
            <button
              className="dashboard-page_browse-btn"
              onClick={() => navigate("/courses")}
            >
              Browse Courses
            </button>
          </div>

        ) : (

          <div className="dashboard-page_course-list">
            {enrolledCourses.map((course) => {
              const pct = getProgress(course.id, course.lessons.length);

              return (
                <div
                  key={course.id}
                  className="dashboard-page_course-row"
                  onClick={() => navigate(`/courses/${course.id}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      course.color + "66";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--border)";
                  }}
                >

                  <div
                    className="dashboard-page_course-emoji"
                    style={{
                      background: `linear-gradient(
                        135deg,
                        ${course.color}30,
                        ${course.accent}18
                      )`,
                    }}
                  >
                    {course.emoji}
                  </div>

                  <div className="dashboard-page_course-info">
                    <div className="dashboard-page_course-title">
                      {course.title}
                    </div>
                    <ProgressBar
                      percent={pct}
                      color={course.color}
                    />
                  </div>

                  <div
                    className="dashboard-page_course-pct"
                    style={{
                      color: pct === 100
                        ? "var(--success)"
                        : "var(--muted)",
                    }}
                  >
                    {pct === 100 ? "✓ Done" : `${pct}%`}
                  </div>

                  <div className="dashboard-page_course-chevron">
                    ›
                  </div>

                </div>
              );
            })}
          </div>

        )}
      </div>
    </div>
  );
}