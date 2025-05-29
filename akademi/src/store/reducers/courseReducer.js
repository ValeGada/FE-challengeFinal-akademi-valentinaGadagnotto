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
    SET_COURSE_QUERIES
} from "../types";

const initialState = {
    all: [],
    selected: null,
    pagination: {
        currentPage: 1,
        totalPages: 1
    },
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
        case SET_COURSE_QUERIES:
            return {
                ...state,
                queryParams: { ...state.queryParams, ...action.payload },
            };

        case GET_COURSES_REQUEST:
            return { ...state, isLoading: true, error: null };
        
        case GET_COURSES_SUCCESS:
            return { 
                ...state, 
                all: action.payload.courses, 
                pagination: {
                ...state.pagination,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages
                },
                isLoading: false, 
                error: null 
            };

        case GET_COURSES_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case GET_COURSES_BY_PROF_ID_REQUEST:
            return { ...state, isLoading: true, error: null };

        case GET_COURSES_BY_PROF_ID_SUCCESS:
            return { 
                ...state, 
                all: action.payload.courses, 
                pagination: {
                ...state.pagination,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages
                },
                isLoading: false, 
                error: null 
            };

        case GET_COURSES_BY_PROF_ID_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case GET_COURSE_REQUEST:
            return { ...state, isLoading: true, error: null };

        case GET_COURSE_SUCCESS:
            return { ...state, isLoading: false, selected: action.payload };

        case GET_COURSE_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case CREATE_COURSE_REQUEST:
            return { ...state, isLoading: true, error: null };

        case CREATE_COURSE_SUCCESS:
            return { ...state, isLoading: false, all: [...state.all, action.payload] };
        
        case CREATE_COURSE_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case EDIT_COURSE_REQUEST:
            return { ...state, isLoading: true, error: null };
        
        case EDIT_COURSE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                all: state.all.map((c) => c.id === action.payload.id ? action.payload : c),
                selected: state.selected?.id === action.payload.id ? action.payload : state.selected
            };

        case EDIT_COURSE_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case DELETE_COURSE_REQUEST:
            return { ...state, isLoading: true, error: null };

        case DELETE_COURSE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                all: state.all.filter((c) => c.id !== action.payload),
                selected: state.selected?.id === action.payload.id ? null : state.selected
            };

        case DELETE_COURSE_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        default:
            return state;
    }
};
