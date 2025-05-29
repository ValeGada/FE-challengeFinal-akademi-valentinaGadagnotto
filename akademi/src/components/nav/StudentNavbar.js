import { StudentNavbarContainer, StudentUserInfo, StudentLogoutButton } from "../../styles";

const StudentNavbar = ({ studentName, onLogout }) => {
  return (
    <StudentNavbarContainer>
      <div>Hola, {studentName}!</div>
      <StudentUserInfo>
        <span>Estudiante</span>
        <StudentLogoutButton onClick={onLogout}>Cerrar sesión</StudentLogoutButton>
      </StudentUserInfo>
    </StudentNavbarContainer>
  );
};

export default StudentNavbar;