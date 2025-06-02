import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { passwordRecovery } from "../../store/actions/authActions";
import { validateEmail } from "../../utils/validators";
import { Error } from "../../styles";

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
            <div>
                <label>Ingresá tu Email:</label>
                <input 
                    type="text" 
                    placeholder="Email" 
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <Error>{errors.email}</Error>}
            </div>
            <button type="submit">ENVIAR</button>
        </form>
    )
};

export default connect(null, { passwordRecovery })(ForgotPassword);