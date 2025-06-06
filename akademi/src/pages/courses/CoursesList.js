import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getCourses, getCoursesByProfId, setCourseQueries } from "../../store/actions/coursesActions";
import { GenericTitle } from "../../styles";
import CourseCardsView from "./CourseCardsView";
import CourseTableView from "./CourseTableView";

const CoursesList = ({ user, courses, getCourses, getCoursesByProfId, queryParams }) => {
    useEffect(() => {
        if (user.role === 'professor') {
            getCoursesByProfId(user.id, queryParams);
        } else if (user.role !== 'professor') {
            getCourses(queryParams);
        }
    }, [user, getCourses, getCoursesByProfId, queryParams]);

    return (
        <div>
            <GenericTitle>
                {user.role === 'student'
                    ? 'Cursos disponibles'
                    : user.role === 'professor'
                    ? 'Mis cursos'
                    : 'Todos los cursos'}
            </GenericTitle>
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
        courses: state.courses.all,
        queryParams: state.courses.queryParams
    }
};

export default connect(mapStateToProps, { getCourses, getCoursesByProfId, setCourseQueries })(CoursesList);