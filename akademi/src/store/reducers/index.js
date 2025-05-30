import { combineReducers } from "redux";
import authReducer from "./authReducer";
import courseReducer from "./courseReducer";
import enrollmentReducer from "./enrollmentReducer";
import messageReducer from "./messageReducer";

export default combineReducers({
    auth: authReducer,
    courses: courseReducer,
    enrollments: enrollmentReducer,
    message: messageReducer
});
//     users: userReducer,
//     grades: gradeReducer,