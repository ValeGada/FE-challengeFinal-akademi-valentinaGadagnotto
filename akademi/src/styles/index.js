import { Link } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

export const softShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";

export const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html, body, #root {
        margin: 0;
        padding: 0;
        height: 100%;
        background-color: #e3fcf7;
        font-family: Helvetica, sans-serif;
        font-weight: 400;
    }
`;

// App
export const AppContainer = styled.div`
    min-height: 100vh;
    background-color: #e3fcf7;
    display: flex;
    flex-direction: column;
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
    border-top: 4px solid rgb(46, 194, 90);
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
    min-height: 300px;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #f1f1f1;
    padding: 14px 28px;
    border-radius: 3px;
    line-height: 1.4;
    text-align: center;
    position: absolute;
`;

// Layouts
export const AuthWrapper = styled.div`
    min-height: 100vh;
    background-color: #e3fcf7;
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

export const LayoutContainer = styled.div`
    min-height: 100vh;
    display: flex;
    background-color: #e3fcf7;
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const MainContent = styled.main`
    flex: 1;
    padding: 2rem;
    background-color: #f5fefe;
`;

// Navbar
export const NavbarContainer = styled.header`
    width: 100%;
    height: 60px;
    background-color: #ffffff;
    border-bottom: 1px solid #d9f5f1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
`;

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 500;
    color: #2e6854;
`;

export const LogoutButton = styled.button`
    background-color: #2ec25a;
    color: white;
    border: none;
    padding: 0.4rem 0.9rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #25a24b;
    }
`;

// Dashboards
export const DashboardContainer = styled.div`
  padding: 2rem;
  color: #2e6854;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

export const WelcomeText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
`;





