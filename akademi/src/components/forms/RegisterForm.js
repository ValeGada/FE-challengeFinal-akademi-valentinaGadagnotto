import React from "react";
import { 
    FormGroup, 
    Label, 
    AuthInput,
    Error,
    AuthButton
} from "../../styles";

const RegisterForm = ({ formData, errors, onChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <FormGroup>
                <Label>Nombre:</Label>
                <AuthInput 
                    type="text" 
                    placeholder="Nombre" 
                    name="name"
                    value={formData.name || ''}
                    onChange={onChange}
                />
                {errors.name && <Error>{errors.name}</Error>}
            </FormGroup>
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
            <AuthButton type="submit">SIGN UP</AuthButton>
        </form>
    )
};

export default RegisterForm;