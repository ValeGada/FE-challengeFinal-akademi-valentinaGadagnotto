import { ProfessorNavbarContainer, ProfessorUserInfo, ProfessorLogoutButton, ProfessorSidebarLink } from "../../styles";

const ProfessorNavbar = ({ professorName, onLogout }) => {
  return (
    <ProfessorNavbarContainer>
      <div>
        Hola,{' '} 
        <ProfessorSidebarLink to="/prof/my-profile">
          {professorName}
        </ProfessorSidebarLink>
        !
      </div>
      <ProfessorUserInfo>
        <span>Profesor</span>
        <ProfessorLogoutButton onClick={onLogout}>Cerrar sesión</ProfessorLogoutButton>
      </ProfessorUserInfo>
    </ProfessorNavbarContainer>
  );
};

export default ProfessorNavbar;