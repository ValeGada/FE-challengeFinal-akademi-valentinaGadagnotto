import { useState, useEffect } from 'react';
import { validateCourseForm } from '../../utils/validators';
import { handleInputChange } from '../../utils/handlers';
import { Error, FormGroup, Label, Input, Textarea, GenericButton, GenericButtonsContainer } from '../../styles';

const extractEditableFields = (data, editableFields) => {
    const clean = {};
    editableFields.forEach(field => {
        if (data[field] !== undefined) {
        clean[field] = data[field]
        };
    });
    return clean;
};

const CourseForm = ({ 
    course,
    userRole,
    userName,
    onSubmit, 
    isEditable, 
    onCancel,
    showEditButtons,
    showCreateButtons,
    showEnrollButton,
    isEnrolled,
    onEnroll,
    onUnenroll
}) => {
    const [formData, setFormData] = useState(course || {});
    const [errors, setErrors] = useState({});
    const editableFields = ['title', 'description', 'maximumCapacity'];    

    useEffect(() => {
        const extracted = extractEditableFields(course || {}, editableFields);

        if (course?.professor) {
            extracted.professor = course.professor.name;
        }
  
        if (userRole === 'professor') {
            extracted.professor = userName;
        }
        
        setFormData(extracted);
    }, [course, userName, userRole]);

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
        <form onSubmit={handleSubmit} noValidate>
            <FormGroup>
                <Label>Título:</Label>
                <br />
                <Input
                    type="text"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleChange}
                    readOnly={!isEditable}
                />
                <Error>{errors.title}</Error>
            </FormGroup>
            <FormGroup>
                <Label>Descripción:</Label>
                <br />
                <Textarea
                    type="text"
                    name="description"
                    min={5}
                    value={formData.description || ''}
                    onChange={handleChange}
                    readOnly={!isEditable}
                    rows={3}
                />
                <Error>{errors.description}</Error>
            </FormGroup>
            <FormGroup>
                <Label>Capacidad máxima:</Label>
                <br />
                <Input
                    type="number"
                    name="maximumCapacity"
                    min={0}
                    value={formData.maximumCapacity || ''}
                    onChange={handleChange}
                    readOnly={!isEditable}
                />
                <Error>{errors.maximumCapacity}</Error>
            </FormGroup>
            <FormGroup>
                <Label>Profesor:</Label>
                <br />
                <Input
                    type="text"
                    name="professor"
                    value={userRole === 'professor' ? userName : (formData.professor || '')}
                    onChange={handleChange}
                    disabled={true}
                    readOnly={true}
                />
                {userRole === 'admin' && <Error>{errors.professor}</Error>}
            </FormGroup>
            <br />
            <div>
                {showEditButtons && isEditable && (
                    <GenericButtonsContainer>
                        <GenericButton type="submit">Confirmar</GenericButton>
                        <GenericButton type="button" onClick={onCancel}>Cancelar</GenericButton>
                    </GenericButtonsContainer>
                )}

                {showCreateButtons && isEditable && (
                    <GenericButtonsContainer>
                        <GenericButton type="submit">Crear</GenericButton>
                        <GenericButton type="button"onClick={onCancel}>Cancelar</GenericButton>
                    </GenericButtonsContainer>
                )}

                {showEnrollButton && (
                    isEnrolled ? (
                        <GenericButton type="button" onClick={onUnenroll}>
                            Cancelar suscripción
                        </GenericButton>
                    ) : (
                        <GenericButton type="button" onClick={onEnroll}>
                            Suscribirse
                        </GenericButton>
                    )
                )}
            </div>
        </form>
    );
};

export default CourseForm;