import React from "react";
import { connect } from "react-redux";
import { setCourseQueries } from "../../store/actions/coursesActions";
import Spinner from "../../UI/Spinner";
import CourseCard from "../../components/cards/CourseCard";
import { CourseGridContainer } from "../../styles";

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
                    <div>
                        <div>
                            <input 
                                type='text' 
                                placeholder='Buscar curso...'
                                value={queryParams.search}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div>
                            <div>
                                Ordenar por:
                                <button onClick={()=> handleSort('title')}>
                                    Título {queryParams.sortOrder === 'asc' ? "↓" : "↑"}
                                </button>
                            </div>
                            <button onClick={clearFilters}>Limpiar filtros</button>
                        </div>     
                    </div>
                    <CourseGridContainer>
                        {courses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </CourseGridContainer>
                    {/* Paginación */}
                    <div>
                        Cursos por página: 
                        <span onClick={()=>handleChangePerPage(5)}>5</span> - 
                        <span onClick={()=>handleChangePerPage(10)}>10</span>
                    </div>
                    <div>
                        {pagination.totalPages > 0 && 
                            Array.from({ length: pagination.totalPages }, (_, i) => (
                                <button 
                                    key={i}
                                    onClick={() => handleChangePage(i + 1)}
                                    style={pagination.currentPage === i + 1 ? { background: '#555555', color: '#f1f1f1' } : {}}
                                >
                                    {i + 1}
                                </button>                   
                            ))}
                    </div>
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