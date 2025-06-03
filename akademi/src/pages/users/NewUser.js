import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createUser } from "../../store/actions/usersActions";
import UserForm from "../../components/forms/UserForm";

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
            <h2>Crear Nuevo Usuario</h2>
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