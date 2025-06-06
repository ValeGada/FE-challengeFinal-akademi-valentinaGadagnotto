import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getStudentGrades, postGrade, editGrade, setGradeQueries } from "../../store/actions/gradesActions";
import StudentsGradeScoreInput from "../../components/forms/StudentsGradeScoreInput";
import Spinner from "../../UI/Spinner";
import { 
    Table,
    Th,
    Td,
    GenericTitle,
    FiltersContainer,
    SearchInput,
    ControlsGroup,
    ClearFiltersButton,
    PaginationContainer,
    PerPageSelector,
    PerPageNumber,
    PageButton,
    WelcomeText
} from "../../styles";

const StudentGradesTable = ({ 
    grades, 
    getStudentGrades, 
    editGrade, 
    postGrade, 
    isLoading, 
    queryParams, 
    pagination,
    setGradeQueries 
}) => {
    const { id: studentId } = useParams();

    useEffect(() => {
        getStudentGrades(studentId, queryParams);
    }, [getStudentGrades, queryParams, studentId]);

    const handleSearchChange = (e) => {
        setGradeQueries({ search: e.target.value, page: 1 });
    };

    const handleChangePage = (page) => {
        setGradeQueries({ page });
    };

    const handleChangePerPage = (limit) => {
        setGradeQueries({ limit, page: 1 });
    };

    const clearFilters = () => {
        setGradeQueries({
            search: "",
            page: 1,
            limit: 10
        });
    };

    const selectedStudent  = grades.find(g => g.student.id === studentId)?.student;
    const selectedStudentName = selectedStudent?.name;
    const validStudentName = selectedStudentName !== undefined || null;

    return (
        <>
            <GenericTitle>
                {!isLoading 
                    ? validStudentName 
                        ? ('Calificaciones de ' + selectedStudentName) 
                        : 'Sin Calificaciones'
                    : null
                }
            </GenericTitle>

            {!validStudentName ?
                null :
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
                        <ClearFiltersButton onClick={clearFilters}>Limpiar filtros</ClearFiltersButton>
                    </ControlsGroup>     
                </FiltersContainer>}

            {isLoading ?
                <Spinner /> :
                <>  
                    {!validStudentName ?
                        <WelcomeText>Aún no hay calificaciones para mostrar.</WelcomeText> :
                        <Table>
                        <thead>
                            <tr>
                                <Th>Curso</Th>
                                <Th>Nota</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades.map(grade => (
                            <tr key={grade.id}>
                                <Td>{grade.course.title}</Td>
                                <Td>
                                    <StudentsGradeScoreInput
                                        grade={grade}
                                        editGrade={editGrade}
                                        postGrade={postGrade}
                                    />
                                </Td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>}
                    {/* Paginación */}
                    {!validStudentName ?
                        null :
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
                                    isActive={pagination.currentPage === i + 1}
                                    onClick={() => handleChangePage(i + 1)}
                                >
                                    {i + 1}
                                </PageButton>                  
                            ))}
                        </div>
                    </PaginationContainer>}
                </>
            }
        </>
    );
};

const mapStateToProps = state => {
    return {
        grades: state.grades.all,
        isLoading: state.grades.isLoading,
        queryParams: state.grades.queryParams,
        pagination: state.grades.pagination
    }
}

export default connect(mapStateToProps, { editGrade, postGrade, getStudentGrades, setGradeQueries })(StudentGradesTable);