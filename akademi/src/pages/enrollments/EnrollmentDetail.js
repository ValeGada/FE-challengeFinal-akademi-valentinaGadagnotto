import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { enroll, cancelEnrollment } from "../../store/actions/enrollmentsActions";
import CourseForm from "../../components/forms/CourseForm";
import Spinner from "../../UI/Spinner";
import { GenericButton } from "../../styles";

const EnrollmentDetail = ({ user, course, isLoading, getCourse, editCourse, enroll, cancelEnrollment }) => {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

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
        getCourse(course.id);
    }

    const handleEnroll = () => {
        enroll(course.id);
        navigate('/student/catalog');
    }

    const handleUnenroll = () => {
        cancelEnrollment(course.id);
        navigate('/student/my-enrollments');
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
                        <GenericButton onClick={() => setIsEditing(true)}>Editar</GenericButton>
                        <GenericButton onClick={() => navigate('/prof/my-courses')}>Cancelar</GenericButton>
                        </>
                    )}
                </>  
            }
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user,
    enrollment: state.enrollments.selected,
    isLoading: state.enrollments.isLoading
});

export default connect(mapStateToProps, { 
    getCourse, 
    editCourse,
    enroll, 
    cancelEnrollment 
})(EnrollmentDetail);