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
import { setMessage } from "./store/actions/messagesAction";

const App = ({ message }) => {
  const dispatch = useDispatch();
  const [authInitialized, setAuthInitialized] = useState(false);
  useTokenExpirationChecker();

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
        } catch (error) {
          dispatch(setMessage('Token inválido o expirado'))
          localStorage.clear();
        }
      }

      setAuthInitialized(true);
  }, [dispatch]);

  if (!authInitialized) {
    return <Spinner />;
  }
  return (
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
  );
}

const mapStateToProps = state => {
  return {
    message: state.message
  }
}

export default connect(mapStateToProps)(App);