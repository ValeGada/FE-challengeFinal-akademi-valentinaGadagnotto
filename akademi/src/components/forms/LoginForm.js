import React from "react";
import { Link } from 'react-router-dom';
import { 
    FormGroup, 
    Label, 
    AuthInput, 
    Error,
    AuthButton,
    FormLinksContainer,
    SidebarLink
} from "../../styles";

const LoginForm = ({ formData, errors, onChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} noValidate>
            <FormGroup>
                <Label>Email:</Label>
                <AuthInput 
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
                <AuthInput 
                    type="password" 
                    placeholder="Contraseña" 
                    name="password"
                    value={formData.password || ''}
                    onChange={onChange}
                />
                {errors.password && <Error>{errors.password}</Error>}
            </FormGroup>
            <FormLinksContainer>
                <SidebarLink to="/forgot-password">¿Olvidaste tu contraseña?</SidebarLink>
            </FormLinksContainer>
            <FormLinksContainer>
                <SidebarLink to="/register">Registrarse</SidebarLink>
            </FormLinksContainer>
            <AuthButton type="submit">LOG IN</AuthButton>
        </form>
    )
};

export default LoginForm;