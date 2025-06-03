import React from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { postGrade, editGrade } from "../../store/actions/gradesActions";
import GradeScoreInput from "../../components/forms/GradeScoreInput";

const GradesTable = ({ enrollments, editGrade, postGrade }) => {
  const location = useLocation();
  const courseGradesPath = location.pathname.includes('/course');

  return (
    <table>
      <thead>
        <tr>
          {courseGradesPath
            ? null
            : <th>Curso</th>
          }
          <th>Nombre</th>
          <th>Email</th>
          <th>Nota</th>
        </tr>
      </thead>
      <tbody>
        {enrollments.map(enroll => (
          <tr key={enroll.id}>
            {courseGradesPath 
              ? null
              : <td>{enroll.course.title}</td>
            }
            <td>{enroll.student.name}</td>
            <td>{enroll.student.email}</td>
            <td>
              <GradeScoreInput
                enroll={enroll}
                canEditGrades={true}
                editGrade={editGrade}
                postGrade={postGrade}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default connect(null, { editGrade, postGrade })(GradesTable);