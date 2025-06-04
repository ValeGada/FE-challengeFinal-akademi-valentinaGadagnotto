import { NavbarContainer, UserInfo, GenericButton, ProfessorSidebarLink } from "../../styles";

const ProfessorNavbar = ({ professorName, onLogout }) => {
  return (
    <NavbarContainer>
      <div>
        Hola,{' '} 
        <ProfessorSidebarLink to="/prof/my-profile">
          {professorName}
        </ProfessorSidebarLink>
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