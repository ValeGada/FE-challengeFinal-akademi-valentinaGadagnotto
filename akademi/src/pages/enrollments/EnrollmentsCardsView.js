import React from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setEnrollmentQueries } from "../../store/actions/enrollmentsActions";
import Spinner from "../../UI/Spinner";
import EnrollmentCard from "../../components/cards/EnrollmentCard";
import { CourseGridContainer } from "../../styles";

const EnrollmentsCardsView = ({ isLoading, enrollments, setEnrollmentQueries, pagination, queryParams }) => {
    const location = useLocation();

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
                    <div>
                        <div>
                            <input 
                                type='text' 
                                placeholder='Buscar...'
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
                        {enrollments?.map(enrollment => (
                            <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
                        ))}
                    </CourseGridContainer>
                    {/* Paginación */}
                    <div>
                        {location.pathname.includes('my-enrollments') 
                            ? 'Suscrpciones por página:'
                            : 'Calificaciones por página:'
                        } 
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
        isLoading: state.enrollments.isLoading,
        pagination: state.enrollments.pagination,
        queryParams: state.enrollments.queryParams
    }
};

export default connect(mapStateToProps, { setEnrollmentQueries })(EnrollmentsCardsView);