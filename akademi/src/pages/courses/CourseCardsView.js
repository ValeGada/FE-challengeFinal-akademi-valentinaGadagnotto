import React from "react";
import { connect } from "react-redux";
import { setCourseQueries } from "../../store/actions/coursesActions";
import Spinner from "../../UI/Spinner";
import CourseCard from "../../components/cards/CourseCard";
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

const CoursesCardsView = ({ isLoading, courses, setCourseQueries, pagination, queryParams }) => {
    // Filtros
    const handleSearchChange = (e) => {
        setCourseQueries({ search: e.target.value, page: 1 });
    };

    const handleSort = (field) => {
        const newOrder = queryParams.sortOrder === "asc" ? "desc" : "asc";
        setCourseQueries({ sortBy: field, sortOrder: newOrder });
    };

    const handleChangePage = (page) => {
        setCourseQueries({ page });
    };

    const handleChangePerPage = (limit) => {
        setCourseQueries({ limit, page: 1 });
    };

    const clearFilters = () => {
        setCourseQueries({
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
                                placeholder='Buscar curso...'
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
                        {courses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </GridContainer>
                    {/* Paginación */}
                    <PaginationContainer>
                        <PerPageSelector>
                            Cursos por página: 
                            <PerPageNumber onClick={()=>handleChangePerPage(3)}>3</PerPageNumber> - 
                            <PerPageNumber onClick={()=>handleChangePerPage(6)}>6</PerPageNumber>
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
        isLoading: state.courses.isLoading,
        queryParams: state.courses.queryParams,
        pagination: state.courses.pagination
    }
};

export default connect(mapStateToProps, { setCourseQueries })(CoursesCardsView);