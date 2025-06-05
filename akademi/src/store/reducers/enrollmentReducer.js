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
    SET_ENROLLMENT_QUERIES
} from "../types";

const initialState = {
    all: [],
    selected: null,
    pagination: {
        currentPage: 1,
        totalPages: 1
    },
    byCourseId: {},
    queryParams: {
        page: 1,
        limit: 10,
        sortBy: 'title',
        sortOrder: 'asc',
        search: '',
        title: ''
    },
    isLoading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ENROLLMENT_QUERIES:
            return {
                ...state,
                queryParams: { ...state.queryParams, ...action.payload },
            };

        case GET_ENROLLMENTS_REQUEST:
            return { ...state, isLoading: true, error: null };
        
        case GET_ENROLLMENTS_SUCCESS:
            return { 
                ...state, 
                all: action.payload.enrollments, 
                pagination: {
                    ...state.pagination,
                    currentPage: action.payload.currentPage,
                    totalPages: action.payload.totalPages
                },
                isLoading: false, 
                error: null 
            };

        case GET_ENROLLMENTS_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case GET_COURSE_ENROLLMENTS_REQUEST:
            return { ...state, isLoading: true, error: null };

        case GET_COURSE_ENROLLMENTS_SUCCESS:
            return { 
                ...state, 
                byCourseId: {
                    ...state.byCourseId,
                    [action.payload.courseId]: action.payload.enrollments
                }, 
                pagination: {
                ...state.pagination,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages
                },
                isLoading: false, 
                error: null 
            };

        case GET_COURSE_ENROLLMENTS_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case ENROLL_REQUEST:
            return { ...state, isLoading: true, error: null };

        case ENROLL_SUCCESS:
            return { ...state, isLoading: false, all: [...state.all, action.payload] };
        
        case ENROLL_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case CANCEL_ENROLLMENT_REQUEST:
            return { ...state, isLoading: true, error: null };

        case CANCEL_ENROLLMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                all: state.all.filter((c) => c.id !== action.payload),
                selected: state.selected?.id === action.payload.id ? null : state.selected
            };

        case CANCEL_ENROLLMENT_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        default:
            return state;
    }
};
