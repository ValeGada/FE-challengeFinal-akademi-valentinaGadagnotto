import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, editUser, deleteUser } from "../../store/actions/usersActions";
import UserForm from "../../components/forms/UserForm";
import Modal from "../../UI/Modal";
import Spinner from "../../UI/Spinner";
import { CourseCardButton } from "../../styles";

const UserProfile = ({ user, userProfile, isLoading, getUser, editUser, deleteUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getUser(user.id);
    }, [user, user.id, getUser]);

    const handleUpdateUser = (userProfile) => {
        editUser(user.id, userProfile);
        setIsEditing(false);
        getUser(user.id);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        getUser(user.id);
    }

    const handleSelfDelete = () => {
        setIsModalOpen(true);
    }

    const confirmDelete = () => {
        deleteUser(user.id);
        setIsModalOpen(false);
        navigate('/login');
    }

    return (
        <>
            <h2>Perfil de Usuario</h2>
            {isLoading ?
                <Spinner /> :         
                <>     
                    <UserForm 
                        formUser={userProfile} 
                        isEditable={isEditing}
                        onSubmit={handleUpdateUser}
                        onCancel={handleCancelEdit}
                        showEditButtons={isEditing}
                    />
                    
                    {!isEditing && (
                        <>
                            <CourseCardButton onClick={() => setIsEditing(true)}>Editar</CourseCardButton>
                            <CourseCardButton onClick={handleSelfDelete}>Eliminar</CourseCardButton>
                        </>
                    )}
                </>  
            }
            <Modal isOpen={isModalOpen}>
                <h2>{user.name}, ¿seguro que deseas eliminar tu cuenta?</h2>
                <br />
                <button className="ui button negative" onClick={confirmDelete} style={{justifySelf: 'center'}}>Confirmar</button>
                <button className="ui button" onClick={() => setIsModalOpen(false)} style={{justifySelf: 'center'}}>Cancelar</button>
            </Modal>
        </>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user,
    userProfile: state.users.selected,
    isLoading: state.users.isLoading
});

export default connect(mapStateToProps, { getUser, editUser, deleteUser })(UserProfile);