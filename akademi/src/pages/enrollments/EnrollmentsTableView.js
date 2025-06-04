import React from "react";
import { connect } from "react-redux";
import { setEnrollmentQueries } from "../../store/actions/enrollmentsActions";
import { postGrade, editGrade } from "../../store/actions/gradesActions";
import { CoursesTable, CoursesTd, CoursesTh, ProfessorSidebarLink } from "../../styles";
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
                        <button onClick={()=> handleSort('student.name')}>
                            Nombre {queryParams.sortOrder === 'asc' ? "↓" : "↑"}
                        </button>
                    </div>
                    <button onClick={clearFilters}>Limpiar filtros</button>
                </div>     
            </div>
            <CoursesTable>
                <thead>
                    <tr>
                        {user.role === 'superadmin' &&
                            <>
                                <CoursesTh rowSpan={2}>Curso</CoursesTh>
                                <CoursesTh rowSpan={2}>Profesor</CoursesTh>
                            </>
                        }
                        <CoursesTh colSpan={2} rowSpan={1}>Estudiante</CoursesTh>
                        <CoursesTh rowSpan={2}>Nota</CoursesTh>
                    </tr>
                    <tr>
                        <CoursesTh>Nombre</CoursesTh>
                        <CoursesTh>Email</CoursesTh>
                    </tr>
                </thead>
                <tbody>
                    {enrollments?.map(enroll => (
                        <tr key={enroll.id}>
                            {user.role === 'superadmin' &&
                                <>
                                    <CoursesTd>{enroll.course.title}</CoursesTd>
                                    <CoursesTd>{enroll.course?.professor?.name}</CoursesTd>
                                </>
                            }
                            <CoursesTd>
                                <ProfessorSidebarLink to={`${prefix}/grades/student/${enroll.student.id}`}>
                                    {enroll.student?.name}
                                </ProfessorSidebarLink>
                            </CoursesTd>
                            <CoursesTd>{enroll.student?.email}</CoursesTd>
                            <CoursesTd>
                                <GradeScoreInput
                                    enroll={enroll}
                                    canEditGrades={canEditGrades}
                                    editGrade={editGrade}
                                    postGrade={postGrade}
                                />
                            </CoursesTd>
                        </tr>
                    ))}
                </tbody>
            </CoursesTable>
            {/* Paginación */}
            <div>
                Suscripciones por página: 
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