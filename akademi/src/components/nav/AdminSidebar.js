import { useNavigate } from "react-router-dom";
import {
    AdminSidebarContainer,
    SidebarItem,
    AdminSidebarLink,
    GenericButton
} from "../../styles";

const AdminSidebar = () => {
    const navigate = useNavigate();
    return (
        <AdminSidebarContainer>
            <SidebarItem>
                <AdminSidebarLink to="/admin/dashboard">🏠 Home</AdminSidebarLink>
            </SidebarItem>
            <SidebarItem>
                <AdminSidebarLink to="/admin/my-profile">Mi perfil</AdminSidebarLink>
            </SidebarItem>
            <SidebarItem>
                <AdminSidebarLink to="/admin/users">Usuarios</AdminSidebarLink>
            </SidebarItem>
            <SidebarItem>
                <AdminSidebarLink to="/admin/courses">Cursos</AdminSidebarLink>
            </SidebarItem>
            <SidebarItem>
                <GenericButton onClick={() => navigate('/admin/new-user')}>
                    Crear nuevo usuario
                </GenericButton>
            </SidebarItem>
        </AdminSidebarContainer>
    );
};

export default AdminSidebar;
