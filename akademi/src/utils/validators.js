export const validateLogInForm = (formData) => {
    const errors = {};
    const emailFormat = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!formData.email) {
        errors.email = '* El email es obligatorio.';
    } else if (!formData.email.match(emailFormat)) {
        errors.email = '* El email debe tener un formato válido (Ej: test@test.com).';
    }

    if (!formData.password) {
        errors.password = '* La contraseña es obligatoria.';
    } else if (formData.password.length < 6) {
        errors.password = '* La contraseña debe contener al menos 6 caracteres.';
    } else if (formData.password.toLowerCase().includes('password') ||
        formData.password.toLowerCase().includes('contraseña')) {
        errors.password = '* La contraseña no puede incluir la palabra "contraseña" o "password".';
    }

    return errors;
};

export const validateRegisterForm = (formData, validatePassword = true) => {
    const errors = {};
    const emailFormat = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!formData.name) {
        errors.name = '* El nombre es obligatorio';
    }

    if (!formData.email) {
        errors.email = '* El email es obligatorio.';
    } else if (!formData.email.match(emailFormat)) {
        errors.email = '* El email debe tener un formato válido (Ej: test@test.com).';
    }

    if (validatePassword) {
        if (!formData.password) {
            errors.password = '* La contraseña es obligatoria.';
        } else if (formData.password.length < 6) {
            errors.password = '* La contraseña debe contener al menos 6 caracteres.';
        } else if (
            formData.password.toLowerCase().includes('password') ||
            formData.password.toLowerCase().includes('contraseña')
        ) {
        errors.password = '* La contraseña no puede incluir la palabra "contraseña" o "password".';
        }
    }

    return errors;
};

export const validateUserForm = (formData, validatePassword = true) => {
    const errors = {};
    const emailFormat = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!formData.name) {
        errors.name = '* El nombre es obligatorio.';
    }

    if (!formData.email) {
        errors.email = '* El email es obligatorio.';
    } else if (!formData.email.match(emailFormat)) {
        errors.email = '* El email debe tener un formato válido (Ej: test@test.com).';
    }

    if (validatePassword) {
        if (!formData.password) {
            errors.password = '* La contraseña es obligatoria.';
        } else if (formData.password.length < 6) {
            errors.password = '* La contraseña debe contener al menos 6 caracteres.';
        } else if (
            formData.password.toLowerCase().includes('password') ||
            formData.password.toLowerCase().includes('contraseña')
        ) {
            errors.password = '* La contraseña no puede incluir la palabra "contraseña" o "password".';
        }
    }

    if (!formData.role) {
        errors.role = '* El rol es obligatorio.';
    }

    return errors;
};

export const validateCourseForm = (formData) => {
    const errors = {};

    if (!formData.title) {
        errors.title = '* El título es obligatorio.';
    } else if (formData.title.trim().length < 5) {
        errors.title = '* El título debe contener al menos 5 caracteres.';
    }

    if (!formData.description) {
        errors.description = '* La descripción es obligatoria.';
    } else if (formData.description.trim().length < 5) {
        errors.description = '* La descripción debe contener al menos 5 caracteres.';
    }

    if (!formData.maximumCapacity) {
        errors.maximumCapacity = '* La capacidad máxima es obligatoria.';
    } else if (formData.maximumCapacity < 0) {
        errors.maximumCapacity = '* La capacidad máxima no puede ser un número negativo.';
    } else if (formData.maximumCapacity < 2) {
        errors.maximumCapacity = '* La capacidad máxima no puede ser menor a 2 personas.';
    } else if (formData.maximumCapacity > 10) {
        errors.maximumCapacity = '* La capacidad máxima no puede exceder de 10 personas.';
    }

    if (!formData.professor) {
        errors.professor = '* El nombre es obligatorio.';
    }

    return errors;
};

export const validatePassword = (password) => {
    const errors = {};

    if (!password) {
        errors.password = '* La contraseña es obligatoria.';
    } else if (password.length < 6) {
        errors.password = '* La contraseña debe contener al menos 6 caracteres.';
    } else if (
        password.toLowerCase().includes('password') ||
        password.toLowerCase().includes('contraseña')
    ) {
        errors.password = '* La contraseña no puede incluir la palabra "contraseña" o "password".';
    } else if (password.includes(' ')) {
        errors.password = '* La contraseña no puede incluir espacios en blanco.';
    }

    return errors;
};

export const validateEmail = (email) => {
    const errors = {};
    const emailFormat = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!email) {
        errors.email = '* El email es obligatorio.';
    } else if (!email.match(emailFormat)) {
        errors.email = '* El email debe tener un formato válido (Ej: test@test.com).';
    }
    
    return errors;
};