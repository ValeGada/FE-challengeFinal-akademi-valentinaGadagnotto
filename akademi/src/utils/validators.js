export const validateUserForm = (formData, validatePassword = true) => {
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

    if (!formData.role) {
        errors.role = '* El rol es obligatorio';
    }

    return errors;
};

export const validateProductForm = (formData) => {
    const errors = {};
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

    if (!formData.name) {
        errors.name = '* El nombre es obligatorio';
    }

    if (!formData.description) {
        errors.description = '* La descripción es obligatoria';
    } else if (formData.description.length < 5) {
        errors.description = '* La descripción debe contener al menos 5 caracteres';
    }

    if (!formData.price) {
        errors.price = '* El precio es obligatorio';
    } else if (formData.price <= 0) {
        errors.price = '* El precio debe ser un número mayor a 0';
    } 

    if (!formData.stock) {
        errors.stock = '* El stock es obligatorio';
    } else if (formData.stock < 0) {
        errors.stock = '* El stock no puede ser negativo';
    } 

    if (!formData.category) {
        errors.category = '* La categoría es obligatoria';
    }

    if (formData.image_url && !formData.image_url.match(urlRegex)) {
        errors.image_url = '* La URL de imagen debe ser válida'
    }

    return errors;
};

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