import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getStudentGrades, postGrade, editGrade, setGradeQueries } from "../../store/actions/gradesActions";
import StudentsGradeScoreInput from "../../components/forms/StudentsGradeScoreInput";
import Spinner from "../../UI/Spinner";
import { 
    GenericTitle,
    FiltersContainer,
    SortButton,
    SortContainer,
    SearchInput,
    ControlsGroup,
    ClearFiltersButton,
    PaginationContainer,
    PerPageSelector,
    PerPageNumber,
    PageButton
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
    const { id } = useParams();

    useEffect(() => {
        getStudentGrades(id);
    }, [getStudentGrades, id]);

    const handleSearchChange = (e) => {
        setGradeQueries({ search: e.target.value, page: 1 });
    };

    const handleSort = (field) => {
        const newOrder = queryParams.sortOrder === "asc" ? "desc" : "asc";
        setGradeQueries({ sortBy: field, sortOrder: newOrder });
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
            sortBy: "course.title",
            sortOrder: "asc",
            page: 1,
            limit: 10,
            role: ""
        });
    };

    return (
        <>
            {isLoading ?
                <Spinner /> :
                <>  
                    {grades.map(grade => 
                        <GenericTitle>Calificaciones de {grade.student.name}</GenericTitle>
                    )}
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
                                <SortButton onClick={()=> handleSort('course.title')}>
                                    Curso {queryParams.sortOrder === 'asc' ? "↓" : "↑"}
                                </SortButton>
                                <SortButton onClick={()=> handleSort('score')}>
                                    Nota {queryParams.sortOrder === 'desc' ? "↑" : "↓"}
                                </SortButton>
                            </SortContainer>
                            <ClearFiltersButton onClick={clearFilters}>Limpiar filtros</ClearFiltersButton>
                        </ControlsGroup>     
                    </FiltersContainer>
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