import { AdminNavbarContainer, AdminUserInfo, AdminLogoutButton } from "../../styles";

const AdminNavbar = ({ adminName, onLogout }) => {
    return (
        <AdminNavbarContainer>
        <div>Hola, {adminName}!</div>
        <AdminUserInfo>
            <span>Administrador</span>
            <AdminLogoutButton onClick={onLogout}>Cerrar sesión</AdminLogoutButton>
        </AdminUserInfo>
        </AdminNavbarContainer>
    );
};

export default AdminNavbar;