import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { deleteCourse, setCourseQueries } from "../../store/actions/coursesActions";
import { 
    Table, 
    Td, 
    Th, 
    Actions, 
    GenericButton,
    FiltersContainer,
    ControlsGroup,
    SearchInput,
    SortButton,
    SortContainer,
    ClearFiltersButton,
    PaginationContainer,
    PerPageSelector,
    PerPageNumber,
    PageButton,
    GenericButtonsContainer
} from "../../styles";
import Modal from "../../UI/Modal";
import Spinner from "../../UI/Spinner";

const CourseTableView = ({ 
    user, 
    courses, 
    deleteCourse, 
    isLoading, 
    setCourseQueries, 
    pagination, 
    queryParams 
}) => {
    const navigate = useNavigate();

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleDeleteCourse = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        deleteCourse(selectedCourse.id);
        setIsModalOpen(false);
    };

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
            
            {isLoading ? 
                <Spinner /> :
                <>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Título</Th>
                                <Th>Descripción</Th>
                                {user.role === 'superadmin' && <Th>Profesor</Th>}
                                <Th>Capacidad</Th>
                                <Th>Suscripciones</Th>
                                {/* <Th>Duración</Th> */}
                                <Th>Acciones</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(course => (
                                <tr key={course._id}>
                                    <Td>{course.title}</Td>
                                    <Td>{course.description}</Td>
                                    {user.role === 'superadmin' &&
                                        <Td>{course.professor?.name}</Td>
                                    }
                                    <Td>{course.maximumCapacity}</Td>
                                    <Td>{course.enrollmentsCount ?? 0}</Td>
                                    {/* <Td>{course.duration} hs</Td> */}
                                    <Actions>
                                        {user.role === 'professor' ? 
                                            <>  
                                                <GenericButton onClick={() => navigate(`/prof/enrollments/course/${course.id}`)}>
                                                    Ver inscriptos 👁️
                                                </GenericButton>
                                                <GenericButton onClick={() => navigate(`/prof/grades/course/${course.id}`)}>
                                                    Calificaciones 💯
                                                </GenericButton>
                                                <GenericButton onClick={() => navigate(`/prof/courses/${course.id}`)}>
                                                    Editar ✏️
                                                </GenericButton>
                                                <GenericButton onClick={() => handleDeleteCourse(course)}>
                                                    Eliminar 🗑️
                                                </GenericButton>
                                            </>
                                        :
                                            <>
                                                <GenericButton onClick={() => navigate(`/admin/enrollments/course/${course.id}`)}>
                                                    Ver inscriptos 👁️
                                                </GenericButton>
                                                <GenericButton onClick={() => navigate(`/admin/grades/course/${course.id}`)}>
                                                    Calificaciones 💯
                                                </GenericButton>
                                                <GenericButton onClick={() => navigate(`/admin/courses/${course.id}`)}>
                                                    Editar ✏️
                                                </GenericButton>
                                                <GenericButton onClick={() => handleDeleteCourse(course)}>
                                                    Eliminar 🗑️
                                                </GenericButton>
                                            </>
                                        }
                                    </Actions>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {/* Paginación */}
                    <PaginationContainer>
                        <PerPageSelector>
                            Cursos por página: 
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
            <Modal isOpen={isModalOpen}>
                <h2>¿Seguro que deseas eliminar este curso?</h2>
                <h3 style={{textAlign: 'center'}}>{selectedCourse?.title}</h3>
                <br />
                <GenericButtonsContainer>
                    <GenericButton onClick={confirmDelete} style={{justifySelf: 'center'}}>Eliminar</GenericButton>
                    <GenericButton onClick={() => setIsModalOpen(false)} style={{justifySelf: 'center'}}>Cancelar</GenericButton>
                </GenericButtonsContainer>
            </Modal>
        </>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isLoading: state.courses.isLoading,
        queryParams: state.courses.queryParams,
        pagination: state.courses.pagination
    }
}

export default connect(mapStateToProps, { deleteCourse, setCourseQueries })(CourseTableView);