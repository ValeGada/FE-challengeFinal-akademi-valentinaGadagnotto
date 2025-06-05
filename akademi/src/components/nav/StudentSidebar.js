import {
    SidebarContainer,
    SidebarItem,
    SidebarLink
} from "../../styles";

const StudentSidebar = () => {
  return (
        <SidebarContainer>
            <SidebarItem>
                <SidebarLink to="/student/dashboard">🏠 Home</SidebarLink>
            </SidebarItem>
            <SidebarItem>
                <SidebarLink to="/student/my-profile">Mi perfil</SidebarLink>
            </SidebarItem>
            <SidebarItem>
                <SidebarLink to="/student/catalog">Catálogo</SidebarLink>
            </SidebarItem>
            <SidebarItem>
                <SidebarLink to="/student/my-grades">Mis calificaciones</SidebarLink>
            </SidebarItem>
            <SidebarItem>
                <SidebarLink to="/student/my-enrollments">Mis suscripciones</SidebarLink>
            </SidebarItem>
        </SidebarContainer>
    );
};

export default StudentSidebar;
