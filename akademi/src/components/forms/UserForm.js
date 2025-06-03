import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { handleInputChange, handleSelectChange } from "../../utils/handlers";
import { validateUserForm } from "../../utils/validators";
import { Error, AdminLogoutButton } from "../../styles";

const UserForm = ({ 
    formUser,
    onSubmit, 
    userRole,
    isEditable, 
    showCreateButtons, 
    showEditButtons,
    onCancel
}) => {
    const [formData, setFormData] = useState(formUser || {});
    const [errors, setErrors] = useState({});
    const location = useLocation();
    const editableFields = ['name', 'email', 'password', 'role'];

    const extractEditableFields = (data) => {
        const clean = {};
        editableFields.forEach(field => {
            if (data[field] !== undefined) {
            clean[field] = data[field]
            };
        });
        return clean;
    };

    useEffect(() => {
        setFormData(extractEditableFields(formUser || {}));
    }, [formUser]);

    // Manejar cambios en los campos del formulario
    const handleChange = handleInputChange(formData, setFormData);
    const handleRole = handleSelectChange('role', formData, setFormData);

    // Validación del formulario
    const shouldValidatePassword = location.pathname.includes('new-user');
    const validate = () => {
        const newErrors = validateUserForm(formData, shouldValidatePassword);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div>
                <label>Nombre:</label>
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    readOnly={!isEditable}
                />
                {errors.name && <Error>{errors.name}</Error>}
            </div>
            <div>
                <label>Email:</label>
                <input 
                    type="text" 
                    placeholder="Email" 
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    readOnly={!isEditable}
                />
                {errors.email && <Error>{errors.email}</Error>}
            </div>
            {userRole === 'superadmin' && isEditable
                ? <div>
                    <label>Contraseña:</label>
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        name="password"
                        value={formData.password || ''}
                        onChange={handleChange}
                        readOnly={!isEditable}
                    />
                    {errors.password && <Error>{errors.password}</Error>}
                </div>
                : null
            }
            {userRole === 'superadmin' && 
            <div>
                <label>Rol:</label>
                <select
                    type="text" 
                    placeholder="Rol" 
                    name="role"
                    value={formData.role || ''}
                    onChange={handleRole}
                    readOnly={!isEditable}
                >
                    <option value='superadmin'>Superadmin</option>
                    <option value='professor'>Professor</option>
                </select>
                
                {errors.name && <Error>{errors.name}</Error>}
            </div>}
            <div>
                {showEditButtons && isEditable && (
                    <>
                        <AdminLogoutButton type="submit">Confirmar</AdminLogoutButton>
                        <AdminLogoutButton type="button" onClick={onCancel}>Cancelar</AdminLogoutButton>
                    </>
                )}

                {showCreateButtons && isEditable && (
                    <>
                        <AdminLogoutButton type="submit">Crear</AdminLogoutButton>
                        <AdminLogoutButton type="button" onClick={onCancel}>Cancelar</AdminLogoutButton>
                    </>
                )}
            </div>
        </form>
    )
};

export default UserForm;