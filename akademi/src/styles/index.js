import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';
import { NavLink } from "react-router-dom";
import { colors } from "./colors";

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
    background-color: ${({ theme }) => theme.mainContent};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
`;

export const AuthCard = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    gap: 1.5rem;
    max-width: 450px;
    box-shadow: ${softShadow};
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
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
export const NavbarContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    width: 100%;
    z-index: 1000;
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.navbarBg};
    border-bottom: 1px solid ${props => props.theme.borderColor || colors.lightMint};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    box-shadow: 0 1px 4px ${softShadow};
`;

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 500;
    color: ${props => props.theme.text};
`;

export const GenericButton = styled.button`
    background-color: ${props => props.theme.buttonBg};
    color: white;
    border: none;
    padding: 0.4rem 0.9rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s ease;
    min-width: max-content;
    
    &:hover {
        background-color: ${props => props.theme.buttonHover};
    }
`;

export const GenericButtonsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    margin-top: 5px;
    justify-content: center;
`;
    
// Sidebars
export const SidebarContainer = styled.nav`
    margin-top: 60px;
    width: 240px;
    min-height: calc(100vh - 60px);
    background-color: ${props => props.theme.sidebarBg};
    border-right: 1px solid ${props => props.theme.borderColor || colors.lightMint};
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
    box-shadow: ${softShadow};
`;

export const SidebarItem = styled.div`
    padding: 0.75rem 1.5rem;
`;

export const SidebarLink = styled(NavLink)`
    text-decoration: none;
    color: ${props => props.theme.text};
    font-weight: 500;
    font-size: 1rem;
    transition: color 0.2s ease;

    &.active {
        color: ${props => props.theme.primary};
    }

    &:hover {
        color: ${props => props.theme.hover};
    }
`;


// Dashboards
export const Title = styled.h1`
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.text};
`;

export const WelcomeText = styled.p`
    font-size: 1.1rem;
    line-height: 1.6;
    color: ${props => props.theme.textSecondary || "#666"};
`;

export const DashboardContainer = styled.div`
    padding: 2rem;
    color: ${props => props.theme.text};
`;

export const GenericTitle = styled.h2`
    margin-top: 60px;
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: ${props => props.theme.text};
`;


// List components
export const GridContainer = styled.div`
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

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: ${({ theme }) => theme.background};
`;

export const Th = styled.th`
    padding: 0.75rem;
    text-align: left;
    border-bottom: 2px solid ${colors.tableTh};
    background-color: ${({ theme }) => theme.navbar};
    color: ${({ theme }) => theme.text};
`;

export const Td = styled.td`
    padding: 0.75rem;
    border-bottom: 1px solid ${colors.tableTd};
    color: ${({ theme }) => theme.text};
`;

export const Actions = styled.td`
    display: flex;
    gap: 0.5rem;
`;

// Courses List Cards view
export const CourseCardContainer = styled.div`
    background-color: ${colors.cardBg};
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border: 1px solid ${colors.lightBg};
    max-height: 260px;
    max-width: 280px;
    /* margin: 0 auto; */

    &:hover {
        transform: translateY(-3px);
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
    color: ${colors.professor.primary};
    margin-bottom: 1rem;
    display: block;
`;

export const CardButtonsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: auto;
`;

export const CourseCardButton = styled.button`
    background-color: ${({ theme }) => theme.buttonBg};
    padding: 0.35rem 0.75rem;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.85rem;
    font-weight: bold;
    margin-right: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.buttonHover};
    }
`;

// Enrollment card (no animation)
export const EnrollmentCardContainer = styled.div`
    background-color: ${colors.cardBg};
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border: 1px solid ${colors.lightBg};
    max-height: 260px;
    max-width: 280px;
    /* margin: 0 auto; */

    &:hover {
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
`;

export const FiltersContainer = styled.div`
    margin-bottom: 2rem;
`;

export const SearchInput = styled.input`
    width: 30%;
    padding: 0.6rem 1rem;
    border: none;
    border-bottom: 2px solid ${({ theme }) => theme.primary};
    background-color: transparent;
    font-size: 1rem;
    outline: none;
    color: ${({ theme }) => theme.text};
    transition: border-color 0.3s ease;

    &:focus {
        border-color: ${({ theme }) => theme.buttonHover};
    }
`;

export const SortContainer = styled.div`
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.textSecondary};
    gap: 1rem;
    margin-top: 1rem;
`;

export const SortButton = styled.button`
    background: none;
    border: none;
    color: ${({ theme }) => theme.text};
    font-weight: bold;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
        color: ${({ theme }) => theme.primary};
    }
`;

export const ClearFiltersButton = styled.button`
    background-color: ${colors.error};
    color: white;
    border: none;
    padding: 0.4rem 0.9rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    margin-left: auto;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #c62828;
    }
`;

export const PaginationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    margin-top: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
    text-align: center;
`;

export const PerPageSelector = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.textSecondary || "#666"};
`;

export const PerPageNumber = styled.span`
    cursor: pointer;
    color: ${({ theme }) => theme.textSecondary || "#666"};
    transition: color 0.2s ease;

    &:hover {
        color: ${({ theme }) => theme.primary || "#666"};
    }
`;

export const PageButton = styled.button`
    background-color: ${({ theme, isActive }) => isActive ? theme.primary : "transparent"};
    color: ${({ theme, isActive }) => (isActive ? "white" : theme.text)};
    border: 1px solid ${({ theme }) => theme.primary};
    padding: 0.4rem 0.7rem;
    margin-right: 0.4rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${({ theme }) => theme.primary};
        color: white;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const ControlsGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

// Forms
export const AuthTitle = styled.h2`
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.text};
    text-align: center;
    font-weight: bold;
`;

export const FormGroup = styled.div`
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 0.5rem;
`;

export const Label = styled.label`
    font-weight: bold;
    color: ${({ theme }) => theme.text};
`;

export const Input = styled.input`
    width: 50%;
    padding: 0.5rem;
    margin-top: 0.25rem;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.primary};
    background-color: transparent;
    color: ${({ theme }) => theme.text};
    outline: none;

    &:read-only {
        border: none;
        background-color: transparent;
        color: ${({ theme }) => theme.text};
        pointer-events: none;
    }
`;

export const Textarea = styled.textarea`
    width: 50%;
    padding: 0.5rem;
    margin-top: 0.25rem;
    font-family: Helvetica, sans-serif;
    border: none;
    resize: none;
    border-bottom: 1px solid ${({ theme }) => theme.primary};
    background-color: transparent;
    color: ${({ theme }) => theme.text};
    outline: none;

    &:read-only {
        border: none;
        background-color: transparent;
        color: ${({ theme }) => theme.text};
        pointer-events: none;
    }
`;

export const Select = styled.select`
    width: 50%;
    padding: 0.5rem;
    margin-top: 0.25rem;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.primary};
    background-color: transparent;
    color: ${({ theme }) => theme.text};
    outline: none;
    font-family: inherit;
    font-size: 1rem;

    &:disabled,
    &[readonly] {
        border: none;
        background-color: transparent;
        color: ${({ theme }) => theme.text};
        pointer-events: none;
    }
`;

export const FormLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
    padding: 0.4rem;
`;

export const AuthInput = styled(Input)`
    width: 100%;
`;

export const AuthButton = styled(GenericButton)`
    display: flex;
    justify-self: center;
    margin-top: 1rem;
    width: auto;
    font-weight: bold;
    text-align: center;
    background-color: ${props => props.theme.buttonBg};

    &:hover {
        background-color: ${props => props.theme.buttonHover};
    }
`;
