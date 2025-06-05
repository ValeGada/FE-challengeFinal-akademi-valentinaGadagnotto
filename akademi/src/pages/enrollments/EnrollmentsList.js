import React from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { getCourseEnrollments, getEnrollments } from "../../store/actions/enrollmentsActions";
import { GenericTitle } from "../../styles";
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
    const { id: courseId } = useParams();
    const courseEnrollments = useSelector(state => state.enrollments.byCourseId[courseId] || []);
    const location = useLocation();

    // Paths
    const isStudentEnrollmentsPath = location.pathname.includes('/student/my-enrollments');
    const isStudentGradesPath = location.pathname.includes('/student/my-grades');
    const isProfEnrollmentsPath = location.pathname.includes('/prof/enrollments/course/');
    const isProfGradesPath = location.pathname.includes('/prof/grades/course/');
    const isAdminEnrollmentsPath = location.pathname.includes('/admin/enrollments') && 
        !location.pathname.includes('/course');
    const isAdminGradesPath = location.pathname.includes('/admin/grades/course/');

    useEffect(() => {       
        if (user.role !== 'student') {
            getCourseEnrollments(courseId, queryParams);
        } else {
            getEnrollments(user.id, queryParams);
        }
    }, [courseId, grades, user, user?.id, user?.role, getEnrollments, getCourseEnrollments, queryParams]);

    // Título según la ruta
    const getTitle = () => {
        if (!user?.id) return 'Suscripciones';

        if (isStudentEnrollmentsPath) return 'Mis suscripciones';
        if (isStudentGradesPath) return 'Mis calificaciones';
        if (isProfEnrollmentsPath) return 'Inscriptos';
        if (isProfGradesPath || isAdminGradesPath) return 'Calificaciones';
        if (isAdminEnrollmentsPath) return 'Total de suscripciones';

        return 'Suscripciones';
    };

    // Mensaje según la ruta
    const getMessage = () => {
        if (isLoading) return <Spinner />;

        if (!enrollments || enrollments.length === 0) {
            if (isStudentEnrollmentsPath) return <p>Aún no te has inscripto a ningún curso.</p>;
            if (isStudentGradesPath) return <p>Todavía no tienes calificaciones registradas.</p>;
            if (isProfEnrollmentsPath || isProfGradesPath) return <p>No hay estudiantes inscriptos aún.</p>;
            if (isAdminEnrollmentsPath) return <p>No hay suscripciones registradas.</p>;
            if (isAdminGradesPath) return <p>No hay calificaciones disponibles.</p>;
            return <p>No hay información que mostrar.</p>;
        }

        return null;
    };

    return (
        <div>
            <GenericTitle>{getTitle()}</GenericTitle>

            {!isLoading && enrollments?.length > 0 ? (
                user.role === 'student' ? (
                <EnrollmentsCardsView enrollments={enrollments} />
                ) : location.pathname.includes('/grades') ? (
                    <GradesTable courseId={courseId} enrollments={courseEnrollments} />
                ) : (
                    <EnrollmentsTableView
                        enrollments={courseEnrollments}
                        canEditGrades={isProfGradesPath || isAdminGradesPath}
                        showGradeColumn={false}
                    />
                )
            ) : (
                <>{getMessage()}</>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isLoading: state.enrollments.isLoading,
        enrollments: state.enrollments.all.map(e => ({
            ...e,
            course: e.course || {},
            student: e.student || {}
        })),
        grades: state.grades.all,
        queryParams: state.enrollments.queryParams
    }
};

export default connect(mapStateToProps, { getEnrollments, getCourseEnrollments })(EnrollmentsList);