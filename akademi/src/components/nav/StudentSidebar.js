import {
    StudentSidebarContainer,
    SidebarItem,
    StudentSidebarLink
} from "../../styles";

const StudentSidebar = () => {
  return (
        <StudentSidebarContainer>
            <SidebarItem>
                <StudentSidebarLink to="/student/profile">Mi perfil</StudentSidebarLink>
            </SidebarItem>
            <SidebarItem>
                <StudentSidebarLink to="/student/catalog">Catálogo</StudentSidebarLink>
            </SidebarItem>
            <SidebarItem>
                <StudentSidebarLink to="/student/my-grades">Mis calificaciones</StudentSidebarLink>
            </SidebarItem>
            <SidebarItem>
                <StudentSidebarLink to="/student/my-enrollments">Mis suscripciones</StudentSidebarLink>
            </SidebarItem>
        </StudentSidebarContainer>
    );
};

export default StudentSidebar;
