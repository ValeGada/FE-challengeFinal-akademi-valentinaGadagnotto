import React from "react";
import {
    Table, Td, Th, FiltersContainer, ControlsGroup,
    SearchInput, ClearFiltersButton, PaginationContainer,
    PerPageSelector, PerPageNumber, PageButton, SidebarLink
} from "../../styles";
import GradeScoreInput from "../../components/forms/GradeScoreInput";
import Spinner from "../../UI/Spinner";

const DynamicEnrollmentsTable = ({
    user,
    enrollments,
    isLoading,
    queryParams,
    pagination,
    setEnrollmentQueries,
    editGrade,
    postGrade,
    showCourseColumn = false,
    showProfessorColumn = false,
    enableGradeInput = false
}) => {    
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

    return (
        <>
            <FiltersContainer>
                <div>
                    <SearchInput
                        type='text'
                        placeholder='Buscar estudiante...'
                        value={queryParams.search}
                        onChange={handleSearchChange}
                    />
                </div>
                <ControlsGroup>
                    <ClearFiltersButton onClick={clearFilters}>Limpiar filtros</ClearFiltersButton>
                </ControlsGroup>
            </FiltersContainer>

            {isLoading ?
                <Spinner /> :
                <>
                    <Table>
                        <thead>
                            <tr>
                                {showCourseColumn && <Th>Curso</Th>}
                                {showProfessorColumn && <Th>Profesor</Th>}
                                <Th>Nombre</Th>
                                <Th>Email</Th>
                                <Th>Nota</Th>
                            </tr>
                        </thead>
                        <tbody>
                        {enrollments.length > 0 ? (
                            enrollments.map(enroll => (
                                <tr key={enroll.id}>
                                    {showCourseColumn && <Td>{enroll.course.title}</Td>}
                                    {showProfessorColumn && <Td>{enroll.course.professor?.name}</Td>}
                                    <Td>
                                        {user.role === 'professor' ? (
                                            <SidebarLink to={'prof/grades/student/${enroll.student.id}'}>
                                                {enroll.student.name}
                                            </SidebarLink>
                                        ) : (
                                            <>{enroll.student.name}</>
                                        )}
                                    </Td>
                                    <Td>{enroll.student.email}</Td>
                                    <Td>
                                        <GradeScoreInput
                                            enroll={{ student: enroll.student, course: enroll.course }}
                                            canEditGrades={enableGradeInput}
                                            editGrade={editGrade}
                                            postGrade={postGrade}
                                        />
                                    </Td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                            <Td style={{ textAlign: 'center' }} colSpan={5}>No hay inscriptos aún.</Td>
                            </tr>
                        )}
                        </tbody>
                    </Table>

                    <PaginationContainer>
                        <PerPageSelector>
                            Registros por página:
                            <PerPageNumber onClick={() => handleChangePerPage(5)}>5</PerPageNumber> -
                            <PerPageNumber onClick={() => handleChangePerPage(10)}>10</PerPageNumber>
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
        </>
    );
};

export default DynamicEnrollmentsTable;
