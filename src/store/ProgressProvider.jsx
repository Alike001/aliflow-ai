import { useState, useCallback } from "react";
import { ProgressContext } from "./ProgressContext";

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    try {
      const raw = JSON.parse(
        localStorage.getItem("el-progress") || "{} "
      );
      return Object.fromEntries(
        Object.entries(raw).map(([courseId, lessonArray]) => [
          courseId,
          new Set(lessonArray),
        ])
      );
    } catch {
      return {};
    }
  });

  const [enrollments, setEnrollments] = useState(() => {
    try {
      return new Set(
        JSON.parse(localStorage.getItem("el_enrollments") || [])
      );
    } catch {
      return new Set();
    }
  });

  const storeProgress = useCallback((newProgress, newEnrollments) => {
    const progressToSave =  Object.fromEntries(
      Object.entries(newProgress).map(([courseId, lessonSet]) => [
        courseId,
        [...lessonSet],
      ])
    );
    localStorage.setItem("el_progress", JSON.stringify(progressToSave));
    localStorage.setItem("el_enrollments", JSON.stringify([...newEnrollments]));
  }, []);

  const enroll = useCallback((courseId) => {
    setEnrollments((prev) => {
      const next = new Set(prev);
      next.add(courseId);
      storeProgress(progress, next);
      return next;
    });
  }, [progress, storeProgress]);

  const markComplete = useCallback((courseId, lessonId) => {
    setProgress((prev) => {
      const lessonSet = new Set(prev[courseId] || []);
      lessonSet.add(lessonId);

       const next = { ...prev, [courseId]: lessonSet };
        storeProgress(next, enrollments);
        return next;
    });
  }, [enrollments, storeProgress]);

   const markIncomplete = useCallback(
    (courseId, lessonId) => {
      setProgress((prev) => {
        const lessonSet = new Set(prev[courseId] || []);
        lessonSet.delete(lessonId);

        const next = { ...prev, [courseId]: lessonSet };
        storeProgress(next, enrollments);
        return next;
      });
    },
    [enrollments, storeProgress]
  );

   const getProgress = useCallback(
    (courseId, totalLessons) => {
      if (!totalLessons) return 0;
      const completedCount = progress[courseId]?.size || 0;
      return Math.round((completedCount / totalLessons) * 100);
    },
    [progress]
  );

  const isLessonComplete = useCallback(
    (courseId, lessonId) => {
      return progress[courseId]?.has(lessonId) || false;
    },
    [progress]
  );

  const isEnrolled = useCallback(
    (courseId) => {
      return enrollments.has(courseId);
    },
    [enrollments]
  );

   const value = {
    enrollments,    
    enroll,         
    markComplete, 
    markIncomplete,  
    getProgress,     
    isLessonComplete,
    isEnrolled,      
  };

  return(
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}