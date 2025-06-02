import { useState, useEffect } from 'react';
import { validateCourseForm } from '../../utils/validators';
import { handleInputChange } from '../../utils/handlers';
import { Error, CourseCardButton } from '../../styles';

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
            <div>
                <label>Título:</label>
                <br />
                <input
                    type="text"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleChange}
                    readOnly={!isEditable}
                />
                <Error>{errors.title}</Error>
            </div>
            <div>
                <label>Descripción:</label>
                <br />
                <textarea
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
                <label>Capacidad máxima:</label>
                <br />
                <input
                    type="number"
                    name="maximumCapacity"
                    min={0}
                    value={formData.maximumCapacity || ''}
                    onChange={handleChange}
                    readOnly={!isEditable}
                />
                <Error>{errors.maximumCapacity}</Error>
            </div>
            <div>
                <label>Profesor:</label>
                <br />
                <input
                    type="text"
                    name="professor"
                    value={userRole === 'professor' ? userName : (formData.professor || '')}
                    onChange={handleChange}
                    disabled={true}
                    readOnly={true}
                />
                {userRole === 'admin' && <Error>{errors.professor}</Error>}
            </div>
            <br />
            <div>
                {showEditButtons && isEditable && (
                    <>
                        <CourseCardButton type="submit">Confirmar</CourseCardButton>
                        <CourseCardButton type="button" onClick={onCancel}>Cancelar</CourseCardButton>
                    </>
                )}

                {showCreateButtons && isEditable && (
                    <>
                        <CourseCardButton type="submit">Crear</CourseCardButton>
                        <CourseCardButton type="button" onClick={onCancel}>Cancelar</CourseCardButton>
                    </>
                )}

                {showEnrollButton && (
                    isEnrolled ? (
                        <CourseCardButton type="button" onClick={onUnenroll}>
                            Cancelar suscripción
                        </CourseCardButton>
                    ) : (
                        <CourseCardButton type="button" onClick={onEnroll}>
                            Suscribirse
                        </CourseCardButton>
                    )
                )}
            </div>
        </form>
    );
};

export default CourseForm;