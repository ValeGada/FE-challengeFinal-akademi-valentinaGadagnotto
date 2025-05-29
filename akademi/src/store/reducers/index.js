import { combineReducers } from "redux";
import authReducer from "./authReducer";
import courseReducer from "./courseReducer";
import messageReducer from "./messageReducer";

export default combineReducers({
    auth: authReducer,
    courses: courseReducer,
    message: messageReducer
});
//     users: userReducer,
//     enrollments: enrollmentReducer,
//     grades: gradeReducer,