import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getCoursesByProfId } from "../../store/actions/coursesActions";
import { editGrade, postGrade } from "../../store/actions/gradesActions";
import { CoursesTable, CoursesTd, CoursesTh, CourseListTitle } from "../../styles";
import Spinner from "../../UI/Spinner";
import GradeScoreInput from "../../components/forms/GradeScoreInput";

const GradesList = ({ user, grades, courses, editGrade, postGrade, getCoursesByProfId, isLoading }) => {   
    useEffect(() => {
        getCoursesByProfId(user.id);
    }, [user, grades, getCoursesByProfId])

    return (
        <div>
            <CourseListTitle>Calificaciones</CourseListTitle>
            {isLoading 
                ? <Spinner /> 
                : <CoursesTable>
                    <thead>
                        <tr>
                            <CoursesTh rowSpan={2}>Curso</CoursesTh>
                            <CoursesTh colSpan={2} rowSpan={1}>Estudiante</CoursesTh>
                            <CoursesTh rowSpan={2}>Nota</CoursesTh>
                        </tr>
                        <tr>
                            <CoursesTh>Nombre</CoursesTh>
                            <CoursesTh>Email</CoursesTh>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course => {
                            // Si no hay enrollments, mostramos algo vacío o mensaje
                            if (!course.enrollments || course.enrollments.length === 0) {
                                return (
                                    <tr key={course.id}>
                                        <CoursesTd colSpan="4">No hay estudiantes inscriptos.</CoursesTd>
                                    </tr>
                                );
                            }

                            return course.enrollments.map((enroll, index) => (
                                <tr key={`${course.id}-enroll-${index}`}>
                                    {index === 0 ? (
                                        <CoursesTd rowSpan={course.enrollments.length}>{course.title}</CoursesTd>
                                    ) : null}
                                    <CoursesTd>{enroll.student.name}</CoursesTd>
                                    <CoursesTd>{enroll.student.email}</CoursesTd>
                                    <CoursesTd>
                                        <GradeScoreInput
                                            enroll={enroll}
                                            canEditGrades={true}
                                            editGrade={editGrade}
                                            postGrade={postGrade}
                                        />
                                    </CoursesTd>
                                </tr>
                            ));
                        })}
                    </tbody>
                </CoursesTable>
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isLoading: state.grades.isLoading,
        courses: state.courses.all,
        grades: state.grades.all
    }
}

export default connect(mapStateToProps, { getCoursesByProfId, editGrade, postGrade })(GradesList);