import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getCourseEnrollments, getEnrollments } from "../../store/actions/enrollmentsActions";
import { CourseListTitle } from "../../styles";
import Spinner from "../../UI/Spinner";
import EnrollmentsCardsView from "./EnrollmentsCardsView";
import EnrollmentsTableView from "./EnrollmentsTableView";

const EnrollmentsList = ({ user, enrollments, isLoading, getCourseEnrollments, getEnrollments }) => {
    useEffect(() => {
        if (user && user.role === 'professor' && user.id) {
            getCourseEnrollments(user.id);
        } else if (user && user.role !== 'professor') {
            getEnrollments();
        }
    }, [user, getEnrollments, getCourseEnrollments])

    return (
        <div>
            <CourseListTitle>
                {user.role === 'student' ? 'Mis suscripciones' 
                    ? user.role === 'professor' : 'Suscripciones por curso'
                    : 'Total de suscripciones'
                }
            </CourseListTitle>
            {isLoading ? (
                <Spinner />
            ) : user.role === 'student'
                ? <EnrollmentsCardsView enrollments={enrollments} />
                : <EnrollmentsTableView enrollments={enrollments} />
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isLoading: state.enrollments.isLoading,
        enrollmenst: state.enrollments.all
    }
};

export default connect(mapStateToProps, { getEnrollments, getCourseEnrollments })(EnrollmentsList);