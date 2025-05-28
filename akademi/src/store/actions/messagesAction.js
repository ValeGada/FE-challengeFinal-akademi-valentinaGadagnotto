import { SET_MESSAGE } from "../types";

export const setMessage = message => dispatch => {
    dispatch({ type: SET_MESSAGE, payload: message });

    setTimeout(() => {
        dispatch({ type: SET_MESSAGE, payload: null });
    }, 1800);
};