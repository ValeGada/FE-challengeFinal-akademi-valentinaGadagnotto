import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createUser } from "../../store/actions/usersActions";
import UserForm from "../../components/forms/UserForm";
import { CourseListTitle } from "../../styles";

const NewUser = ({ user, createUser }) => {
    const navigate = useNavigate();

    const handleCreateUser = (formUser) => {
        createUser(formUser);
        navigate('/admin/users');
    };

    const handleCancel = () => {
        navigate('/admin/users');
    };

    return (
        <div>
            <CourseListTitle>Crear Nuevo Usuario</CourseListTitle>
            <UserForm
                userRole={user.role}
                isEditable={true}
                showCreateButtons={true}
                onSubmit={handleCreateUser}
                onCancel={handleCancel}
            />
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, { createUser })(NewUser);