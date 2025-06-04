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

const EnrollmentsList = ({ 
    user, 
    grades,
    enrollments, 
    isLoading, 
    getCourseEnrollments, 
    getEnrollments, 
    queryParams
}) => {
    const { id } = useParams();
    const location = useLocation();

    // Paths
    const isStudentEnrollmentsPath = location.pathname.includes('/student/my-enrollments');
    const isStudentGradesPath = location.pathname.includes('/student/my-grades');
    const isProfEnrollmentsPath = location.pathname.includes('/prof/enrollments/course/');
    const isProfGradesPath = location.pathname.includes('/prof/grades/course/');
    const isAdminEnrollmentsPath = location.pathname.includes('/admin/enrollments') && 
        !location.pathname.includes('/course');
    const isAdminGradesPath = location.pathname.includes('/admin/grades/course/');

    // Title logic
    const getTitle = () => {
        if (!user?.id) return 'Suscripciones';

        if (isStudentEnrollmentsPath) return 'Mis suscripciones';
        if (isStudentGradesPath) return 'Mis calificaciones';
        if (isProfEnrollmentsPath) return 'Inscriptos';
        if (isProfGradesPath || isAdminGradesPath) return 'Calificaciones';
        if (isAdminEnrollmentsPath) return 'Total de suscripciones';

        return 'Suscripciones';
    };

    // Message based on state
    const getMessage = () => {
        if (isLoading) return <Spinner />;

        if (!enrollments || enrollments.length === 0) {
            if (isStudentEnrollmentsPath) return 'Aún no te has inscripto a ningún curso.';
            if (isStudentGradesPath) return 'Todavía no tienes calificaciones registradas.';
            if (isProfEnrollmentsPath || isProfGradesPath) return 'No hay estudiantes inscriptos aún.';
            if (isAdminEnrollmentsPath) return 'No hay suscripciones registradas.';
            if (isAdminGradesPath) return 'No hay calificaciones disponibles.';
            return 'No hay información que mostrar.';
        }

        return null;
    };
    
    useEffect(() => {       
        if (user.role !== 'student') {
            getCourseEnrollments(id, queryParams);
        } else {
            getEnrollments(user.id, queryParams);
        }
    }, [id, grades, user, user?.id, user?.role, getEnrollments, getCourseEnrollments, queryParams]);

    return (
        <div>
            <CourseListTitle>{getTitle()}</CourseListTitle>

            {!isLoading && enrollments?.length > 0 ? (
                user.role === 'student' ? (
                <EnrollmentsCardsView enrollments={enrollments} />
                ) : location.pathname.includes('/grades') ? (
                    <GradesTable courseId={id} enrollments={enrollments} />
                ) : (
                    <EnrollmentsTableView
                        enrollments={enrollments}
                        canEditGrades={isProfGradesPath || isAdminGradesPath}
                        showGradeColumn={false}
                    />
                )
            ) : (
                <p>{getMessage()}</p>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isLoading: state.enrollments.isLoading,
        enrollments: state.enrollments.all,
        grades: state.grades.all,
        queryParams: state.enrollments.queryParams
    }
};

export default connect(mapStateToProps, { getEnrollments, getCourseEnrollments })(EnrollmentsList);