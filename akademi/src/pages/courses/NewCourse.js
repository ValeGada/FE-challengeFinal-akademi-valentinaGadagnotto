import React from "react";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { createCourse } from "../../store/actions/coursesActions";
import { setMessage } from "../../store/actions/messagesAction";
import CourseForm from "../../components/forms/CourseForm";

const NewCourse = ({ user, createCourse, setMessage }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCreateCourse = async (course) => {
        try {
            await createCourse(course);
            if (user.role === 'professor') {
                navigate('/prof/my-courses');
            } else if (user.role === 'superadmin') {
                navigate('/admin/courses');
            }
        } catch (error) {
            dispatch(setMessage('No se pudo crear el curso.'));
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
            <h2>Crear Nuevo Curso</h2>
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

export default connect(mapStateToProps, { createCourse, setMessage })(NewCourse);