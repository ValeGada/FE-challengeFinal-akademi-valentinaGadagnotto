import { ProfessorNavbarContainer, ProfessorUserInfo, ProfessorLogoutButton } from "../../styles";

const ProfessorNavbar = ({ professorName, onLogout }) => {
  return (
    <ProfessorNavbarContainer>
      <div>Hola, {professorName}!</div>
      <ProfessorUserInfo>
        <span>Profesor</span>
        <ProfessorLogoutButton onClick={onLogout}>Cerrar sesión</ProfessorLogoutButton>
      </ProfessorUserInfo>
    </ProfessorNavbarContainer>
  );
};

export default ProfessorNavbar;