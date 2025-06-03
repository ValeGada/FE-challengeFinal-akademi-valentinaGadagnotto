import React from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getCourseEnrollments, getEnrollments } from "../../store/actions/enrollmentsActions";
import { CourseListTitle } from "../../styles";
import Spinner from "../../UI/Spinner";
import EnrollmentsCardsView from "./EnrollmentsCardsView";
import EnrollmentsTableView from "./EnrollmentsTableView";
import GradesTable from "../grades/GradesTable";
// import AdminGradesTable from "../grades/AdminGradesTable";

const EnrollmentsList = ({ user, enrollments, isLoading, getCourseEnrollments, getEnrollments }) => {
    const { id } = useParams();
    const location = useLocation();

    const isStudentEnrollmentsPath = location.pathname.includes('/student/my-enrollments/');
    const isStudentGradesPath = location.pathname.includes('/student/my-grades/');
    const isProfEnrollmentsPath = location.pathname.includes('/prof/enrollments/');
    const isProfGradesPath = location.pathname.includes('/prof/grades/')
    const isAdminEnrollmentsPath = location.pathname.includes('/admin/enrollments');
    const isAdminGradesPath = location.pathname.includes('/admin/grades');
    
    useEffect(() => {       
        if (user.role !== 'student') {
            getCourseEnrollments(id);
        } else {
            getEnrollments(user.id);
        }
    }, [id, user, user?.id, user?.role, getEnrollments, getCourseEnrollments]);


    
    const getTitle = () => {
        if (!user?.id) return 'Suscripciones';

        if (isStudentEnrollmentsPath) return 'Mis suscripciones';
        if (isStudentGradesPath) return 'Mis calificaciones';
        if (isProfEnrollmentsPath) return 'Inscriptos';
        if (isProfGradesPath || isAdminGradesPath) return 'Calificaciones';
        if (isAdminEnrollmentsPath) return 'Total de suscripciones';

        return 'Suscripciones';
    };

    return (
        <div>
            <CourseListTitle>{getTitle(location, user)}</CourseListTitle>

            {!user || isLoading ? (
                <Spinner />
            ) : user.role === 'student' ? (
                <EnrollmentsCardsView enrollments={enrollments} />
            ) : location.pathname.includes('/grades') ? (
                
                    <GradesTable courseId={id} enrollments={enrollments} />
                
            ) : (
                <EnrollmentsTableView
                    enrollments={enrollments}
                    canEditGrades={isProfGradesPath || isAdminGradesPath}
                    showGradeColumn={false}
                />
            )}

            {!isLoading && isStudentEnrollmentsPath && enrollments?.length === 0 ? (
                <p>Aún no te has suscripto a ningún curso.</p>
            ) : (!isLoading && !isStudentEnrollmentsPath && enrollments?.length === 0) && (
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