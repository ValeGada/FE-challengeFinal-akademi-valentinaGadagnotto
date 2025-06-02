import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getGrades, editGrade } from "../../store/actions/gradesActions";
import { CoursesTable, CoursesTd, CoursesTh, CourseListTitle } from "../../styles";

const GradesList = ({ grades, getGrades, editGrade, isLoading }) => {
    const handleGradeEdit = (grade) => {
        editGrade(grade.id);
    }
    
    return (
        <>            
            <div style={{paddingTop: '60px'}}>
                <CourseListTitle>Calificaciones</CourseListTitle>
                <CoursesTable>
                    <thead>
                        <tr>
                            <CoursesTh>Estudiante</CoursesTh>
                            <tr>
                                <CoursesTh>Nombre</CoursesTh>
                                <CoursesTh>Email</CoursesTh>
                            </tr>
                            <CoursesTh>Nota</CoursesTh>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map(grade => (
                            <tr key={grade.id}>
                                <CoursesTd>{grade.student?.name}</CoursesTd>
                                <CoursesTd>{grade.student?.email}</CoursesTd>
                                <CoursesTd>
                                    {grade.score}
                                    <button onClick={() => handleGradeEdit(grade)}>
                                        ✏️
                                    </button>
                                </CoursesTd>
                            </tr>
                        ))}
                    </tbody>
                </CoursesTable>
            </div>
        </>
    );
};

const mapStateToProps = state => {
    return {
        isLoading: state.grades.isLoading,
        grades: state.grades.all
    }
}

export default connect(mapStateToProps, { getGrades, editGrade })(GradesList);