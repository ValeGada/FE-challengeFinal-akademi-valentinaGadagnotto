import { NavbarContainer, UserInfo, GenericButton, SidebarLink } from "../../styles";

const StudentNavbar = ({ studentName, onLogout }) => {
  return (
    <NavbarContainer>
      <div>
        Hola,{' '} 
        <SidebarLink to="/student/my-profile">
          {studentName}
        </SidebarLink>
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