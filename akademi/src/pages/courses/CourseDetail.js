import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourse, editCourse, deleteCourse } from "../../store/actions/coursesActions";
import CourseForm from "../Courses/CourseForm";
import Spinner from "../../UI/Spinner";
import Modal from "../../UI/Modal";
import { CourseCardButton } from "../../styles";

const CourseDetail = ({ user, course, isLoading, getCourse, editCourse, deleteCourse }) => {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const isStudent = user.role === 'student';
    const isEnrolled = user.enrollments?.includes(course?.id);

    useEffect(() => {
        if (!course || course.id !== id) {
            getCourse(id);
        }
    }, [id, course, getCourse]);

    const handleUpdateCourse = (updatedCourse) => {
        editCourse(course.id, updatedCourse);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        getCourse(course);
    }

    const handleEnroll = (course) => {
        enroll(course.id);
        navigate('/student/catalog');
    }

    const handleUnenroll = (course) => {
        cancelEnroll(course.id);
        navigate('/student/my-enrollments');
    }

    const handleDeleteCourse = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    }

    const confirmDelete = () => {
        deleteCourse(selectedCourse.id);
        setIsModalOpen(false);
    }

    return (
        <div>
            <h2>Detalle del Curso</h2>
            {isLoading ?
                <Spinner /> :         
                <>     
                    <CourseForm 
                        course={course} 
                        isEditable={isEditing}
                        onSubmit={handleUpdateCourse}
                        onCancel={handleCancelEdit}
                        showEditButtons={isEditing}
                        showEnrollButton={isStudent}
                        isEnrolled={isEnrolled}
                        onEnroll={handleEnroll}
                        onUnenroll={handleUnenroll} 
                    />
                    
                    {!isEditing && !isStudent && (
                        <>
                        <CourseCardButton onClick={() => setIsEditing(true)}>Editar</CourseCardButton>
                        <CourseCardButton onClick={handleDeleteCourse(course)}>Eliminar</CourseCardButton>
                        </>
                    )}
                </>  
            }
            <Modal isOpen={isModalOpen}>
                <h2>¿Seguro que deseas eliminar este curso?</h2>
                <h3 style={{textAlign: 'center'}}>{selectedCourse?.title}</h3>
                <br />
                <button onClick={confirmDelete} style={{justifySelf: 'center'}}>Eliminar</button>
                <button onClick={() => setIsModalOpen(false)} style={{justifySelf: 'center'}}>Cancelar</button>
            </Modal>
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user,
    course: state.course.selected,
    isLoading: state.course.isLoading
});

export default connect(mapStateToProps, { getCourse, editCourse, deleteCourse })(CourseDetail);