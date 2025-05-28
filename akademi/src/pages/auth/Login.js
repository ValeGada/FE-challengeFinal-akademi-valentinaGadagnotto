import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import { login } from "../../store/actions/authActions";
import { validateLogInForm } from "../../utils/validators";
import { handleInputChange } from "../../utils/handlers";
import LoginForm from "../../components/forms/LoginForm";

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
        
    useEffect(() => {
        if (isAuthenticated) {
            const from = location.state?.from?.pathname || "/dashboard";
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    // Manejar cambios en los campos del formulario
    const handleChange = handleInputChange(formData, setFormData);

    // Manejar validación y envío de formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateLogInForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            login(formData);
        }
    };

    return (
        <div>
            <h1>Log In</h1>
            <LoginForm 
                formData={formData}
                errors={errors}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </div>
    )
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps, { login })(Login);