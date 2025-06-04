import React from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setEnrollmentQueries } from "../../store/actions/enrollmentsActions";
import { postGrade, editGrade } from "../../store/actions/gradesActions";
import GradeScoreInput from "../../components/forms/GradeScoreInput";

const GradesTable = ({ enrollments, editGrade, postGrade, queryParams, pagination, setEnrollmentQueries }) => {
  const location = useLocation();
  const courseGradesPath = location.pathname.includes('/course');

  const handleSearchChange = (e) => {
        setEnrollmentQueries({ search: e.target.value, page: 1 });
    };

    const handleSort = (field) => {
        const newOrder = queryParams.sortOrder === "asc" ? "desc" : "asc";
        setEnrollmentQueries({ sortBy: field, sortOrder: newOrder });
    };

    const handleChangePage = (page) => {
        setEnrollmentQueries({ page });
    };

    const handleChangePerPage = (limit) => {
        setEnrollmentQueries({ limit, page: 1 });
    };

    const clearFilters = () => {
        setEnrollmentQueries({
            search: "",
            sortBy: "name",
            sortOrder: "asc",
            page: 1,
            limit: 10,
            role: ""
        });
    };

  return (
    <>
      <div>
        <div>
            <input 
                type='text' 
                placeholder='Buscar...'
                value={queryParams.search}
                onChange={handleSearchChange}
            />
        </div>
        <div>
            <div>
                Ordenar por:
                <button onClick={()=> handleSort('student.name')}>
                    Nombre {queryParams.sortOrder === 'asc' ? "↓" : "↑"}
                </button>
            </div>
            <button onClick={clearFilters}>Limpiar filtros</button>
        </div>     
    </div>
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
      {/* Paginación */}
      <div>
          Calificaciones por página: 
          <span onClick={()=>handleChangePerPage(5)}>5</span> - 
          <span onClick={()=>handleChangePerPage(10)}>10</span>
      </div>
      <div>
          {pagination.totalPages > 0 && 
              Array.from({ length: pagination.totalPages }, (_, i) => (
                  <button 
                      key={i}
                      onClick={() => handleChangePage(i + 1)}
                      style={pagination.currentPage === i + 1 ? { background: '#555555', color: '#f1f1f1' } : {}}
                  >
                      {i + 1}
                  </button>                   
              ))}
      </div>
    </>
  );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isLoading: state.enrollments.isLoading,
        queryParams: state.enrollments.queryParams,
        pagination: state.enrollments.pagination
    }
}

export default connect(mapStateToProps, { editGrade, postGrade, setEnrollmentQueries })(GradesTable);