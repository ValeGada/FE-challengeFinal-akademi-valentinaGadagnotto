import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getCoursesByProfId } from "../../store/actions/coursesActions";
import { editGrade, postGrade, setGradeQueries } from "../../store/actions/gradesActions";
import { CoursesTable, CoursesTd, CoursesTh, CourseListTitle } from "../../styles";
import Spinner from "../../UI/Spinner";
import GradeScoreInput from "../../components/forms/GradeScoreInput";

const GradesList = ({ 
    user, 
    grades, 
    courses, 
    editGrade, 
    postGrade, 
    getCoursesByProfId, 
    isLoading,
    setGradeQueries,
    queryParams,
    pagination
}) => {   
    useEffect(() => {
        getCoursesByProfId(user.id, queryParams);
    }, [user, grades, getCoursesByProfId, queryParams]);

    const handleSearchChange = (e) => {
        setGradeQueries({ search: e.target.value, page: 1 });
    };

    const handleSort = (field) => {
        const newOrder = queryParams.sortOrder === "asc" ? "desc" : "asc";
        setGradeQueries({ sortBy: field, sortOrder: newOrder });
    };

    const handleChangePage = (page) => {
        setGradeQueries({ page });
    };

    const handleChangePerPage = (limit) => {
        setGradeQueries({ limit, page: 1 });
    };

    const clearFilters = () => {
        setGradeQueries({
            search: "",
            sortBy: "name",
            sortOrder: "asc",
            page: 1,
            limit: 10,
            role: ""
        });
    };

    return (
        <div>
            <CourseListTitle>Calificaciones</CourseListTitle>
            {isLoading 
                ? <Spinner /> 
                : <>
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
                                <button onClick={()=> handleSort('name')}>
                                    Nombre {queryParams.sortOrder === 'asc' ? "↓" : "↑"}
                                </button>
                                <button onClick={()=> handleSort('grade')}>
                                    Nota {queryParams.sortOrder === 'asc' ? "↓" : "↑"}
                                </button>
                            </div>
                            <button onClick={clearFilters}>Limpiar filtros</button>
                        </div>     
                    </div>
                    <CoursesTable>
                        <thead>
                            <tr>
                                <CoursesTh rowSpan={2}>Curso</CoursesTh>
                                <CoursesTh colSpan={2} rowSpan={1}>Estudiante</CoursesTh>
                                <CoursesTh rowSpan={2}>Nota</CoursesTh>
                            </tr>
                            <tr>
                                <CoursesTh>Nombre</CoursesTh>
                                <CoursesTh>Email</CoursesTh>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(course => {
                                // Si no hay enrollments, mostramos algo vacío o mensaje
                                if (!course.enrollments || course.enrollments.length === 0) {
                                    return (
                                        <tr key={course.id}>
                                            <CoursesTd colSpan="4">No hay estudiantes inscriptos.</CoursesTd>
                                        </tr>
                                    );
                                }

                                return course.enrollments.map((enroll, index) => (
                                    <tr key={`${course.id}-enroll-${index}`}>
                                        {index === 0 ? (
                                            <CoursesTd rowSpan={course.enrollments.length}>{course.title}</CoursesTd>
                                        ) : null}
                                        <CoursesTd>{enroll.student.name}</CoursesTd>
                                        <CoursesTd>{enroll.student.email}</CoursesTd>
                                        <CoursesTd>
                                            <GradeScoreInput
                                                enroll={enroll}
                                                canEditGrades={true}
                                                editGrade={editGrade}
                                                postGrade={postGrade}
                                            />
                                        </CoursesTd>
                                    </tr>
                                ));
                            })}
                        </tbody>
                    </CoursesTable>
                    {/* Paginación */}
                    <div>
                        Calificaciones por página: 
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
        user: state.auth.user,
        isLoading: state.grades.isLoading,
        courses: state.courses.all,
        grades: state.grades.all,
        queryParams: state.courses.queryParams,
        pagination: state.grades.pagination
    }
}

export default connect(mapStateToProps, { getCoursesByProfId, editGrade, postGrade, setGradeQueries })(GradesList);