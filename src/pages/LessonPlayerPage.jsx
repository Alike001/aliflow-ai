import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { COURSES } from "../data/courses";
import { useProgress } from "../hooks/useProgress";
import "./LessonPlayerPage.css";

export function LessonPlayerPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const course = COURSES.find((c) => c.id === courseId);
  const lesson = course?.lessons.find((l) => l.id === lessonId);

  const {
    markComplete,
    markIncomplete,
    isLessonComplete,
    isEnrolled,
  } = useProgress();

  const videoRef = useRef(null);

  const enrolled = isEnrolled(courseId);
  const done = isLessonComplete(courseId, lessonId);
  const lessonIndex = course?.lessons.findIndex(
    (l) => l.id === lessonId
  ) ?? 0;

  const prevLesson = course?.lessons[lessonIndex - 1]; // undefined if first
  const nextLesson = course?.lessons[lessonIndex + 1]; // undefined if last

  if (!lesson || !course) {
    return (
      <div className="lesson-player_not-found">
        Lesson not found.
      </div>
    );
  }

  if (!enrolled) {
    return (
      <div className="lesson-player_not-enrolled">
        <p>Enroll in this course to access lessons.</p>
      </div>
    );
  }

  function handleToggleComplete() {
    if (done) {
      markIncomplete(courseId, lessonId);
    } else {
      markComplete(courseId, lessonId);
    }
  }

  function handleVideoEnded() {
    markComplete(courseId, lessonId);
  }

  return (
    <div className="lesson-player">
      <div className="lesson-player_card">

        <div className="lesson-player_header">

          <div className="lesson-player_header-info">
            <div className="lesson-player_lesson-count">
              Lesson {lessonIndex + 1} of {course.lessons.length}
            </div>
            <h3 className="lesson-player_lesson-title">
              {lesson.title}
            </h3>
          </div>

          <button
            className={[
              "lesson-player_complete-btn",
              done
                ? "lesson-player_complete-btn--done"
                : "lesson-player_complete-btn--undone",
            ].join(" ")}
            onClick={handleToggleComplete}
          >
            {done ? "✓ Completed" : "Mark Complete"}
          </button>

        </div>

        <div className="lesson-player_video-wrapper">
         {lesson.type === "embed" ? (
          <iframe
            key={lesson.videoUrl}
            src={lesson.videoUrl}
            className="lesson-player__iframe"
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write;
                  encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

        ) : (
          <video
            ref={videoRef}
            key={lesson.videoUrl}
            controls
            className="lesson-player__video"
            onEnded={handleVideoEnded}
          >
            <source src={lesson.videoUrl} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>

        )}
        </div>

        <div className="lesson-player_nav">

          <button
            disabled={!prevLesson}
            className={[
              "lesson-player__nav-btn",
              prevLesson
                ? "lesson-player_nav-btn--prev"
                : "lesson-player_nav-btn--disabled",
            ].join(" ")}
            onClick={() => {
              if (prevLesson) {
                navigate(
                  `/courses/${courseId}/lessons/${prevLesson.id}`
                );
              }
            }}
          >
            ← Previous
          </button>

          <span className="lesson-player__counter">
            {lessonIndex + 1} / {course.lessons.length}
          </span>

          <button
            disabled={!nextLesson}
            className={[
              "lesson-player__nav-btn",
              nextLesson
                ? "lesson-player__nav-btn--next-active"
                : "lesson-player__nav-btn--disabled",
            ].join(" ")}
            onClick={() => {
              if (nextLesson) {
                navigate(
                  `/courses/${courseId}/lessons/${nextLesson.id}`
                );
              }
            }}
          >
            Next →
          </button>

        </div>
      </div>

    </div>
  );
}