import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { LOGIN_SUCCESS } from "./store/types";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Spinner from "./UI/Spinner";
import Modal from "./UI/Modal";
import { 
  GlobalStyles,
  AppContainer 
} from "./styles";

const App = ({ message }) => {
  const dispatch = useDispatch();
  const [authInitialized, setAuthInitialized] = useState(false);
  // useTokenExpirationChecker();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token,
          user: {
            role
          }
        },
      });
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
          <p>{message}</p>
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