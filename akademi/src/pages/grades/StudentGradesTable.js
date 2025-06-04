import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getStudentGrades, postGrade, editGrade } from "../../store/actions/gradesActions";
import StudentsGradeScoreInput from "../../components/forms/StudentsGradeScoreInput";
import Spinner from "../../UI/Spinner";
import { CourseListTitle } from "../../styles";

const StudentGradesTable = ({ grades, getStudentGrades, editGrade, postGrade, isLoading }) => {
    const { id } = useParams();

    useEffect(() => {
        getStudentGrades(id);
    }, [getStudentGrades, id]);

    return (
        <>
            {isLoading ?
                <Spinner /> :
                <>  
                    {grades.map(grade => 
                        <CourseListTitle>Calificaciones de {grade.student.name}</CourseListTitle>
                    )}
                    <table>
                        <thead>
                            <tr>
                                <th>Curso</th>
                                <th>Nota</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades.map(grade => (
                            <tr key={grade.id}>
                                <td>{grade.course.title}</td>
                                <td>
                                <StudentsGradeScoreInput
                                    grade={grade}
                                    editGrade={editGrade}
                                    postGrade={postGrade}
                                />
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            }
        </>
    );
};

const mapStateToProps = state => {
    return {
        grades: state.grades.all,
        isLoading: state.grades.isLoading
    }
}

export default connect(mapStateToProps, { editGrade, postGrade, getStudentGrades })(StudentGradesTable);