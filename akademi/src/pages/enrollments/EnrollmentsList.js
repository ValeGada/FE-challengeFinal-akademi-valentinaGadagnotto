import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { getCourseEnrollments, getEnrollments } from "../../store/actions/enrollmentsActions";
import { CourseListTitle } from "../../styles";
import Spinner from "../../UI/Spinner";
import EnrollmentsCardsView from "./EnrollmentsCardsView";
import EnrollmentsTableView from "./EnrollmentsTableView";

const EnrollmentsList = ({ user, enrollments, isLoading, getCourseEnrollments, getEnrollments }) => {
    const location = useLocation();

    const isStudentPath = location.pathname.includes('/student/');
    const isProfPath = location.pathname.includes('/prof/');
    const isAdminPath = location.pathname.includes('/admin/');
    
    useEffect(() => {        
        const waitAuth = async () => {
            if (user.role === 'professor') {
                await getCourseEnrollments(user.id);
            } else {
                await getEnrollments(user.id);
            }
        }
        waitAuth();
    }, [user, user?.id, user?.role, getEnrollments, getCourseEnrollments]);
    
    const getTitle = () => {
        if (!user || !user.id) {
            if (isStudentPath) return 'Mis calificaciones';
            if (isProfPath) return 'Suscripciones por curso';
            if (isAdminPath) return 'Total de suscripciones';
            return 'Suscripciones';
        }

        return user.role === 'student'
            ? 'Mis suscripciones'
            : user.role === 'professor'
                ? 'Suscripciones por curso'
                : 'Total de suscripciones';
    };

    return (
        <div>
            <CourseListTitle>{getTitle()}</CourseListTitle>
            {!user || isLoading ? (
                <Spinner />
            ) : user.role === 'student'
                ? <EnrollmentsCardsView enrollments={enrollments} />
                : <EnrollmentsTableView enrollments={enrollments} />
            }
            {!isLoading && isStudentPath && enrollments?.length === 0 ? (
                <p>Aún no te has suscripto a ningún curso.</p>
            ) : (!isLoading && !isStudentPath && enrollments?.length === 0) && (
                <p>Aún no hay suscripciones a ningún curso.</p>
            )}
            
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isLoading: state.enrollments.isLoading,
        enrollments: state.enrollments.all
    }
};

export default connect(mapStateToProps, { getEnrollments, getCourseEnrollments })(EnrollmentsList);