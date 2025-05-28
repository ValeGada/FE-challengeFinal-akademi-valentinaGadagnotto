import React from "react";
import { Link } from 'react-router-dom';

const LoginForm = ({ formData, errors, onChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Email:</label>
                <input 
                    type="text" 
                    placeholder="Email" 
                    name="email"
                    value={formData.email || ''}
                    onChange={onChange}
                />
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
                <label>Contraseña:</label>
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    name="password"
                    value={formData.password || ''}
                    onChange={onChange}
                />
                {errors.password && <p>{errors.password}</p>}
            </div>
            <div>
                <Link to="/password-recovery">¿Olvidaste tu contraseña?</Link>
            </div>
            <div>
                <Link to="/register">Registrarse</Link>
            </div>
            <button type="submit">LOG IN</button>
        </form>
    )
};

export default LoginForm;