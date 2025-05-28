import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import { login } from "../../store/actions/authActions";
import { validateLogInForm } from "../../utils/validators";
import { handleInputChange } from "../../utils/handlers";
import LoginForm from "../../components/forms/LoginForm";
import Spinner from "../../UI/Spinner";

const Login = ({ user, login, isAuthenticated, isLoading }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
        
    useEffect(() => {
        if (isAuthenticated && user) {
            switch (user.role) {
                case 'student':
                    navigate('/student/dashboard', { replace: true });
                    break;
                case 'professor':
                    navigate('/prof/dashboard', { replace: true });
                    break;
                case 'superadmin':
                    navigate('/admin/dashboard', { replace: true });
                    break;
                default:
                    navigate('/', { replace: true });
            }
        }
    }, [isAuthenticated, user, navigate]);

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

    if (isLoading) {
        return <Spinner />
    }

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
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        isLoading: state.auth.isLoading
    };
};

export default connect(mapStateToProps, { login })(Login);