import { useState, useMemo } from "react";
import { COURSES } from "../data/courses";
import { useProgress } from "../hooks/useProgress";
import { CourseCard } from "../components/CourseCard";
import "./CatalogPage.css";

export default function CatalogPage() {
  const { getProgress, isEnrolled } = useProgress();

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(COURSES.map((c) => c.category))],
    []
  );

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      const query = search.toLowerCase();

      const matchesSearch =
        course.title.toLowerCase().includes(query) ||
        course.subtitle.toLowerCase().includes(query);

      const matchesCategory =
        activeFilter === "All" || course.category === activeFilter;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeFilter]);

  return (
    <div className="catalog-page">

      <div className="catalog-page_header">
        <h1 className="catalog-page_title">Course Catalog</h1>
        <p className="catalog-page_subtitle">
          {COURSES.length} courses to level up your engineering career
        </p>
      </div>

      <div className="catalog-page_filters">

        <input
          className="catalog-page_search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses…"
        />

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={[
              "catalog-page_filter-btn",
              activeFilter === category
                ? "catalog-page_filter-btn--active"
                : "catalog-page_filter-btn--inactive",
            ].join(" ")}
          >
            {category}
          </button>
        ))}

      </div>

      {filteredCourses.length === 0 ? (

        <div className="catalog-page_empty">
          <div className="catalog-page_empty-icon">🔍</div>
          <p>No courses match your search.</p>
        </div>

      ) : (

        <div className="catalog-page__grid">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              enrolled={isEnrolled(course.id)}
              progress={getProgress(course.id, course.lessons.length)}
            />
          ))}
        </div>

      )}
    </div>
  );
}