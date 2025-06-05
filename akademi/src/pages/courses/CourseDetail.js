import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getCourse, editCourse } from "../../store/actions/coursesActions";
import { enroll, cancelEnrollment, getEnrollments } from "../../store/actions/enrollmentsActions";
import CourseForm from "../../components/forms/CourseForm";
import Spinner from "../../UI/Spinner";
import Modal from "../../UI/Modal";
import { GenericButton, GenericTitle, GenericButtonsContainer } from "../../styles";

const CourseDetail = ({ 
    user, 
    course, 
    isLoading, 
    getCourse, 
    editCourse, 
    enroll, 
    cancelEnrollment,
    getEnrollments,
    enrollments
}) => {
    const { id: courseId } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [enrollmentToDelete, setEnrollmentToDelete] = useState(null);
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const isStudent = user.role === 'student';
    const isEnrolled = enrollments.some(e => e.course.id === courseId)

    useEffect(() => {
        console.log(user)
        if (!course || course.id !== courseId) {
            getCourse(courseId);
        }

        if (isStudent) {
            getEnrollments(user.id);
        }
    }, [courseId, user, course, isStudent, getCourse, getEnrollments]);

    const handleUpdateCourse = (updatedCourse) => {
        const { professor, ...cleanCourseUpdates } = updatedCourse;
        editCourse(course.id, cleanCourseUpdates);
        setIsEditing(false);
        getCourse(courseId);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        getCourse(course.id);
    }

    const handleEnroll = () => {
        enroll(course.id);
        navigate('/student/catalog');
    }

    const handleUnenroll = (course) => {
        const enrollmentFound = enrollments.find(e => e.course.id === courseId );
        if (enrollmentFound) {
            setEnrollmentToDelete(enrollmentFound.id);
            setSelectedCourse(course);
            setIsModalOpen(true);
        }
    }
    
    const handleUnenrollConfirmation = () => {
        if (enrollmentToDelete) {
            cancelEnrollment(enrollmentToDelete);
            setEnrollmentToDelete(null);
        }
        setIsModalOpen(false);
        navigate('/student/catalog');
    }

    const handleCancelNavigation = () => {
        if (user.role === 'professor') {
            navigate('/prof/my-courses')
        } else if (user.role === 'superadmin') {
            navigate('/admin/courses')
        }
    }

    return (
        <>
            <GenericTitle>Detalle del Curso</GenericTitle>
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
                        <GenericButtonsContainer>
                            <GenericButton onClick={() => setIsEditing(true)}>Editar</GenericButton>
                            <GenericButton onClick={handleCancelNavigation}>Cancelar</GenericButton>
                        </GenericButtonsContainer>
                        
                    )}
                </>  
            }
            <Modal isOpen={isModalOpen}>
                <h2>¿Seguro que deseas cancelar tu suscripción a este curso?</h2>
                <h3 style={{textAlign: 'center'}}>{selectedCourse?.title}</h3>
                <p style={{textAlign: 'center'}}>Prof. {selectedCourse?.professor?.name}</p>
                <br />
                <GenericButtonsContainer>
                    <GenericButton onClick={handleUnenrollConfirmation} style={{justifySelf: 'center'}}>Confirmar</GenericButton>
                    <GenericButton onClick={() => setIsModalOpen(false)} style={{justifySelf: 'center'}}>Cancelar</GenericButton>
                </GenericButtonsContainer>
            </Modal>
        </>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user,
    course: state.courses.selected,
    enrollments: state.enrollments.all,
    isLoading: state.courses.isLoading
});

export default connect(mapStateToProps, { 
    getCourse, 
    editCourse, 
    enroll, 
    cancelEnrollment, 
    getEnrollments 
})(CourseDetail);