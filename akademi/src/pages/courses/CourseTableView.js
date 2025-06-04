import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { deleteCourse, setCourseQueries } from "../../store/actions/coursesActions";
import { CoursesTable, CoursesTd, CoursesTh, CoursesActions, GenericButton } from "../../styles";
import Modal from "../../UI/Modal";
import Spinner from "../../UI/Spinner";

const CourseTableView = ({ user, courses, deleteCourse, isLoading, setCourseQueries, pagination, queryParams }) => {
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
            limit: 10,
            role: ""
        });
    };
    
    return (
        <>
            {isLoading ? 
                <Spinner /> :
                <>
                    <div>
                        <div className='item'>
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
                                <button onClick={()=> handleSort('name')}>
                                    Título {queryParams.sortOrder === 'asc' ? "↓" : "↑"}
                                </button>
                            </div>
                            <button onClick={clearFilters}>Limpiar filtros</button>
                        </div>     
                    </div>
                    <CoursesTable>
                        <thead>
                            <tr>
                                <CoursesTh>Título</CoursesTh>
                                <CoursesTh>Descripción</CoursesTh>
                                {user.role === 'superadmin' && <CoursesTh>Profesor</CoursesTh>}
                                <CoursesTh>Capacidad</CoursesTh>
                                <CoursesTh>Suscripciones</CoursesTh>
                                {/* <CoursesTh>Duración</CoursesTh> */}
                                <CoursesTh>Acciones</CoursesTh>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(course => (
                                <tr key={course._id}>
                                    <CoursesTd>{course.title}</CoursesTd>
                                    <CoursesTd>{course.description}</CoursesTd>
                                    {user.role === 'superadmin' &&
                                        <CoursesTd>{course.professor?.name}</CoursesTd>
                                    }
                                    <CoursesTd>{course.maximumCapacity}</CoursesTd>
                                    <CoursesTd>{course.enrollmentsCount ?? 0}</CoursesTd>
                                    {/* <CoursesTd>{course.duration} hs</CoursesTd> */}
                                    <CoursesActions>
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
                                    </CoursesActions>
                                </tr>
                            ))}
                        </tbody>
                    </CoursesTable>
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
            <Modal isOpen={isModalOpen}>
                <h2>¿Seguro que deseas eliminar este curso?</h2>
                <h3 style={{textAlign: 'center'}}>{selectedCourse?.title}</h3>
                <br />
                <button onClick={confirmDelete} style={{justifySelf: 'center'}}>Eliminar</button>
                <button onClick={() => setIsModalOpen(false)} style={{justifySelf: 'center'}}>Cancelar</button>
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