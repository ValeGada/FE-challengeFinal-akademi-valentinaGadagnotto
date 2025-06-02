import axiosInstance from '../../api/axios';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    PASSWORD_RECOVERY,
    PASSWORD_RESET,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from '../types';
import { setMessage } from './messagesAction';

export const login = credentials => async dispatch => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await axiosInstance.post('/auth/login', credentials);

        const { token, expiration, user } = response.data;

        // Guardar sólo token en localStorage
        localStorage.setItem('token', token);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: { token, expiration, user }
        });

        dispatch(setMessage('Inicio de sesión exitoso'));
    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response?.data?.message || 'Error al iniciar sesión',
        });

        dispatch(setMessage('Credenciales inválidas'));
    }
};

export const logout = (message = 'Sesión cerrada') => dispatch => {
    localStorage.clear();

    dispatch({ type: LOGOUT });
    dispatch(setMessage(message));
};

export const passwordRecovery = email => async dispatch => {
    try {
        const response = await axiosInstance.post('/auth/forgot-password', {email});
        dispatch({ type: PASSWORD_RECOVERY, payload: response.data });
        
        dispatch(setMessage('Email de recuperación de contraseña enviado.'));
    } catch (error) {
        dispatch(setMessage('Fallo en el envío de email'));
    }
}

export const passwordReset = ({ recoveryToken, newPassword }) => async dispatch => {
    try {
        const response = await axiosInstance.post('/auth/password-reset', { recoveryToken, newPassword });
        dispatch({ type: PASSWORD_RESET, payload: response.data });

        dispatch(setMessage(response?.data?.message || 'Contraseña restablecida con éxito.'));
    } catch (error) {
        dispatch(setMessage(error.response?.data?.message || 'No se pudo restablecer la contraseña.'));
    }
}

export const register = formData => async dispatch => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const response = await axiosInstance.post('/auth/register', formData);
        dispatch({ type: REGISTER_SUCCESS, payload: response.data });

        dispatch(setMessage('Nuevo usuario registrado.'));
    } catch (error) {
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response?.data?.message || 'Error al registrar usuario.'
        });

        dispatch(setMessage(error.response?.data?.message || 'No se pudo registrar nuevo usuario.'));
    }
}
