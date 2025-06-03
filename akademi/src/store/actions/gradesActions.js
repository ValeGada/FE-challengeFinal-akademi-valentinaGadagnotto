import axiosInstance from "../../api/axios";
import { 
    GET_STUDENT_GRADES_REQUEST,
    GET_STUDENT_GRADES_SUCCESS,
    GET_STUDENT_GRADES_FAILURE,
    POST_GRADE_REQUEST,
    POST_GRADE_SUCCESS,
    POST_GRADE_FAILURE,
    EDIT_GRADE_REQUEST,
    EDIT_GRADE_SUCCESS,
    EDIT_GRADE_FAILURE,
    SET_GRADE_QUERIES
} from "../types";
import { setMessage } from "./messagesAction";

export const setGradeQueries = (queryParams) => ({
    type: SET_GRADE_QUERIES,
    payload: queryParams
});

export const getStudentGrades = (id, queryParams) => async dispatch => { 
    dispatch ({ type: GET_STUDENT_GRADES_REQUEST});
    try {
        const response = await axiosInstance.get(`/grades/student/${id}`, { params: queryParams }); 
        dispatch({
            type: GET_STUDENT_GRADES_SUCCESS,
            payload: {
                grades: response.data.grades,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage
            }
        });
    } catch (error) {
        dispatch({ type: GET_STUDENT_GRADES_FAILURE, payload: error.message });
        dispatch(setMessage(error.response?.data?.message || 'Error al obtener las notas.'));
    }
};

export const postGrade = values => async dispatch => {
    dispatch({ type: POST_GRADE_REQUEST });
    try {
        const response = await axiosInstance.post('/grades', values);

        dispatch ({ type: POST_GRADE_SUCCESS, payload: response.data.gradeObj });
        dispatch(setMessage('Nota asignada correctamente.'));
    } catch (error) {
        dispatch({ type: POST_GRADE_FAILURE, payload: error.message })
        dispatch(setMessage(error.response?.data?.message || 'No se pudo asignar nota.'));
    }
};

export const editGrade = (id, values) => async dispatch => {
    dispatch({ type: EDIT_GRADE_REQUEST })
    try {
        const response = await axiosInstance.put(`/grades/${id}`, values);

        dispatch ({ type: EDIT_GRADE_SUCCESS, payload: response.data.gradeObj });
        dispatch(setMessage('Nota editada correctamente.'));
    } catch (error) {
        dispatch({ type: EDIT_GRADE_FAILURE, payload: error.message });
        dispatch(setMessage(error.response?.data?.message || 'No se pudo editar la nota.'));
    }
};