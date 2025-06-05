import React from "react";
import { connect } from "react-redux";
import { setEnrollmentQueries } from "../../store/actions/enrollmentsActions";
import { postGrade, editGrade } from "../../store/actions/gradesActions";
import { 
    Table, 
    Td, 
    Th, 
    SidebarLink,
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
import Spinner from "../../UI/Spinner";
import GradeScoreInput from "../../components/forms/GradeScoreInput";

const EnrollmentsTableView = ({ 
    user, 
    enrollments, 
    isLoading, 
    canEditGrades, 
    editGrade, 
    postGrade,
    queryParams,
    pagination,
    setEnrollmentQueries
}) => {
    const prefix = user.role === 'superadmin' ? '/admin' : '/prof';

    // Filtros
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
            sortBy: "title",
            sortOrder: "asc",
            page: 1,
            limit: 10
        });
    };

    if (isLoading) return <Spinner />;
    
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
                        {user.role === 'superadmin' &&
                            <>
                                <Th rowSpan={2}>Curso</Th>
                                <Th rowSpan={2}>Profesor</Th>
                            </>
                        }
                        <Th colSpan={2} rowSpan={1}>Estudiante</Th>
                        <Th rowSpan={2}>Nota</Th>
                    </tr>
                    <tr>
                        <Th>Nombre</Th>
                        <Th>Email</Th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments.length > 0 ? (
                        enrollments.map(enroll => (
                            <tr key={enroll.id}>
                                {user.role === 'superadmin' &&
                                    <>
                                        <Td>{enroll.course.title}</Td>
                                        <Td>{enroll.course.professor.name}</Td>
                                    </>
                                }
                                <Td>
                                    <SidebarLink to={`${prefix}/grades/student/${enroll.student.id}`}>
                                        {enroll.student.name}
                                    </SidebarLink>
                                </Td>
                                <Td>{enroll.student.email}</Td>
                                <Td>
                                    <GradeScoreInput
                                        enroll={{
                                            student: enroll.student,
                                            course: enroll.course
                                        }}  
                                        canEditGrades={canEditGrades}
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
                    Inscripciones por página: 
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

export default connect(mapStateToProps, { postGrade, editGrade, setEnrollmentQueries })(EnrollmentsTableView);