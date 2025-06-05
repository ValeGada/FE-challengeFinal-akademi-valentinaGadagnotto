import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { passwordReset } from "../../store/actions/authActions";
import { validatePassword } from "../../utils/validators";
import { 
    FormGroup, 
    Label, 
    AuthInput,
    Error,
    AuthButton,
    AuthTitle
} from "../../styles";

const PasswordReset = ({ passwordReset, message }) => {
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { recoveryToken } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (message && (message.includes('éxito') || message.toLowerCase().includes('reset'))) {
            navigate('/login', { replace: true })
        };
    }, [message, navigate]);

    // Manejar validación y envío de formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validatePassword(password);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            passwordReset({ recoveryToken, newPassword: password });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <AuthTitle>Recuperación de Contraseña</AuthTitle>
            <FormGroup>
                <Label>Ingresá tu nueva contraseña:</Label>
                <AuthInput 
                    type="password" 
                    placeholder="Contraseña" 
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <Error>{errors.password}</Error>}
            </FormGroup>
            <AuthButton type="submit">CONFIRMAR</AuthButton>
        </form>
    )
};

const mapStateToProps = state => {
    return {
        message: state.auth.message
    }
}

export default connect(mapStateToProps, { passwordReset })(PasswordReset);