import React from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { getCourseEnrollments, getEnrollments, setEnrollmentQueries } from "../../store/actions/enrollmentsActions";
import { GenericTitle, WelcomeText } from "../../styles";
import Spinner from "../../UI/Spinner";
import EnrollmentsCardsView from "./EnrollmentsCardsView";
import DynamicEnrollmentsTable from "./DynamicEnrollmentsTable";
import { editGrade, postGrade } from "../../store/actions/gradesActions";

const EnrollmentsList = ({ 
    user, 
    enrollments,
    isLoading, 
    getCourseEnrollments, 
    getEnrollments, 
    setEnrollmentQueries,
    editGrade,
    postGrade,
    queryParams,
    pagination,
    grades
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
    }, [courseId, grades, user, getEnrollments, getCourseEnrollments, queryParams]);

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
            if (isStudentEnrollmentsPath) return <WelcomeText>Aún no te has inscripto a ningún curso.</WelcomeText>;
            if (isStudentGradesPath) return <WelcomeText>Todavía no tienes calificaciones registradas.</WelcomeText>;
            if (isProfEnrollmentsPath || isProfGradesPath) return <WelcomeText>No hay estudiantes inscriptos aún.</WelcomeText>;
            if (isAdminEnrollmentsPath) return <WelcomeText>No hay suscripciones registradas.</WelcomeText>;
            if (isAdminGradesPath) return <WelcomeText>No hay calificaciones disponibles.</WelcomeText>;
            return <WelcomeText>No hay información que mostrar.</WelcomeText>;
        }

        return null;
    };

    const shouldRenderCardsView = user.role === 'student';
    const hasData = shouldRenderCardsView 
        ? enrollments?.length > 0 
        : courseEnrollments?.length > 0;

    const renderTable = () => (
        <DynamicEnrollmentsTable
            user={user}
            enrollments={courseEnrollments}
            isLoading={isLoading}
            queryParams={queryParams}
            pagination={pagination}
            setEnrollmentQueries={setEnrollmentQueries}
            editGrade={editGrade}
            postGrade={postGrade}
            showCourseColumn={user.role === 'superadmin'}
            showProfessorColumn={user.role === 'superadmin'}
            enableGradeInput={user.role !== 'student'}
        />
    );

    return (
        <div>
            <GenericTitle>{getTitle()}</GenericTitle>

            {hasData ? (
                shouldRenderCardsView 
                    ? <EnrollmentsCardsView enrollments={enrollments} />   
                    : renderTable()
            ) : (
                getMessage()
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isLoading: state.enrollments.isLoading,
        enrollments: state.enrollments.all,
        queryParams: state.enrollments.queryParams,
        pagination: state.enrollments.pagination,
        grades: state.grades.all
    }
};

export default connect(mapStateToProps, { 
    getEnrollments, 
    getCourseEnrollments,
    editGrade,
    postGrade,
    setEnrollmentQueries
})(EnrollmentsList);