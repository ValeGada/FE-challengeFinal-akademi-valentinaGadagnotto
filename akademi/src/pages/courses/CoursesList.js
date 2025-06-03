import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getCourses, getCoursesByProfId } from "../../store/actions/coursesActions";
import { CourseListTitle } from "../../styles";
import Spinner from "../../UI/Spinner";
import CourseCardsView from "./CourseCardsView";
import CourseTableView from "./CourseTableView";

const CoursesList = ({ user, courses, isLoading, getCourses, getCoursesByProfId }) => {
    useEffect(() => {
        if (user.role === 'professor') {
            getCoursesByProfId(user.id);
        } else if (user.role !== 'professor') {
            getCourses();
        }
    }, [user, getCourses, getCoursesByProfId])

    return (
        <div>
            <CourseListTitle>
                {user.role === 'student'
                    ? 'Cursos disponibles'
                    : user.role === 'professor'
                    ? 'Mis cursos'
                    : 'Todos los cursos'}
            </CourseListTitle>
            {isLoading ? (
                <Spinner />
            ) : user.role === 'student'
                ? <CourseCardsView courses={courses} />
                : <CourseTableView courses={courses} />
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isLoading: state.courses.isLoading,
        courses: state.courses.all
    }
};

export default connect(mapStateToProps, { getCourses, getCoursesByProfId })(CoursesList);