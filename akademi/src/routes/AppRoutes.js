import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProfessorLayout from "../layouts/ProfessorLayout";
import StudentLayout from "../layouts/StudentLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import PasswordReset from "../pages/auth/PasswordReset";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import ProfessorDashboard from "../pages/dashboard/ProfessorDashboard";
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import CoursesList from "../pages/courses/CoursesList";
import CourseDetail from "../pages/courses/CourseDetail";
import NewCourse from "../pages/courses/NewCourse";
import EnrollmentsList from "../pages/enrollments/EnrollmentsList";
import GradesList from "../pages/grades/GradesList";
import UsersList from "../pages/users/UsersList";
import UserProfile from "../pages/users/UserProfile";
import NewUser from "../pages/users/NewUser";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="password-reset/:recoveryToken" element={<PasswordReset />} />
      </Route>

      {/* Rutas de superadmin */}
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="my-profile" element={<UserProfile />} />
        <Route path="courses" element={<CoursesList />} />
        <Route path="courses/:id" element={<CourseDetail />} />
        <Route path="enrollments" element={<EnrollmentsList />} />
        <Route path="enrollments/course/:id" element={<EnrollmentsList />} />
        <Route path="grades/course/:id" element={<EnrollmentsList />} />
        <Route path="users" element={<UsersList />} />
        <Route path="new-user" element={<NewUser />} />
        {/* más rutas admin */}
      </Route>

      {/* Rutas de profesor */}
      <Route path="/prof/*" element={<ProfessorLayout />}>
        <Route path="dashboard" element={<ProfessorDashboard />} />
        <Route path="my-profile" element={<UserProfile />} />
        <Route path="my-courses" element={<CoursesList />} />
        <Route path="courses/:id" element={<CourseDetail />} />
        <Route path="enrollments/course/:id" element={<EnrollmentsList />} />
        <Route path="grades/course/:id" element={<EnrollmentsList />} />
        <Route path="grades" element={<GradesList />} />
        <Route path="new-course" element={<NewCourse />} />
        {/* más rutas professor */}
      </Route>

      {/* Rutas de alumno */}
      <Route path="/student/*" element={<StudentLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="my-profile" element={<UserProfile />} />
        <Route path="catalog" element={<CoursesList />} />
        <Route path="courses/:id" element={<CourseDetail />} />
        <Route path="my-enrollments" element={<EnrollmentsList />} />
        <Route path="my-grades" element={<EnrollmentsList />} />
        {/* más rutas alumno */}
      </Route>

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRoutes;
