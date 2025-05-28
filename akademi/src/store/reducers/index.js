import { combineReducers } from "redux";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";

export default combineReducers({
    auth: authReducer,
    message: messageReducer
});
//     users: userReducer,
//     courses: courseReducer,
//     enrollments: enrollmentReducer,
//     grades: gradeReducer,