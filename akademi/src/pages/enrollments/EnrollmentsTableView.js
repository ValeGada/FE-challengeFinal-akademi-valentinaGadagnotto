import React from "react";
import { connect } from "react-redux";
import { postGrade, editGrade } from "../../store/actions/gradesActions";
import { CoursesTable, CoursesTd, CoursesTh } from "../../styles";
import Spinner from "../../UI/Spinner";
import GradeScoreInput from "../../components/forms/GradeScoreInput";

const EnrollmentsTableView = ({ user, enrollments, isLoading, canEditGrades, editGrade, postGrade }) => {
    if (isLoading) return <Spinner />;
    
    return (
        <>
            <CoursesTable>
                <thead>
                    <tr>
                        {user.role === 'superadmin' &&
                            <>
                                <CoursesTh rowSpan={2}>Curso</CoursesTh>
                                <CoursesTh rowSpan={2}>Profesor</CoursesTh>
                            </>
                        }
                        <CoursesTh colSpan={2} rowSpan={1}>Estudiante</CoursesTh>
                        <CoursesTh rowSpan={2}>Nota</CoursesTh>
                    </tr>
                    <tr>
                        <CoursesTh>Nombre</CoursesTh>
                        <CoursesTh>Email</CoursesTh>
                    </tr>
                </thead>
                <tbody>
                    {enrollments?.map(enroll => (
                        <tr key={enroll.id}>
                            {user.role === 'superadmin' &&
                                <>
                                    <CoursesTd>{enroll.course.title}</CoursesTd>
                                    <CoursesTd>{enroll.course?.professor?.name}</CoursesTd>
                                </>
                            }
                            <CoursesTd>{enroll.student?.name}</CoursesTd>
                            <CoursesTd>{enroll.student?.email}</CoursesTd>
                            <CoursesTd>
                                <GradeScoreInput
                                    enroll={enroll}
                                    canEditGrades={canEditGrades}
                                    editGrade={editGrade}
                                    postGrade={postGrade}
                                />
                            </CoursesTd>
                        </tr>
                    ))}
                </tbody>
            </CoursesTable>
        </>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isLoading: state.enrollments.isLoading
    }
}

export default connect(mapStateToProps, { postGrade, editGrade })(EnrollmentsTableView);