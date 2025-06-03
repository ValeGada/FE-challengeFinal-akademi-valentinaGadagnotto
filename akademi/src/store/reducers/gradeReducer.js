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
        sortBy: 'name',
        sortOrder: 'asc',
        search: '',
        name: ''
    },
    isLoading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_GRADE_QUERIES:
            return {
                ...state,
                queryParams: { ...state.queryParams, ...action.payload },
            };

        case GET_STUDENT_GRADES_REQUEST:
            return { ...state, isLoading: true, error: null };
        
        case GET_STUDENT_GRADES_SUCCESS:
            return { 
                ...state, 
                all: action.payload.grades, 
                pagination: {
                    ...state.pagination,
                    currentPage: action.payload.currentPage,
                    totalPages: action.payload.totalPages
                },
                isLoading: false, 
                error: null 
            };

        case GET_STUDENT_GRADES_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case POST_GRADE_REQUEST:
            return { ...state, isLoading: true, error: null };

        case POST_GRADE_SUCCESS:
            return { ...state, isLoading: false, all: [...state.all, action.payload] };
        
        case POST_GRADE_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case EDIT_GRADE_REQUEST:
            return { ...state, isLoading: true, error: null };
        
        case EDIT_GRADE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                all: state.all.map((g) => g.id === action.payload.id ? action.payload : g),
                selected: state.selected?.id === action.payload.id ? action.payload : state.selected
            };

        case EDIT_GRADE_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        default:
            return state;
    }
};