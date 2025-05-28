import React from "react";

const RegisterForm = ({ formData, errors, onChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Nombre:</label>
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    name="name"
                    value={formData.name || ''}
                    onChange={onChange}
                />
                {errors.name && <p>{errors.name}</p>}
            </div>
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
            <button type="submit">SIGN UP</button>
        </form>
    )
};

export default RegisterForm;