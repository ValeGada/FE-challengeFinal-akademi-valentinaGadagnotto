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
    SET_USER_QUERIES
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
        name: '',
        email: '',
        role: ''
    },
    isLoading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_QUERIES:
            return {
                ...state,
                queryParams: { ...state.queryParams, ...action.payload },
            };

        case GET_USERS_REQUEST:
            return { ...state, isLoading: true, error: null };
        
        case GET_USERS_SUCCESS:
            return { 
                ...state, 
                all: action.payload.users, 
                pagination: {
                    ...state.pagination,
                    currentPage: action.payload.currentPage,
                    totalPages: action.payload.totalPages
                },
                isLoading: false, 
                error: null 
            };

        case GET_USERS_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case GET_USER_REQUEST:
            return { ...state, isLoading: true, error: null };

        case GET_USER_SUCCESS:
            return { ...state, isLoading: false, selected: action.payload };

        case GET_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case CREATE_USER_REQUEST:
            return { ...state, isLoading: true, error: null };

        case CREATE_USER_SUCCESS:
            return { ...state, isLoading: false, all: [...state.all, action.payload] };
        
        case CREATE_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case EDIT_USER_REQUEST:
            return { ...state, isLoading: true, error: null };
        
        case EDIT_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                all: state.all.map((u) => u.id === action.payload.id ? action.payload : u),
                selected: state.selected?.id === action.payload.id ? action.payload : state.selected
            };

        case EDIT_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case DELETE_USER_REQUEST:
            return { ...state, isLoading: true, error: null };

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                all: state.all.filter((u) => u.id !== action.payload),
                selected: state.selected?.id === action.payload.id ? null : state.selected
            };

        case DELETE_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        default:
            return state;
    }
}  
