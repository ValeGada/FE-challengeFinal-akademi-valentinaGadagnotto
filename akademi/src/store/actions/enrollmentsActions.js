import axiosInstance from "../../api/axios";
import { 
    GET_ENROLLMENTS_REQUEST,
    GET_ENROLLMENTS_SUCCESS,
    GET_ENROLLMENTS_FAILURE,
    GET_COURSE_ENROLLMENTS_REQUEST,
    GET_COURSE_ENROLLMENTS_SUCCESS,
    GET_COURSE_ENROLLMENTS_FAILURE,
    ENROLL_REQUEST,
    ENROLL_SUCCESS,
    ENROLL_FAILURE,
    CANCEL_ENROLLMENT_REQUEST,
    CANCEL_ENROLLMENT_SUCCESS,
    CANCEL_ENROLLMENT_FAILURE,
    SET_ENROLLMENT_QUERIES,
    CLEAR_SELECTED
} from "../types";
import { setMessage } from "./messagesAction";

export const setEnrollmentQueries = (queryParams) => ({
    type: SET_ENROLLMENT_QUERIES,
    payload: queryParams
});

export const getEnrollments = (sid, queryParams) => async dispatch => { 
    dispatch ({ type: GET_ENROLLMENTS_REQUEST});
    try {
        const response = await axiosInstance.get(`/enrollments/student/${sid}`, { params: queryParams }); 
        dispatch({
            type: GET_ENROLLMENTS_SUCCESS,
            payload: {
                enrollments: response.data.enrollments,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage
            }
        });
    } catch (error) {
        dispatch({ type: GET_ENROLLMENTS_FAILURE, payload: error.message });
        dispatch(setMessage(error.response?.data?.message || 'Error al obtener las suscripciones.'));
    }
};

export const getCourseEnrollments = (id, queryParams) => async dispatch => {
    dispatch({ type: CLEAR_SELECTED });
    dispatch ({ type: GET_COURSE_ENROLLMENTS_REQUEST});
    try {
        const response = await axiosInstance.get(`/enrollments/course/${id}`, { params: queryParams });    

        dispatch({
            type: GET_COURSE_ENROLLMENTS_SUCCESS,
            payload: {
                courses: response.data.courses,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage
            }
        });
    } catch (error) {
        dispatch({ type: GET_COURSE_ENROLLMENTS_FAILURE, payload: error.message });
        dispatch(setMessage(error.response?.data?.message || 'Error al obtener las suscripciones de este curso.'));
    }
};

export const enroll = (id) => async dispatch => {
    dispatch({ type: ENROLL_REQUEST });
    try {
        const response = await axiosInstance.post('/enrollments', { id });

        dispatch ({ type: ENROLL_SUCCESS, payload: response.data.enrollment });
        dispatch(setMessage('Suscripción exitosa.'));
    } catch (error) {
        dispatch({ type: ENROLL_FAILURE, payload: error.message })
        dispatch(setMessage(error.response?.data?.message || 'No se pudo realizar la suscripción al curso.'));
    }
};

export const cancelEnrollment = id => async dispatch => { 
    dispatch({ type: CANCEL_ENROLLMENT_REQUEST });
    try {
        await axiosInstance.delete(`/enrollments/${id}`);

        dispatch ({ type: CANCEL_ENROLLMENT_SUCCESS, payload: id });
        dispatch(setMessage('Suscripción cancelada correctamente'));
    } catch (error) {
        dispatch({ type: CANCEL_ENROLLMENT_FAILURE, payload: error.message });
        dispatch(setMessage(error.response?.data?.message || 'No se pudo cancelar la suscripción.'));
    }
};