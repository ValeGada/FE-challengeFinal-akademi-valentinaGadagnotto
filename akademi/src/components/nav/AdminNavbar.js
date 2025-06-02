import { AdminNavbarContainer, AdminUserInfo, AdminLogoutButton, AdminSidebarLink } from "../../styles";

const AdminNavbar = ({ adminName, onLogout }) => {
    return (
        <AdminNavbarContainer>
        <div>
            Hola,{' '} 
            <AdminSidebarLink to="/admin/profile">
                {adminName}
            </AdminSidebarLink>
            !
        </div>
        <AdminUserInfo>
            <span>Administrador</span>
            <AdminLogoutButton onClick={onLogout}>Cerrar sesión</AdminLogoutButton>
        </AdminUserInfo>
        </AdminNavbarContainer>
    );
};

export default AdminNavbar;