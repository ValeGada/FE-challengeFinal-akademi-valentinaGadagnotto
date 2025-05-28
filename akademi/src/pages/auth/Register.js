import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import { register } from "../../store/actions/authActions";
import { validateRegisterForm } from "../../utils/validators";
import { handleInputChange } from "../../utils/handlers";
import RegisterForm from "../../components/forms/RegisterForm";

const Register = ({ register }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Manejar cambios en los campos del formulario
    const handleChange = handleInputChange(formData, setFormData);

    // Manejar validación y envío de formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateRegisterForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            register(formData);
            navigate('/login');
        }
    };

    return (
        <div>
            <h1>Sign up</h1>
            <RegisterForm 
                formData={formData}
                errors={errors}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </div>
    )
};

export default connect(null, { register })(Register);