import { NavbarContainer, UserInfo, GenericButton, AdminSidebarLink } from "../../styles";

const AdminNavbar = ({ adminName, onLogout }) => {
    return (
        <NavbarContainer>
        <div>
            Hola,{' '} 
            <AdminSidebarLink to="/admin/my-profile">
                {adminName}
            </AdminSidebarLink>
            !
        </div>
        <UserInfo>
            <span>Administrador</span>
            <GenericButton onClick={onLogout}>Cerrar sesión</GenericButton>
        </UserInfo>
        </NavbarContainer>
    );
};

export default AdminNavbar;