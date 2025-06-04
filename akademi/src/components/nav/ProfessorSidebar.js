import { useNavigate } from "react-router-dom";
import {
    ProfessorSidebarContainer,
    SidebarItem,
    ProfessorSidebarLink,
    GenericButton
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
                <ProfessorSidebarLink to="/prof/my-profile">
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
                <GenericButton onClick={() => navigate("/prof/new-course")}>
                    Crear Nuevo Curso
                </GenericButton>
            </SidebarItem>
        </ProfessorSidebarContainer>
    );
};


export default ProfessorSidebar;
