import { NavbarContainer, UserInfo, GenericButton, SidebarLink } from "../../styles";

const AdminNavbar = ({ adminName, onLogout }) => {
    return (
        <NavbarContainer>
        <div>
            Hola,{' '} 
            <SidebarLink to="/admin/my-profile">
                {adminName}
            </SidebarLink>
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