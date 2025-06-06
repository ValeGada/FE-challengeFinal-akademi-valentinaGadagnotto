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
    ClearFiltersButton,
    PaginationContainer,
    PerPageSelector,
    PerPageNumber,
    PageButton,
    WelcomeText
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
        return <WelcomeText>Aún no tienes calificaciones registradas.</WelcomeText>;
    }

    // Filtros
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

    const filteredEnrollments = enrollments.filter(enrollment => {
        if (location.pathname.includes('/student/my-grades')) {
            return enrollment.student?.profile?.receivedGrades?.some(
                g => g.course.toString() === enrollment.course.id.toString()
            );
        }
        return true;
    });

    return (
        <div>
            <FiltersContainer>
                <div>
                    <SearchInput 
                        type='text' 
                        placeholder='Buscar curso...'
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
                    {filteredEnrollments.length === 0 && (
                        <WelcomeText>No se encontraron suscripciones activas.</WelcomeText>
                    )}

                    <GridContainer>
                        {filteredEnrollments.map(enrollment => (
                            <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
                        ))}
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
        isLoading: state.enrollments.isLoading,
        pagination: state.enrollments.pagination,
        queryParams: state.enrollments.queryParams
    }
};

export default connect(mapStateToProps, { setEnrollmentQueries })(EnrollmentsCardsView);