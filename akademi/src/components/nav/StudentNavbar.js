import { NavbarContainer, UserInfo, GenericButton, StudentSidebarLink } from "../../styles";

const StudentNavbar = ({ studentName, onLogout }) => {
  return (
    <NavbarContainer>
      <div>
        Hola,{' '} 
        <StudentSidebarLink to="/student/my-profile">
          {studentName}
        </StudentSidebarLink>
        !
      </div>
      <UserInfo>
        <span>Estudiante</span>
        <GenericButton onClick={onLogout}>Cerrar sesión</GenericButton>
      </UserInfo>
    </NavbarContainer>
  );
};

export default StudentNavbar;