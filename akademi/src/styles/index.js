import { Link } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

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
    min-heigth: 300px;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #f1f1f1;
    padding: 14px 28px;
    border-radius: 3px;
    line-heigth: 1.4;
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
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;