import React from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getCourseEnrollments, getEnrollments } from "../../store/actions/enrollmentsActions";
import { CourseListTitle } from "../../styles";
import Spinner from "../../UI/Spinner";
import EnrollmentsCardsView from "./EnrollmentsCardsView";
import EnrollmentsTableView from "./EnrollmentsTableView";

const EnrollmentsList = ({ user, enrollments, isLoading, getCourseEnrollments, getEnrollments }) => {
    const { id } = useParams();
    const location = useLocation();

    const isStudentPath = location.pathname.includes('/student/');
    const isProfEnrollmentsPath = location.pathname.includes('/prof/enrollments/');
    const isProfGradesPath = location.pathname.includes('/prof/grades/')
    const isAdminPath = location.pathname.includes('/admin/');
    
    useEffect(() => {        
        const waitAuth = async () => {
            if (user.role === 'professor') {
                await getCourseEnrollments(id);
            } else {
                await getEnrollments(user.id);
            }
        }
        waitAuth();
    }, [id, user, user?.id, user?.role, getEnrollments, getCourseEnrollments]);
    
    const getTitle = () => {
        if (!user || !user.id) {
            if (isStudentPath) return 'Mis suscripciones';
            if (isProfEnrollmentsPath) return 'Inscriptos';
            if (isProfGradesPath) return 'Calificaciones';
            if (isAdminPath) return 'Total de suscripciones';
            return 'Suscripciones';
        }

        return user.role === 'student'
            ? 'Mis suscripciones'
            : user.role === 'superadmin' 
                ? 'Total de suscripciones'
                : user.role === 'professor' && isProfEnrollmentsPath
                    ? 'Inscriptos'
                    : 'Calificaciones';
    };

    return (
        <div>
            <CourseListTitle>{getTitle()}</CourseListTitle>

            {!user || isLoading ? (
                <Spinner />
            ) : user.role === 'student'
                ? <EnrollmentsCardsView enrollments={enrollments} />
                : <EnrollmentsTableView enrollments={enrollments} canEditGrades={isProfGradesPath} />
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