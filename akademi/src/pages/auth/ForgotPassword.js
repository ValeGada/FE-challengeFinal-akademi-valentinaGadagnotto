import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { passwordRecovery } from "../../store/actions/authActions";
import { validateEmail } from "../../utils/validators";
import { 
    FormGroup, 
    Label, 
    AuthInput,
    Error,
    AuthTitle,
    AuthButton
} from "../../styles";

const ForgotPassword = ({ passwordRecovery }) => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    // Manejar validación y envío de formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateEmail(email);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            passwordRecovery(email);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <AuthTitle>Recuperación de Contraseña</AuthTitle>
            <FormGroup>
                <Label>Ingresá tu Email:</Label>
                <AuthInput 
                    type="text" 
                    placeholder="Email" 
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <Error>{errors.email}</Error>}
            </FormGroup>
            <AuthButton type="submit">ENVIAR</AuthButton>
        </form>
    )
};

export default connect(null, { passwordRecovery })(ForgotPassword);