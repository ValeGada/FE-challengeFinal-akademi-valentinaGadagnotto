import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { handleInputChange, handleSelectChange } from "../../utils/handlers";
import { validateUserForm } from "../../utils/validators";
import { Error, GenericButton, FormGroup, Input, Label, Select } from "../../styles";

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
            <FormGroup>
                <Label>Nombre:</Label>
                <Input 
                    type="text" 
                    placeholder="Nombre" 
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    readOnly={!isEditable}
                />
                {errors.name && <Error>{errors.name}</Error>}
            </FormGroup>
            <FormGroup>
                <Label>Email:</Label>
                <Input 
                    type="text" 
                    placeholder="Email" 
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    readOnly={!isEditable}
                />
                {errors.email && <Error>{errors.email}</Error>}
            </FormGroup>
            {userRole === 'superadmin' && isEditable
                ? <FormGroup>
                    <Label>Contraseña:</Label>
                    <Input 
                        type="password" 
                        placeholder="Contraseña" 
                        name="password"
                        value={formData.password || ''}
                        onChange={handleChange}
                        readOnly={!isEditable}
                    />
                    {errors.password && <Error>{errors.password}</Error>}
                </FormGroup>
                : null
            }
            {userRole === 'superadmin' && 
            <FormGroup>
                <Label>Rol:</Label>
                <Select
                    type="text" 
                    placeholder="Rol" 
                    name="role"
                    value={formData.role || ''}
                    onChange={handleRole}
                    readOnly={!isEditable}
                >
                    <option value='superadmin'>Superadmin</option>
                    <option value='professor'>Professor</option>
                </Select>
                
                {errors.name && <Error>{errors.name}</Error>}
            </FormGroup>}
            <div>
                {showEditButtons && isEditable && (
                    <>
                        <GenericButton type="submit">Confirmar</GenericButton>
                        <GenericButton type="button" onClick={onCancel}>Cancelar</GenericButton>
                    </>
                )}

                {showCreateButtons && isEditable && (
                    <>
                        <GenericButton type="submit">Crear</GenericButton>
                        <GenericButton type="button" onClick={onCancel}>Cancelar</GenericButton>
                    </>
                )}
            </div>
        </form>
    )
};

export default UserForm;