import ProfessorSidebar from "../components/nav/ProfessorSidebar";
import ProfessorNavbar from "../components/nav/ProfessorNavbar";

const ProfessorLayout = () => {
  return (
    <LayoutContainer>
      <Sidebar>
        {/* Aquí tu menú de navegación para admin */}
      </Sidebar>
      <ContentWrapper>
        <Navbar>
          {/* Aquí el nombre del usuario, logout, etc. */}
        </Navbar>
        <MainContent>
          <Outlet />
        </MainContent>
      </ContentWrapper>
    </LayoutContainer>
  );
};
