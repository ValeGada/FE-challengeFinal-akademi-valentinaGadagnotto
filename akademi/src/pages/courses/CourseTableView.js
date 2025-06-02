import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { deleteCourse } from "../../store/actions/coursesActions";
import { CoursesTable, CoursesTd, CoursesTh, CoursesActions, ProfessorLogoutButton, AdminLogoutButton } from "../../styles";
import Modal from "../../UI/Modal";
import Spinner from "../../UI/Spinner";

const CourseTableView = ({ user, courses, deleteCourse, isLoading }) => {
    const navigate = useNavigate();

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleDeleteCourse = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    }

    const confirmDelete = () => {
        deleteCourse(selectedCourse.id);
        setIsModalOpen(false);
    }
    
    return (
        <>
            {isLoading ? 
                <Spinner /> :
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
                                            <ProfessorLogoutButton onClick={() => navigate(`/prof/courses/${course.id}`)}>
                                                Ver/Editar ✏️
                                            </ProfessorLogoutButton>
                                            <ProfessorLogoutButton onClick={() => handleDeleteCourse(course)}>
                                                Eliminar 🗑️
                                            </ProfessorLogoutButton>
                                        </>
                                    :
                                        <>
                                            <AdminLogoutButton onClick={() => navigate(`/admin/courses/${course.id}`)}>
                                                Ver/Editar ✏️
                                            </AdminLogoutButton>
                                            <AdminLogoutButton onClick={() => handleDeleteCourse(course)}>
                                                Eliminar 🗑️
                                            </AdminLogoutButton>
                                        </>
                                    }
                                </CoursesActions>
                            </tr>
                        ))}
                    </tbody>
                </CoursesTable>
            }
            <Modal isOpen={isModalOpen}>
                <h2>¿Seguro que deseas eliminar este curso?</h2>
                <h3 style={{textAlign: 'center'}}>{selectedCourse?.title}</h3>
                <br />
                <button className="ui button negative" onClick={confirmDelete} style={{justifySelf: 'center'}}>Eliminar</button>
                <button className="ui button" onClick={() => setIsModalOpen(false)} style={{justifySelf: 'center'}}>Cancelar</button>
            </Modal>
        </>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isLoading: state.courses.isLoading
    }
}

export default connect(mapStateToProps, { deleteCourse })(CourseTableView);