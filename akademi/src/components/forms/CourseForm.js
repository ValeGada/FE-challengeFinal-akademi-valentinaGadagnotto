import { useState, useEffect } from 'react';
import { validateCourseForm } from '../../util/form/validators';
import { handleInputChange } from '../../util/form/handlers';
import { Error, StyledForm, StyledLabel, StyledInput, StyledTextarea, StyledErrorDiv, StyledSelect, StyledImgInput, ButtonsDiv, ConfirmButton, CancelButton } from '../../styles';

const CourseForm = ({ 
    course, 
    onSubmit, 
    isEditable, 
    onCancel,
    showEditButtons,
    showEnrollButton,
    isEnrolled,
    onEnroll,
    onUnenroll
}) => {
    const [formData, setFormData] = useState(course || {});
    const [errors, setErrors] = useState({});
    const editableFields = ['title', 'description', 'maximumCapacity'];

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
        setFormData(extractEditableFields(course || {}));
    }, [course]);

    // Manejar cambios en los campos del formulario
    const handleChange = handleInputChange(formData, setFormData);

    // Validación del formulario
    const validate = () => {
        const newErrors = validateCourseForm(formData);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Si pasa la validación, return true
    };

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit} noValidate>
            <div>
            <StyledLabel>Título:</StyledLabel>
            <br />
            <StyledInput
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                readOnly={!isEditable}
            />
            <Error>{errors.title}</Error>
            </div>
            <div>
            <StyledLabel>Descripción:</StyledLabel>
            <br />
            <StyledTextarea
                type="text"
                name="description"
                min={5}
                value={formData.description || ''}
                onChange={handleChange}
                readOnly={!isEditable}
                rows={3}
            />
            <Error>{errors.description}</Error>
            </div>
            <div>
            <StyledLabel>Capacidad:</StyledLabel>
            <br />
            <StyledInput
                type="number"
                name="capacity"
                min={0}
                value={formData.capacity || ''}
                onChange={handleChange}
                readOnly={!isEditable}
            />
            <Error>{errors.capacity}</Error>
            </div>
            <div>
            <StyledLabel>Profesor:</StyledLabel>
            <br />
            <StyledImgInput
                type="text"
                name="professor"
                value={formData.professor || ''}
                onChange={handleChange}
                readOnly={!isEditable}
            />
            <Error>{errors.professor}</Error>
            </div>
            <br />
            <ButtonsDiv>
                {showEditButtons && isEditable && (
                    <>
                        <ConfirmButton type="submit">Confirmar</ConfirmButton>
                        <CancelButton type="button" onClick={onCancel}>Cancelar</CancelButton>
                    </>
                )}

                {showEnrollButton && (
                    isEnrolled ? (
                        <CancelButton type="button" onClick={onUnenroll}>Cancelar suscripción</CancelButton>
                    ) : (
                        <ConfirmButton type="button" onClick={onEnroll}>Suscribirse</ConfirmButton>
                    )
                )}
            </ButtonsDiv>
        </StyledForm>
    );
};

export default CourseForm;