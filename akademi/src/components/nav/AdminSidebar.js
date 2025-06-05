import { useNavigate } from "react-router-dom";
import {
    SidebarContainer,
    SidebarItem,
    SidebarLink,
    GenericButton
} from "../../styles";

const AdminSidebar = () => {
    const navigate = useNavigate();
    return (
        <SidebarContainer>
            <SidebarItem>
                <SidebarLink to="/admin/dashboard">🏠 Home</SidebarLink>
            </SidebarItem>
            <SidebarItem>
                <SidebarLink to="/admin/my-profile">Mi perfil</SidebarLink>
            </SidebarItem>
            <SidebarItem>
                <SidebarLink to="/admin/users">Usuarios</SidebarLink>
            </SidebarItem>
            <SidebarItem>
                <SidebarLink to="/admin/courses">Cursos</SidebarLink>
            </SidebarItem>
            <SidebarItem>
                <GenericButton onClick={() => navigate('/admin/new-user')}>
                    Crear nuevo usuario
                </GenericButton>
            </SidebarItem>
        </SidebarContainer>
    );
};

export default AdminSidebar;
