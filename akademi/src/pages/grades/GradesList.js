import React from "react";
import { useEffect, useState } from "react";
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
    setEnrollmentQueries,
    queryParams,
    pagination
}) => {   
    const [enrollmentsInitialized, setEnrollmentsInitialized] = useState(false);
    const [loadingEnrollments, setLoadingEnrollments] = useState(false);

    const courseEnrollmentsList = useSelector(state =>
        courses.map(course => ({
            ...course,
            courseEnrollments: state.enrollments.byCourseId[course.id] || []
        }))
    );

    useEffect(() => {
        getCoursesByProfId(user.id, {});
    }, [user, grades, getCoursesByProfId]);
    
    useEffect(() => {
        if (courses.length > 0 && !enrollmentsInitialized) {
            setLoadingEnrollments(true);
            setEnrollmentsInitialized(true);

            const manageLoadingState = async () => {
                await courses.map(course => getCourseEnrollments(course.id, queryParams))
            }
            
            try {
                manageLoadingState();
                setLoadingEnrollments(false);
            } catch {
                setLoadingEnrollments(false);
            }
        }
    }, [courses, getCourseEnrollments, queryParams, enrollmentsInitialized]);

    const handleSearchChange = (e) => {
        setEnrollmentQueries({ search: e.target.value, page: 1 });
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
            page: 1,
            limit: 10
        });
    };

    const isLoading = isLoadingCourses || loadingEnrollments;

    return (
        <div>
            <GenericTitle>Calificaciones</GenericTitle>

            <FiltersContainer>
                <div>
                    <SearchInput 
                        type='text' 
                        placeholder='Buscar curso / alumno...'
                        value={queryParams.search}
                        onChange={handleSearchChange}
                    />
                </div>
                <ControlsGroup>
                    <ClearFiltersButton onClick={clearFilters}>Limpiar filtros</ClearFiltersButton>
                </ControlsGroup>     
            </FiltersContainer>

            {isLoading
                ? <Spinner /> 
                : <>
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

                                if (!courseEnrollments || courseEnrollments.length === 0) {
                                    return (
                                        <tr key={courseData.id}>
                                            <Td>{courseData.title}</Td>
                                            <Td colSpan={3}>Aún no hay inscriptos en este curso.</Td>
                                        </tr>
                                    );
                                }

                                return courseEnrollments.map((courseEnroll, index) => (
                                    <tr key={`${courseData.id}-enroll-${index}`}>
                                        {index === 0 && (
                                            <Td rowSpan={courseEnrollments.length}>{courseData.title}</Td>
                                        )}
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
                                    isActive={pagination.currentPage === i + 1}
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
        courses: state.courses.all,
        grades: state.grades.all,
        queryParams: state.enrollments.queryParams,
        pagination: state.enrollments.pagination
    }
}

export default connect(mapStateToProps, { 
    getCoursesByProfId, 
    editGrade, 
    postGrade, 
    setEnrollmentQueries, 
    getCourseEnrollments 
})(GradesList);