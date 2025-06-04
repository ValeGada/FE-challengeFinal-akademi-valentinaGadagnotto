import React from "react";
import { Link } from 'react-router-dom';
import { 
    FormGroup, 
    Label, 
    Input, 
    Error,
    GenericButton 
} from "../../styles";

const LoginForm = ({ formData, errors, onChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <FormGroup>
                <Label>Email:</Label>
                <Input 
                    type="text" 
                    placeholder="Email" 
                    name="email"
                    value={formData.email || ''}
                    onChange={onChange}
                />
                {errors.email && <Error>{errors.email}</Error>}
            </FormGroup>
            <FormGroup>
                <Label>Contraseña:</Label>
                <Input 
                    type="password" 
                    placeholder="Contraseña" 
                    name="password"
                    value={formData.password || ''}
                    onChange={onChange}
                />
                {errors.password && <Error>{errors.password}</Error>}
            </FormGroup>
            <FormGroup>
                <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
            </FormGroup>
            <FormGroup>
                <Link to="/register">Registrarse</Link>
            </FormGroup>
            <GenericButton type="submit">LOG IN</GenericButton>
        </form>
    )
};

export default LoginForm;