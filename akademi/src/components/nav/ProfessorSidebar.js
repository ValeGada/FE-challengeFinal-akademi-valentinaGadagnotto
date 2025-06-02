import { useNavigate } from "react-router-dom";
import {
    ProfessorSidebarContainer,
    SidebarItem,
    ProfessorSidebarLink,
    ProfessorLogoutButton
} from "../../styles";

const ProfessorSidebar = () => {
    const navigate = useNavigate();

    return (
        <ProfessorSidebarContainer>
            <SidebarItem>
                <ProfessorSidebarLink to="/prof/dashboard">
                    🏠 Home
                </ProfessorSidebarLink>
            </SidebarItem>
            <SidebarItem>
                <ProfessorSidebarLink to="/prof/profile">
                    Mi perfil
                </ProfessorSidebarLink>
            </SidebarItem>
            <SidebarItem>
                <ProfessorSidebarLink to="/prof/grades">
                    Mis calificaciones
                </ProfessorSidebarLink>
            </SidebarItem>
            <SidebarItem>
                <ProfessorSidebarLink to="/prof/my-courses">
                    Mis cursos
                </ProfessorSidebarLink>
            </SidebarItem>
            <SidebarItem>
                <ProfessorSidebarLink to="/prof/course-enrollments">
                    Suscripciones por curso
                </ProfessorSidebarLink>
            </SidebarItem>
            <SidebarItem>
                <ProfessorLogoutButton onClick={() => navigate("/prof/new-course")}>
                    Crear Nuevo Curso
                </ProfessorLogoutButton>
            </SidebarItem>
        </ProfessorSidebarContainer>
    );
};


export default ProfessorSidebar;
