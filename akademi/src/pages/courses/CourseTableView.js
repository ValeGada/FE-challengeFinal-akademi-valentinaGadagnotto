import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { deleteCourse } from "../../store/actions/coursesActions";
import { CoursesTable, CoursesTd, CoursesTh, CoursesActions } from "../../styles";
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
                            <CoursesTh>Desciprción</CoursesTh>
                            <CoursesTh>Profesor</CoursesTh>
                            <CoursesTh>Capacidad</CoursesTh>
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
                                {/* <CoursesTd>{course.duration} hs</CoursesTd> */}
                                <CoursesActions>
                                    <button onClick={() => navigate(`/course/${course.id}`)}>👁/✏️ Ver/Editar</button>
                                    <button onClick={() => handleDeleteCourse(course)}>🗑 Eliminar</button>
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