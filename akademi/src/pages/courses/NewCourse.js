import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createCourse } from "../../store/actions/coursesActions";
import CourseForm from "../../components/forms/CourseForm";
import { CourseListTitle } from "../../styles";

const NewCourse = ({ user, createCourse }) => {
    const navigate = useNavigate();

    const handleCreateCourse = (course) => {
        createCourse(course);

        if (user.role === 'professor') {
            navigate('/prof/my-courses');
        } else if (user.role === 'superadmin') {
            navigate('/admin/courses');
        }
    };

    const handleCancel = () => {
        if (user.role === 'professor') {
            navigate('/prof/dashboard');
        } else if (user.role === 'superadmin') {
            navigate('/admin/dashboard');
        }
    };

    return (
        <div>
            <CourseListTitle>Crear Nuevo Curso</CourseListTitle>
            <CourseForm
                userRole={user.role}
                userName={user.name}
                isEditable={true}
                showCreateButtons={true}
                onSubmit={handleCreateCourse}
                onCancel={handleCancel}
            />
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, { createCourse })(NewCourse);