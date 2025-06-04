import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { passwordRecovery } from "../../store/actions/authActions";
import { validateEmail } from "../../utils/validators";
import { 
    FormGroup, 
    Label, 
    Input,
    Error,
    GenericButton
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
            <h1>Recuperación de Contraseña</h1>
            <FormGroup>
                <Label>Ingresá tu Email:</Label>
                <Input 
                    type="text" 
                    placeholder="Email" 
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <Error>{errors.email}</Error>}
            </FormGroup>
            <GenericButton type="submit">ENVIAR</GenericButton>
        </form>
    )
};

export default connect(null, { passwordRecovery })(ForgotPassword);