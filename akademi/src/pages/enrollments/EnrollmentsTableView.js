import React from "react";
import { connect } from "react-redux";
import { postGrade, editGrade } from "../../store/actions/gradesActions";
import { CoursesTable, CoursesTd, CoursesTh } from "../../styles";
import Spinner from "../../UI/Spinner";
import GradeScoreInput from "../grades/GradeScoreInput";

const EnrollmentTableView = ({ enrollments, isLoading, canEditGrades, editGrade, postGrade }) => {
    if (isLoading) return <Spinner />;
    
    return (
        <>

            <CoursesTable>
                <thead>
                    <tr>
                        <CoursesTh>Estudiante</CoursesTh>
                        <CoursesTh>Nota</CoursesTh>
                    </tr>
                </thead>
                <tbody>
                    {enrollments?.map(enroll => (
                        <tr key={enroll.id}>
                            <CoursesTd>
                                <div>{enroll.student?.name}</div>
                                <div>{enroll.student?.email}</div>
                            </CoursesTd>
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
        isLoading: state.enrollments.isLoading
    }
}

export default connect(mapStateToProps, { postGrade, editGrade })(EnrollmentTableView);