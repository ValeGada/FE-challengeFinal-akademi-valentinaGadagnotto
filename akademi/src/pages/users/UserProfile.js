import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, editUser, deleteUser } from "../../store/actions/usersActions";
import UserForm from "../../components/forms/UserForm";
import Modal from "../../UI/Modal";
import Spinner from "../../UI/Spinner";
import { GenericTitle, GenericButton, GenericButtonsContainer } from "../../styles";

const UserProfile = ({ user, userProfile, isLoading, getUser, editUser, deleteUser }) => {
    const { id: paramId } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const userIdToView = paramId || user.id;
    const isOwnProfile = String(userIdToView) === String(user.id); 
    // el user.id puede no ser String, rompe el comparador
    const isSuperadmin = user.role === 'superadmin';
    const canEditOrDelete = isOwnProfile || isSuperadmin;


    useEffect(() => {
        getUser(userIdToView);
    }, [userIdToView, getUser]);

    const handleUpdateUser = (userProfile) => {
        editUser(userIdToView, userProfile);
        setIsEditing(false);
        getUser(userIdToView);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        getUser(userIdToView);
    };

    const handleSelfDelete = () => {
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        deleteUser(userIdToView);
        setIsModalOpen(false);

        if (isOwnProfile) {
            navigate('/login');
        } else {
            navigate('/admin/users');
        }
    };

    return (
        <>
            <GenericTitle>Perfil de Usuario</GenericTitle>
            {isLoading || !userProfile ?
                <Spinner /> :         
                <>     
                    <UserForm 
                        formUser={userProfile} 
                        isEditable={isEditing}
                        onSubmit={handleUpdateUser}
                        onCancel={handleCancelEdit}
                        showEditButtons={isEditing}
                    />
                    
                    {canEditOrDelete && !isEditing && (
                        <GenericButtonsContainer>
                            <GenericButton onClick={() => setIsEditing(true)}>Editar</GenericButton>
                            <GenericButton onClick={handleSelfDelete}>Eliminar</GenericButton>
                        </GenericButtonsContainer>
                    )}
                </>  
            }
            <Modal isOpen={isModalOpen}>
                <h2>
                    {isOwnProfile
                        ? `${user.name}, ¿seguro que deseas eliminar tu cuenta?`
                        : `¿Seguro que deseas eliminar al usuario "${userProfile.name}"?`}
                </h2>
                <br />
                <GenericButtonsContainer>
                    <GenericButton onClick={confirmDelete}>Confirmar</GenericButton>
                    <GenericButton onClick={() => setIsModalOpen(false)}>Cancelar</GenericButton>
                </GenericButtonsContainer>
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