import { NavbarContainer, UserInfo, LogoutButton } from "../../styles";

const StudentNavbar = ({ studentName, onLogout }) => {
  return (
    <NavbarContainer>
      <div>Hola, {studentName}!</div>
      <UserInfo>
        <span>Estudiante</span>
        <LogoutButton onClick={onLogout}>Cerrar sesión</LogoutButton>
      </UserInfo>
    </NavbarContainer>
  );
};

export default StudentNavbar;