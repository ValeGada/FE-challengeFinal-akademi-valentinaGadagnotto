import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';
import { NavLink } from "react-router-dom";

export const colors = {
    lightMint: "#d9f5f1",
    mint: "#a2e7db",
    deepMint: "#2ec25a",
    darkMint: "#2e6854",
    studentHover: "#25a24b",
    success: "#4caf50",
    error: "#f44336",
    info: "#29b6f6",
    adminNavbarBg: "#fceece",
    adminText: "#ffa726",
    lightAdmin: "#ffe8b3",
    adminDashboardBg: "#fff2e1",
    adminDeep: "#fb8c00",
    adminContent: "#32291d",
    adminHover: "#e65100",
    professor: "#009688",
    professorNavbar: "#e0f2ef",
    professorDeep: "#00695c",
    professorHover: "#01503a",
    lightBg: "#e3fcf7",
    cardBg: "#ffffff",
    mainContent: "#f5fefe",
    textPrimary: "#333333",
    textSecondary: "#666666",
    modalBg: "#f1f1f1",
    tableTh: "#dddddd",
    tableTd: "#eeeeee"
};

export const softShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";

export const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html, body, #root {
        margin: 0;
        padding: 0;
        height: 100%;
        background-color: ${colors.lightBg};
        font-family: Helvetica, sans-serif;
        font-weight: 400;
    }
`;


// App
export const AppContainer = styled.div`
    min-height: 100vh;
    background-color: ${colors.lightBg};
    display: flex;
    flex-direction: column;
`;

// Errors
export const Error = styled.p`
    color: ${colors.error};
`;

// Success messages
export const Success = styled.p`
    color: ${colors.success};
`;

// UI
// Spinner
export const SpinnerContainer = styled.div`
    padding-top: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
`;

export const SpinnerCircle = styled.div`
    width: 40px;
    height: 40px;
    border: 4px solid #f1f1f1;
    border-top: 4px solid ${colors.deepMint};
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        to {
        transform: rotate(360deg);
        }
    }
`;

// Modal
export const OverlayDiv = styled.div`
    background: rgba(60, 99, 76, 0.42);
    width: 100vw;
    heigth: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
`;

export const ContentDiv = styled.div`
    min-width: 500px;
    min-height: 50px;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${colors.modalBg};
    padding: 14px 28px;
    border-radius: 3px;
    line-height: 1.4;
    text-align: center;
    position: absolute;
`;

// Layouts
// Auth
export const AuthWrapper = styled.div`
    min-height: 100vh;
    background-color: ${colors.lightBg};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
`;

export const AuthCard = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    min-width: 400px;
    box-shadow: ${softShadow};
`;

// Admin, Student, Professor
export const LayoutContainer = styled.div`
    min-height: 100vh;
    display: flex;
    background-color: ${colors.lightBg};
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const MainContent = styled.main`
    flex: 1;
    padding: 2rem;
    background-color: ${colors.mainContent};
`;

// Navbars
// Student Navbar
export const StudentNavbarContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    width: 100%;
    z-index: 1000;
    color: ${colors.darkMint};
    background-color: white;
    border-bottom: 1px solid ${colors.lightMint};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    box-shadow: 0 1px 4px ${softShadow};
`;

export const StudentUserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 500;
    color: ${colors.darkMint};
`;

export const StudentLogoutButton = styled.button`
    background-color: ${colors.deepMint};
    color: white;
    border: none;
    padding: 0.4rem 0.9rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${colors.studentHover};
    }
`;

// Professor Navbar
export const ProfessorNavbarContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    width: 100%;
    z-index: 1000;
    color: ${colors.professor};
    background-color: ${colors.professorNavbar};
    border-bottom: 1px solid ${colors.mint};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    box-shadow: 0 1px 4px ${softShadow};
`;

export const ProfessorUserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 500;
    color: ${colors.professor};
`;

export const ProfessorLogoutButton = styled.button`
    background-color: ${colors.professorDeep};
    color: white;
    border: none;
    padding: 0.4rem 0.9rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${colors.professorHover};
    }
`;

// Admin Navbar
export const AdminNavbarContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    width: 100%;
    z-index: 1000;
    background-color: ${colors.adminNavbarBg};
    border-bottom: 1px solid ${colors.lightAdmin};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    box-shadow: 0 1px 4px ${softShadow};
`;

export const AdminUserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 500;
    color: ${colors.adminText};
`;

export const AdminLogoutButton = styled.button`
    background-color: ${colors.adminDeep};
    color: white;
    border: none;
    padding: 0.4rem 0.9rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${colors.adminHover};
    }
    `;
    
// Sidebars
export const SidebarItem = styled.div`
    padding: 0.75rem 1.5rem;
`;

// Student sidebar
export const StudentSidebarContainer = styled.nav`
    margin-top: 60px;
    width: 240px;
    min-height: calc(100vh - 60px);
    background-color: white;
    border-right: 1px solid ${colors.lightMint};
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
    box-shadow: ${softShadow};
`;

export const StudentSidebarLink = styled(NavLink)`
    text-decoration: none;
    color: ${colors.darkMint};
    font-weight: 500;
    font-size: 1rem;
    transition: color 0.2s ease;

    &.active {
        color: ${colors.deepMint};
    }

    &:hover {
        color: ${colors.studentHover};
    }
`;

// Professor sidebar
export const ProfessorSidebarContainer = styled.nav`
    margin-top: 60px;
    width: 240px;
    min-height: calc(100vh - 60px);
    background-color: ${colors.professorNavbar};
    border-right: 1px solid ${colors.lightMint};
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
    box-shadow: ${softShadow};
`;

export const ProfessorSidebarLink = styled(NavLink)`
    text-decoration: none;
    color: ${colors.professor};
    font-weight: 500;
    font-size: 1rem;
    transition: color 0.2s ease;

    &.active {
        color: ${colors.professorDeep};
    }

    &:hover {
        color: ${colors.professorHover};
    }
`;

// Admin sidebar
export const AdminSidebarContainer = styled.nav`
    margin-top: 60px;
    width: 240px;
    min-height: calc(100vh - 60px);
    background-color: ${colors.adminNavbarBg};
    border-right: 1px solid ${colors.lightAdmin};
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
    box-shadow: ${softShadow};
`;

export const AdminSidebarLink = styled(NavLink)`
    text-decoration: none;
    color: ${colors.adminText};
    font-weight: 500;
    font-size: 1rem;
    transition: color 0.2s ease;

    &.active {
        color: ${colors.adminDeep};
    }

    &:hover {
        color: ${colors.adminHover};
    }
`;

// Dashboards
export const Title = styled.h1`
    font-size: 1.8rem;
    margin-bottom: 1rem;
`;

export const WelcomeText = styled.p`
    font-size: 1.1rem;
    line-height: 1.6;
`;

// Student & Professor Dashboard
export const DashboardContainer = styled.div`
    padding: 2rem;
    color: ${colors.professorDeep};
`;

// Admin Dashboard
export const AdminDashboardContainer = styled.div`
    padding: 2rem;
    color: ${colors.adminContent};
`;

// Courses list
export const CourseListTitle = styled.h2`
    margin-top: 60px;
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
`;

export const CourseGridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

// Courses List Table view
export const CoursesTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const CoursesTh = styled.th`
    padding: 0.75rem;
    text-align: left;
    border-bottom: 2px solid ${colors.tableTh};
    background-color: white;
`;

export const CoursesTd = styled.td`
    padding: 0.75rem;
    border-bottom: 1px solid ${colors.tableTd};
`;

export const CoursesActions = styled.td`
    display: flex;
    gap: 0.5rem;
`;

// Courses List Cards view
export const CourseCardContainer = styled.div`
    background-color: ${colors.cardBg};
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border: 1px solid ${colors.lightBg};

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
`;

export const CourseCardTitle = styled.h3`
    font-size: 1.2rem;
    font-weight: bold;
    color: ${colors.textPrimary};
    margin-bottom: 0.5rem;
`;

export const CourseCardDescription = styled.p`
    font-size: 0.95rem;
    color: ${colors.textSecondary};
    margin-bottom: 1rem;
    flex-grow: 1;
`;

export const CourseCardCapacity = styled.p`
    font-size: 0.85rem;
    color: ${colors.textSecondary};
    margin-bottom: 1rem;
`;

export const CourseCardProfessor = styled.span`
    font-size: 0.9rem;
    color: ${colors.professor};
    margin-bottom: 1rem;
    display: block;
`;

export const CourseCardButton = styled.button`
    align-self: flex-start;
    padding: 0.5rem 1rem;
    background-color: ${colors.studentHover};
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${colors.deepMint};
    }
`;

// Enrollment card (no animation)
export const EnrollmentCardContainer = styled.div`
    background-color: ${colors.cardBg};
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border: 1px solid ${colors.lightBg};
`;


