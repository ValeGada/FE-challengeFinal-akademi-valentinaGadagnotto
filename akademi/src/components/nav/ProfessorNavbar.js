import { NavbarContainer, UserInfo, GenericButton, SidebarLink } from "../../styles";

const ProfessorNavbar = ({ professorName, onLogout }) => {
  return (
    <NavbarContainer>
      <div>
        Hola,{' '} 
        <SidebarLink to="/prof/my-profile">
          {professorName}
        </SidebarLink>
        !
      </div>
      <UserInfo>
        <span>Profesor</span>
        <GenericButton onClick={onLogout}>Cerrar sesión</GenericButton>
      </UserInfo>
    </NavbarContainer>
  );
};

export default ProfessorNavbar;