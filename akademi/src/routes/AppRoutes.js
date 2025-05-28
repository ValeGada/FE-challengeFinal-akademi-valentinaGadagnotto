import { Routes, Route, Navigate } from "react-router-dom";
// import AdminLayout from "../layouts/AdminLayout";
import StudentLayout from "../layouts/StudentLayout";
// import ProfLayout from "../layouts/ProfLayout";
import AuthLayout from "../layouts/AuthLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
// import AdminDashboard from "../pages/dashboard/AdminDashboard";
// import ProfDashboard from "../pages/dashboard/ProfDashboard";
import StudentDashboard from "../pages/dashboard/StudentDashboard";
// import MyCourses from "../pages/prof/MyCourses";
// import Catalog from "../pages/student/Catalog";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

        {/* Rutas de superadmin */}
        {/* <Route path="/admin/*" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} /> */}
        {/* más rutas admin */}
        {/* </Route> */}

        {/* Rutas de profesor */}
        {/* <Route path="/prof/*" element={<ProfLayout />}>
        <Route path="dashboard" element={<ProfDashboard />} />
        <Route path="courses" element={<MyCourses />} /> */}
        {/* más rutas teacher */}
        {/* </Route> */}

        {/* Rutas de alumno */}
        <Route path="/student/*" element={<StudentLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        {/* <Route path="catalog" element={<Catalog />} /> */}
        {/* más rutas alumno */}
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRoutes;
