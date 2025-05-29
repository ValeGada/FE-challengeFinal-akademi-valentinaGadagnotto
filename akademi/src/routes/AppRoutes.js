import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProfessorLayout from "../layouts/ProfessorLayout";
import StudentLayout from "../layouts/StudentLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import ProfessorDashboard from "../pages/dashboard/ProfessorDashboard";
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import CoursesList from "../pages/courses/CoursesList";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Rutas de superadmin */}
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="courses" element={<CoursesList />} />
        {/* más rutas admin */}
      </Route>

      {/* Rutas de profesor */}
      <Route path="/prof/*" element={<ProfessorLayout />}>
        <Route path="dashboard" element={<ProfessorDashboard />} />
        <Route path="my-courses" element={<CoursesList />} />
        {/* <Route path="new-course" element={<NewCourse />} /> */}
        {/* más rutas teacher */}
      </Route>

      {/* Rutas de alumno */}
      <Route path="/student/*" element={<StudentLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="catalog" element={<CoursesList />} />
        {/* más rutas alumno */}
      </Route>

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRoutes;
