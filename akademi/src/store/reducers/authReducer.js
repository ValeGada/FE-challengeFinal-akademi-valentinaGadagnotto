import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    PASSWORD_RECOVERY,
    PASSWORD_RESET,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    EDIT_USER_SUCCESS
} from "../types";

const initialState = {
    isLoading: false,
    error: null,
    user: null,
    token: null,
    expiration: null,
    isAuthenticated: false,
    message: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, isLoading: true, error: null };

        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload.user,
                token: action.payload.token,
                expiration: action.payload.expiration,
                isAuthenticated: true,
                error: null
            };

        case LOGIN_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case LOGOUT:
            return initialState;

        case PASSWORD_RECOVERY:
            return { ...state, isLoading: false };

        case PASSWORD_RESET: 
            return { ...initialState, message: action.payload.message };

        case REGISTER_REQUEST:
            return { ...state, isLoading: true };

        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                isAuthenticated: false,
                error: null
            };

        case REGISTER_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case EDIT_USER_SUCCESS:
            return {
                ...state,
                user: { ...action.payload }
            };

        default:
            return state;
    }
};

export default authReducer;