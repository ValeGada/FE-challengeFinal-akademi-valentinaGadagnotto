import { useNavigate } from "react-router-dom";
import {
    AdminSidebarContainer,
    SidebarItem,
    AdminSidebarLink,
    AdminLogoutButton
} from "../../styles";

const AdminSidebar = () => {
    const navigate = useNavigate();
    return (
        <AdminSidebarContainer>
            <SidebarItem>
                <AdminSidebarLink to="/admin/profile">Mi perfil</AdminSidebarLink>
            </SidebarItem>
            <SidebarItem>
                <AdminSidebarLink to="/admin/users">Usuarios</AdminSidebarLink>
            </SidebarItem>
            <SidebarItem>
                <AdminSidebarLink to="/admin/courses">Cursos</AdminSidebarLink>
            </SidebarItem>
            <SidebarItem>
                <AdminSidebarLink to="/admin/enrollments">Suscripciones</AdminSidebarLink>
            </SidebarItem>
            <SidebarItem>
                <AdminLogoutButton onClick={() => navigate('/new-user')}>
                    Crear nuevo usuario
                </AdminLogoutButton>
            </SidebarItem>
        </AdminSidebarContainer>
    );
};

export default AdminSidebar;
