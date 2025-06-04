import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getCourse, editCourse } from "../../store/actions/coursesActions";
import { enroll, cancelEnrollment } from "../../store/actions/enrollmentsActions";
import CourseForm from "../../components/forms/CourseForm";
import Spinner from "../../UI/Spinner";
import { CourseCardButton, CourseListTitle } from "../../styles";

const CourseDetail = ({ user, course, isLoading, getCourse, editCourse, enroll, cancelEnrollment }) => {
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

    const handleUpdateCourse = async (updatedCourse) => {
        const { professor, ...cleanCourseUpdates } = updatedCourse;
        await editCourse(course.id, cleanCourseUpdates);
        setIsEditing(false);
        getCourse(course.id);
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

    const handleCancelNavigation = () => {
        if (user.role === 'professor') {
            navigate('/prof/my-courses')
        } else if (user.role === 'superadmin') {
            navigate('/admin/courses')
        }
    }

    return (
        <>
            <CourseListTitle>Detalle del Curso</CourseListTitle>
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
                        <CourseCardButton onClick={handleCancelNavigation}>Cancelar</CourseCardButton>
                        </>
                    )}
                </>  
            }
        </>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user,
    course: state.courses.selected,
    isLoading: state.courses.isLoading
});

export default connect(mapStateToProps, { getCourse, editCourse, enroll, cancelEnrollment })(CourseDetail);