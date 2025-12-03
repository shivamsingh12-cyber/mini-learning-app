import React from "react";
import type { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import LessonPage from "./pages/LessonPage";
import AdminLessonsPage from "./pages/AdminLessonsPage";
import "./index.css";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return <Navigate to="/login" replace />;
  const user = JSON.parse(userStr);
  return user.role === "admin" ? children : <Navigate to="/" replace />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="lesson/:id"
            element={
              <PrivateRoute>
                <LessonPage />
              </PrivateRoute>
            }
          />
          <Route
            path="admin/lessons"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <AdminLessonsPage />
                </AdminRoute>
              </PrivateRoute>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
