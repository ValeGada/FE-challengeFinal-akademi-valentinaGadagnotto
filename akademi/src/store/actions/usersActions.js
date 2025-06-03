import axiosInstance from "../../api/axios";
import { 
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    SET_USER_QUERIES,
    CLEAR_SELECTED
} from "../types";
import { setMessage } from "./messagesAction";

export const setUserQueries = (queryParams) => ({
    type: SET_USER_QUERIES,
    payload: queryParams
});

export const getUsers = (queryParams) => async dispatch => { 
    dispatch ({ type: GET_USERS_REQUEST});
    try {
        const response = await axiosInstance.get('/users', { params: queryParams }); 
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: {
                users: response.data.users,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage
            }
        });
    } catch (error) {
        dispatch({ type: GET_USERS_FAILURE, payload: error.message });
        dispatch(setMessage(error.response?.data?.message || 'Error al obtener los usuarios.'));
    }
};

export const getUser = id => async dispatch => {
    dispatch({ type: CLEAR_SELECTED });
    dispatch({ type: GET_USER_REQUEST });
    try { 
        const response = await axiosInstance.get(`/users/${id}`);

        dispatch ({ type: GET_USER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error.message });
        dispatch(setMessage(error.response?.data?.message || 'Error al obtener usuario.'));
    }
};

export const createUser = values => async dispatch => {
    dispatch({ type: CREATE_USER_REQUEST });
    try {
        const response = await axiosInstance.post('/users', values);

        dispatch ({ type: CREATE_USER_SUCCESS, payload: response.data });
        dispatch(setMessage('Nuevo usuario creado correctamente.'));
    } catch (error) {
        dispatch({ type: CREATE_USER_FAILURE, payload: error.message })
        dispatch(setMessage(error.response?.data?.message || 'No se pudo crear el usuario.'));
    }
};

export const editUser = (id, values) => async dispatch => {
    dispatch({ type: EDIT_USER_REQUEST })
    try {
        const response = await axiosInstance.put(`/users/${id}`, values);

        dispatch ({ type: EDIT_USER_SUCCESS, payload: response.data.userObj });
        dispatch(setMessage('Usuario editado correctamente.'));
    } catch (error) {
        dispatch({ type: EDIT_USER_FAILURE, payload: error.message });
        dispatch(setMessage(error.response?.data?.message || 'No se pudo editar el usuario.'));
    }
};

export const deleteUser = id => async dispatch => { 
    dispatch({ type: DELETE_USER_REQUEST });
    try {
        await axiosInstance.delete(`/users/${id}`);

        dispatch ({ type: DELETE_USER_SUCCESS, payload: id });
        dispatch(setMessage('Usuario eliminado correctamente.'));
    } catch (error) {
        dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
        dispatch(setMessage(error.response?.data?.message || 'No se pudo eliminar el usuario.'));
    }
};