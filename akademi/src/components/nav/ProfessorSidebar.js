import { useNavigate } from "react-router-dom";
import {
    SidebarContainer,
    SidebarItem,
    SidebarLink,
    GenericButton
} from "../../styles";

const ProfessorSidebar = () => {
    const navigate = useNavigate();

    return (
        <SidebarContainer>
            <SidebarItem>
                <SidebarLink to="/prof/dashboard">
                    🏠 Home
                </SidebarLink>
            </SidebarItem>
            <SidebarItem>
                <SidebarLink to="/prof/my-profile">
                    Mi perfil
                </SidebarLink>
            </SidebarItem>
            <SidebarItem>
                <SidebarLink to="/prof/grades">
                    Mis calificaciones
                </SidebarLink>
            </SidebarItem>
            <SidebarItem>
                <SidebarLink to="/prof/my-courses">
                    Mis cursos
                </SidebarLink>
            </SidebarItem>
            <SidebarItem>
                <GenericButton onClick={() => navigate("/prof/new-course")}>
                    Crear Nuevo Curso
                </GenericButton>
            </SidebarItem>
        </SidebarContainer>
    );
};


export default ProfessorSidebar;
