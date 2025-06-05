import React from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setEnrollmentQueries } from "../../store/actions/enrollmentsActions";
import { postGrade, editGrade } from "../../store/actions/gradesActions";
import GradeScoreInput from "../../components/forms/GradeScoreInput";
import { 
  Table, 
  Td, 
  Th,
  FiltersContainer,
  ControlsGroup,
  SearchInput,
  SortButton,
  SortContainer,
  ClearFiltersButton,
  PaginationContainer,
  PerPageSelector,
  PerPageNumber,
  PageButton
} from "../../styles";

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
      <FiltersContainer>
        <div>
          <SearchInput 
            type='text' 
            placeholder='Buscar...'
            value={queryParams.search}
            onChange={handleSearchChange}
          />
        </div>
        <ControlsGroup>
          <SortContainer>
            Ordenar por:
            <SortButton onClick={()=> handleSort('student.name')}>
              Nombre {queryParams.sortOrder === 'asc' ? "↓" : "↑"}
            </SortButton>
            <SortButton onClick={()=> handleSort('student.receivedGrades.score')}>
              Nota {queryParams.sortOrder === 'asc' ? "↓" : "↑"}
            </SortButton>
          </SortContainer>
          <ClearFiltersButton onClick={clearFilters}>Limpiar filtros</ClearFiltersButton>
        </ControlsGroup>     
      </FiltersContainer>
      <Table>
        <thead>
          <tr>
            {!courseGradesPath && <Th>Curso</Th>}
            <Th>Nombre</Th>
            <Th>Email</Th>
            <Th>Nota</Th>
          </tr>
        </thead>
        <tbody>
          {enrollments.length > 0 ? (
            enrollments.map(enroll => (
              <tr key={enroll.id}>
                {!courseGradesPath && <Td>{enroll.course.title}</Td>}
                <Td>{enroll.student.name}</Td>
                <Td>{enroll.student.email}</Td>
                <Td>
                  <GradeScoreInput
                    enroll={{
                      student: enroll.student,
                      course: enroll.course
                    }}  
                    canEditGrades={true}
                    editGrade={editGrade}
                    postGrade={postGrade}
                  />
                </Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td style={{textAlign: 'center'}} colSpan={5}>No hay inscriptos aún.</Td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* Paginación */}
      <PaginationContainer>  
        <PerPageSelector>
          Calificaciones por página: 
          <PerPageNumber onClick={()=>handleChangePerPage(5)}>5</PerPageNumber> - 
          <PerPageNumber onClick={()=>handleChangePerPage(10)}>10</PerPageNumber>
        </PerPageSelector>
        <div>
          {pagination.totalPages > 0 && 
            Array.from({ length: pagination.totalPages }, (_, i) => (
                <PageButton 
                    key={i}
                    active={pagination.currentPage === i + 1}
                    onClick={() => handleChangePage(i + 1)}
                >
                    {i + 1}
                </PageButton>                  
            ))}
        </div>
      </PaginationContainer>
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