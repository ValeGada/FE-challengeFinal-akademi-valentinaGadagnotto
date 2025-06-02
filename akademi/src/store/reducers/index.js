import { combineReducers } from "redux";
import authReducer from "./authReducer";
import courseReducer from "./courseReducer";
import enrollmentReducer from "./enrollmentReducer";
import gradeReducer from "./gradeReducer";
import messageReducer from "./messageReducer";

export default combineReducers({
    auth: authReducer,
    courses: courseReducer,
    enrollments: enrollmentReducer,
    grades: gradeReducer,
    message: messageReducer,
});
//     users: userReducer,