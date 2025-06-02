import axiosInstance from "../../api/axios";
import { 
    GET_COURSES_REQUEST,
    GET_COURSES_SUCCESS,
    GET_COURSES_FAILURE,
    GET_COURSES_BY_PROF_ID_REQUEST,
    GET_COURSES_BY_PROF_ID_SUCCESS,
    GET_COURSES_BY_PROF_ID_FAILURE,
    GET_COURSE_REQUEST,
    GET_COURSE_SUCCESS,
    GET_COURSE_FAILURE,
    CREATE_COURSE_REQUEST,
    CREATE_COURSE_SUCCESS,
    CREATE_COURSE_FAILURE,
    EDIT_COURSE_REQUEST,
    EDIT_COURSE_SUCCESS,
    EDIT_COURSE_FAILURE,
    DELETE_COURSE_REQUEST,
    DELETE_COURSE_SUCCESS,
    DELETE_COURSE_FAILURE,
    SET_COURSE_QUERIES,
    CLEAR_SELECTED
} from "../types";
import { setMessage } from "./messagesAction";

export const setCourseQueries = (queryParams) => ({
    type: SET_COURSE_QUERIES,
    payload: queryParams
});

export const getCourses = (queryParams) => async dispatch => { 
    dispatch ({ type: GET_COURSES_REQUEST});
    try {
        const response = await axiosInstance.get('/courses', { params: queryParams }); 
        dispatch({
            type: GET_COURSES_SUCCESS,
            payload: {
                courses: response.data.courses,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage
            }
        });
    } catch (error) {
        dispatch({ type: GET_COURSES_FAILURE, payload: error.message });
        dispatch(setMessage(error.response?.data?.message || 'Error al obtener los cursos.'));
    }
};

export const getCoursesByProfId = (id, queryParams) => async dispatch => { 
    dispatch ({ type: GET_COURSES_BY_PROF_ID_REQUEST});
    try {
        const response = await axiosInstance.get(`/courses/professor/${id}`, { params: queryParams });    

        dispatch({
            type: GET_COURSES_BY_PROF_ID_SUCCESS,
            payload: {
                courses: response.data.courses,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage
            }
        });
    } catch (error) {
        dispatch({ type: GET_COURSES_BY_PROF_ID_FAILURE, payload: error.message });
        dispatch(setMessage(error.response?.data?.message || 'Error al obtener los cursos.'));
    }
};

export const getCourse = id => async dispatch => {
    dispatch({ type: CLEAR_SELECTED });
    dispatch({ type: GET_COURSE_REQUEST });
    try { 
        const response = await axiosInstance.get(`/courses/${id}`);

        dispatch ({ type: GET_COURSE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_COURSE_FAILURE, payload: error.message });
        dispatch(setMessage(error.response?.data?.message || 'Error al obtener curso.'));
    }
};

export const createCourse = values => async dispatch => {
    dispatch({ type: CREATE_COURSE_REQUEST });
    try {
        const response = await axiosInstance.post('/courses', values);

        dispatch ({ type: CREATE_COURSE_SUCCESS, payload: response.data.courseObj });
        dispatch(setMessage('Nuevo curso creado correctamente.'));
    } catch (error) {
        dispatch({ type: CREATE_COURSE_FAILURE, payload: error.message })
        dispatch(setMessage(error.response?.data?.message || 'No se pudo crear el curso.'));
    }
};

export const editCourse = (id, values) => async dispatch => {
    dispatch({ type: EDIT_COURSE_REQUEST })
    try {
        const response = await axiosInstance.put(`/courses/${id}`, values);

        dispatch ({ type: EDIT_COURSE_SUCCESS, payload: response.data.courseObj });
        dispatch(setMessage('Curso editado correctamente.'));
    } catch (error) {
        dispatch({ type: EDIT_COURSE_FAILURE, payload: error.message });
        dispatch(setMessage(error.response?.data?.message || 'No se pudo editar el curso.'));
    }
};

export const deleteCourse = id => async dispatch => { 
    dispatch({ type: DELETE_COURSE_REQUEST });
    try {
        await axiosInstance.delete(`/courses/${id}`);

        dispatch ({ type: DELETE_COURSE_SUCCESS, payload: id });
        dispatch(setMessage('Curso eliminado correctamente.'));
    } catch (error) {
        dispatch({ type: DELETE_COURSE_FAILURE, payload: error.message });
        dispatch(setMessage(error.response?.data?.message || 'No se pudo eliminar el curso.'));
    }
};