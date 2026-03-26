import { Link, useNavigate, useParams, Outlet } from "react-router-dom";
import { COURSES } from "../data/courses";
import { useProgress } from "../hooks/useProgress";
import { ProgressBar }from "../components/ProgressBar";
import "./CourseDetailPage.css";

export function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate()
  const {
    enroll,
    isEnrolled,
    getProgress,
    isLessonComplete,
  } = useProgress();

  const course = COURSES.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="course-detail-page_not-found">
        <div className="course-detail-page_not-found-icon">😕</div>
        <p className="course-detail-page_not-found-text">
          Course not found.
        </p>
        <Link
          to="/courses"
          className="course-detail-page_not-found-link"
        >
          ← Back to catalog
        </Link>
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);
  const progress = getProgress(course.id, course.lessons.length);

  return (
    <div className="course-detail-page">

      <Link to="/courses" className="course-detail-page_back">
        ← All Courses
      </Link>

      <div className="course-detail-page_layout">

        <div className="course-detail-page_left">

          <div className="course-detail-page_header">
            <div
              className="course-detail-page_pill"
              style={{
                background: `${course.color}1a`,
                border: `1px solid ${course.color}40`,
                color: course.color,
              }}
            >
              {course.category} · {course.level}
            </div>

            <h1 className="course-detail-page_title">
              {course.title}
            </h1>

            <p className="course-detail-page_description">
              {course.description}
            </p>

            <div className="course-detail-page_meta">
              <span>👨‍🏫 {course.instructor}</span>
              <span>⭐ {course.rating}</span>
              <span>👥 {course.students.toLocaleString()}</span>
              <span>⏱ {course.duration}</span>
            </div>
          </div>

          <div>
            <h2 className="course-detail-page_curriculum-title">
              Curriculum · {course.lessons.length} lessons
            </h2>

            <div className="course-detail-page_lesson-list">
              {course.lessons.map((lesson, index) => {
                const done = isLessonComplete(course.id, lesson.id);

                return (
                  <div
                    key={lesson.id}
                    className={[
                      "course-detail-page_lesson-row",
                      enrolled
                        ? "course-detail-page_lesson-row--clickable"
                        : "",
                    ].join(" ")}
                    onClick={() => {
                      if (enrolled) {
                        navigate(
                          `/courses/${course.id}/lessons/${lesson.id}`
                        );
                      }
                    }}
                  >

                    <div
                      className={[
                        "course-detail-page_lesson-circle",
                        done
                          ? "course-detail-page_lesson-circle--done"
                          : "",
                      ].join(" ")}
                    >
                      {done ? "✓" : index + 1}
                    </div>

                    <span
                      className={[
                        "course-detail-page_lesson-title",
                        done
                          ? "course-detail-page_lesson-title--done"
                          : "",
                      ].join(" ")}
                    >
                      {lesson.title}
                    </span>

                    <span className="course-detail-page_lesson-duration">
                      ▶ {lesson.duration}
                    </span>

                    {enrolled && (
                      <span className="course-detail-page_lesson-arrow">
                        ›
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="course-detail-page_right">
          <div className="course-detail-page_enroll-card">

            <div
              className="course-detail-page_enroll-hero"
              style={{
                background: `linear-gradient(
                  135deg,
                  ${course.color}40,
                  ${course.accent}20
                )`,
              }}
            >
              {course.emoji}
            </div>

            <div className="course-detail-page_enroll-body">

              {enrolled ? (
                <>
                  {/* Progress bar */}
                  <div className="course-detail-page_progress">
                    <ProgressBar
                      percent={progress}
                      showLabel
                      height={8}
                    />
                  </div>

                  <button
                    className="course-detail-page_enroll-btn"
                    style={{
                      background: `linear-gradient(
                        135deg,
                        ${course.color},
                        ${course.accent}
                      )`,
                    }}
                    onClick={() =>
                      navigate(
                        `/courses/${course.id}/lessons/${course.lessons[0].id}`
                      )
                    }
                  >
                    {progress > 0
                      ? "Continue Learning →"
                      : "Start Learning →"}
                  </button>
                </>
              ) : (
            
                <button
                  className="course-detail-page_enroll-btn"
                  style={{
                    background: `linear-gradient(
                      135deg,
                      ${course.color},
                      ${course.accent}
                    )`,
                  }}
                  onClick={() => enroll(course.id)}
                >
                  Enroll Free →
                </button>
              )}

              <div className="course-detail-page_course-meta">
                {[
                  ["📚", `${course.lessons.length} lessons`],
                  ["⏱",  course.duration],
                  ["🏆",  course.level],
                  ["♾️",  "Lifetime access"],
                ].map(([icon, text]) => (
                  <div
                    key={text}
                    className="course-detail-page_course-meta-item"
                  >
                    <span>{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>

      <Outlet />

    </div>
  );
}