import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCourses, getCoursesByProfId } from "../../store/actions/coursesActions";
import { CourseListTitle } from "../../styles";
import CourseCardsView from "./CourseCardsView";
import CourseTableView from "./CourseTableView";

const CoursesList = ({ user, courses, getCourses,getCoursesByProfId }) => {
    useEffect(() => {
        if (user.role === 'professor') {
            getCoursesByProfId(user.id);
        } else {
            getCourses();
        }
    }, [user.role, user.id, getCourses, getCoursesByProfId])

    return (
        <div>
            <CourseListTitle>
                {user.role === 'student'
                    ? 'Cursos disponibles'
                    : user.role === 'professor'
                    ? 'Mis cursos'
                    : 'Todos los cursos'}
            </CourseListTitle>
            {user.role === 'student'
            ? <CourseCardsView courses={courses} />
            : <CourseTableView courses={courses} />
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        courses: state.courses.all
    }
};

export default connect(mapStateToProps, { getCourses, getCoursesByProfId })(CoursesList);