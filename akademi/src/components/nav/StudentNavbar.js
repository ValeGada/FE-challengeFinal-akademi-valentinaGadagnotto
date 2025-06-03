import { StudentNavbarContainer, StudentUserInfo, StudentLogoutButton, StudentSidebarLink } from "../../styles";

const StudentNavbar = ({ studentName, onLogout }) => {
  return (
    <StudentNavbarContainer>
      <div>
        Hola,{' '} 
        <StudentSidebarLink to="/student/my-profile">
          {studentName}
        </StudentSidebarLink>
        !
      </div>
      <StudentUserInfo>
        <span>Estudiante</span>
        <StudentLogoutButton onClick={onLogout}>Cerrar sesión</StudentLogoutButton>
      </StudentUserInfo>
    </StudentNavbarContainer>
  );
};

export default StudentNavbar;