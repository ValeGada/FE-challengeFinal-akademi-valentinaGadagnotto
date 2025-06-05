import React from "react";
import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getCourseEnrollments, setEnrollmentQueries } from "../../store/actions/enrollmentsActions";
import { getCoursesByProfId } from "../../store/actions/coursesActions";
import { editGrade, postGrade } from "../../store/actions/gradesActions";
import { 
    Table, 
    Td, 
    Th, 
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
import Spinner from "../../UI/Spinner";
import GradeScoreInput from "../../components/forms/GradeScoreInput";

const GradesList = ({ 
    user, 
    grades, 
    courses, 
    editGrade, 
    postGrade, 
    getCoursesByProfId, 
    getCourseEnrollments,
    isLoadingCourses,
    isLoadingEnrollments,
    setEnrollmentsQueries,
    queryParams,
    pagination
}) => {   
    const courseEnrollmentsList = useSelector(state =>
        courses.map(course => ({
            ...course,
            courseEnrollments: state.enrollments.byCourseId[course.id] || []
        }))
    );

    useEffect(() => {
        getCoursesByProfId(user.id, queryParams);
    }, [user, grades, getCoursesByProfId, queryParams]);
    
    useEffect(() => {
        if (courses.length > 0) {
            courses.forEach(course => {
                getCourseEnrollments(course.id, {});
            });
        }
    }, [courses, getCourseEnrollments]);

    const handleSearchChange = (e) => {
        setEnrollmentsQueries({ search: e.target.value, page: 1 });
    };

    const handleSort = (field) => {
        const newOrder = queryParams.sortOrder === "asc" ? "desc" : "asc";
        setEnrollmentsQueries({ sortBy: field, sortOrder: newOrder });
    };

    const handleChangePage = (page) => {
        setEnrollmentsQueries({ page });
    };

    const handleChangePerPage = (limit) => {
        setEnrollmentsQueries({ limit, page: 1 });
    };

    const clearFilters = () => {
        setEnrollmentsQueries({
            search: "",
            sortBy: "title",
            sortOrder: "asc",
            page: 1,
            limit: 10,
            role: ""
        });
    };

    return (
        <div>
            <GenericTitle>Calificaciones</GenericTitle>
            {isLoadingCourses
                ? <Spinner /> 
                : <>
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
                                <SortButton onClick={()=> handleSort('title')}>
                                    Curso {queryParams.sortOrder === 'asc' ? "↓" : "↑"}
                                </SortButton>
                                <SortButton onClick={()=> handleSort('student.name')}>
                                    Nombre {queryParams.sortOrder === 'asc' ? "↓" : "↑"}
                                </SortButton>
                                <SortButton onClick={()=> handleSort('student.receivedGrades')}>
                                    Nota {queryParams.sortOrder === 'desc' ? "↑" : "↓"}
                                </SortButton>
                            </SortContainer>
                            <ClearFiltersButton onClick={clearFilters}>Limpiar filtros</ClearFiltersButton>
                        </ControlsGroup>     
                    </FiltersContainer>
                    <Table>
                        <thead>
                            <tr>
                                <Th rowSpan={2}>Curso</Th>
                                <Th colSpan={2} rowSpan={1}>Estudiante</Th>
                                <Th rowSpan={2}>Nota</Th>
                            </tr>
                            <tr>
                                <Th>Nombre</Th>
                                <Th>Email</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseEnrollmentsList.map(courseData => {
                                const { courseEnrollments } = courseData;
                                if (isLoadingEnrollments && (!courseEnrollments || courseEnrollments.length === 0)) {
                                    return (
                                        <Spinner />
                                    );
                                } else if (!isLoadingEnrollments && (!courseEnrollmentsList || courseEnrollmentsList.length === 0)) {
                                    return (
                                        <tr key={courseData.id}>
                                            <Td colSpan="4">No hay estudiantes inscriptos.</Td>
                                        </tr>
                                    );
                                }
                                
                                return courseEnrollments.map((courseEnroll, index) => (
                                    <tr key={`${courseData.id}-enroll-${index}`}>
                                        {index === 0 ? (
                                            <Td rowSpan={courseEnrollments.length}>{courseData.title}</Td>
                                        ) : null}
                                        <Td>{courseEnroll.student.name}</Td>
                                        <Td>{courseEnroll.student.email}</Td>
                                        <Td>
                                            <GradeScoreInput
                                                enroll={courseEnroll}
                                                canEditGrades={true}
                                                editGrade={editGrade}
                                                postGrade={postGrade}
                                            />
                                        </Td>
                                    </tr>
                                ));
                            })}
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
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isLoadingCourses: state.courses.isLoading,
        isLoadingEnrollments: state.enrollments.isLoading,
        courses: state.courses.all,
        grades: state.grades.all,
        queryParams: state.courses.queryParams,
        pagination: state.grades.pagination
    }
}

export default connect(mapStateToProps, { 
    getCoursesByProfId, 
    editGrade, 
    postGrade, 
    setEnrollmentQueries, 
    getCourseEnrollments 
})(GradesList);