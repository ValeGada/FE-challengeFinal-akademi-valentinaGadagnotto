import React from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setEnrollmentQueries } from "../../store/actions/enrollmentsActions";
import Spinner from "../../UI/Spinner";
import EnrollmentCard from "../../components/cards/EnrollmentCard";
import { 
    GridContainer,
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

const EnrollmentsCardsView = ({ isLoading, enrollments, setEnrollmentQueries, pagination, queryParams }) => {
    const location = useLocation();

    // Revisa en todos los cursos a los que el alumno está inscripto si existe al menos una nota asignada
    const hasNoGrades = location.pathname.includes('/student/my-grades') &&
        enrollments.every(enrollment => 
            !enrollment.student?.profile?.receivedGrades?.some(
                g => g.course.toString() === enrollment.course.id.toString()
            )
        );
    
    // si some nunca da "true", no hay ninguna nota en ningún curso al que está inscripto
    // en Calificaciones que diga que no tiene ninguna nota aún
    if (hasNoGrades) {
        return <p>Aún no tienes calificaciones registradas.</p>;
    }

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

    return (
        <div>
            {isLoading ? 
                <Spinner /> :
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
                                <SortButton onClick={()=> handleSort('title')}>
                                    Título {queryParams.sortOrder === 'asc' ? "↓" : "↑"}
                                </SortButton>
                            </SortContainer>
                            <ClearFiltersButton onClick={clearFilters}>Limpiar filtros</ClearFiltersButton>
                        </ControlsGroup>     
                    </FiltersContainer>
                    <GridContainer>
                        {enrollments
                            .filter(enrollment => {
                                if (location.pathname.includes('/student/my-grades')) {
                                    // some() para que comprobar si existe al menos una nota en algún curso
                                    return enrollment.student?.profile?.receivedGrades?.some( 
                                        g => g.course.toString() === enrollment.course.id.toString()
                                    );
                                }
                                return true; // si existe, return true y mapea ese filtro
                            })
                            .map(enrollment => (
                                <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
                            ))
                        }
                    </GridContainer>
                    {/* Paginación */}
                    <PaginationContainer>
                        <PerPageSelector>
                            {location.pathname.includes('my-enrollments') 
                                ? 'Suscripciones por página:'
                                : 'Calificaciones por página:'
                            } 
                            <PerPageNumber onClick={()=>handleChangePerPage(3)}>3</PerPageNumber> - 
                            <PerPageNumber onClick={()=>handleChangePerPage(6)}>6</PerPageNumber>
                        </PerPageSelector>
                        <div style={{gap: '20px'}}>
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
        isLoading: state.enrollments.isLoading,
        pagination: state.enrollments.pagination,
        queryParams: state.enrollments.queryParams
    }
};

export default connect(mapStateToProps, { setEnrollmentQueries })(EnrollmentsCardsView);