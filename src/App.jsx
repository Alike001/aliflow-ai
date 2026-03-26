import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";

import { AuthProvider } from "./store/AuthContext";
import { ProgressProvider } from "./store/ProgressContext";

import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { LoginPage }  from "./pages/LoginPage";
import { CatalogPage } from "./pages/CatalogPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import { LessonPlayerPage } from "./pages/LessonPlayerPage";
import { DashboardPage } from "./pages/DashboardPage";

function AppLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/courses" replace />,
      },

      {
        path: "login",
        element: <LoginPage />,
      },

      {
        path: "courses",
        element: (
          <ProtectedRoute>
            <CatalogPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "courses/:courseId",
        element: (
          <ProtectedRoute>
            <CourseDetailPage />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "lessons/:lessonId",
            element: <LessonPlayerPage />,
          },
        ],
      },

      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },

    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <RouterProvider router={router} />
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;