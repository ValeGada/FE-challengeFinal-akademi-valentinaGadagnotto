import React from "react";
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { LOGIN_SUCCESS } from "./store/types";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Spinner from "./UI/Spinner";
import Modal from "./UI/Modal";
import useTokenExpirationChecker from "./utils/hooks/useTokenExpirationChecker";
import { 
  GlobalStyles,
  AppContainer,
  Success 
} from "./styles";
import { ThemeProvider } from "styled-components";
import { getTheme } from "./styles/theme";
import { setMessage } from "./store/actions/messagesAction";

const App = ({ message, authUser }) => {
  const dispatch = useDispatch();
  const [authInitialized, setAuthInitialized] = useState(false);
  const [theme, setTheme] = useState(getTheme("student"));
  useTokenExpirationChecker();

  useEffect(() => {
    if (authUser && authUser.role) {
      const selectedTheme = getTheme(authUser.role);
      setTheme(selectedTheme);
    } else {
      setTheme(getTheme("student"));
    }
  }, [authUser]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            token,
            user: {
              id: decoded.id,
              name: decoded.name,
              role: decoded.role
            }
          },
        });

        const selectedTheme = getTheme(decoded.role);
        console.log("Rol decodificado:", decoded.role); // Al loguearme no veo nada, al recargar veo el rol correcto
        console.log("Tema seleccionado:", getTheme(decoded.role)); // Al loguearme, nada. Al recargar veo la paleta correcta
        setTheme(selectedTheme);
      } catch (error) {
        dispatch(setMessage('Token inválido o expirado'))
        localStorage.clear();
        setTheme(getTheme("student"));
      } 
    } else {
      setTheme(getTheme("student")); // Forzar tema student si no hay token
    }
    setAuthInitialized(true);
  }, [dispatch, getTheme]);

  if (!authInitialized) {
    return <Spinner />;
  }

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <AppContainer>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
          <Modal isOpen={Boolean(message)}>
            <Success>{message}</Success>
          </Modal>
        </AppContainer>
      </>
    </ThemeProvider>
  );
}

const mapStateToProps = state => {
  return {
    message: state.message,
    authUser: state.auth.user
  }
}

export default connect(mapStateToProps)(App);