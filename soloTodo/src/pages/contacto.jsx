import React, { useState } from 'react';

export default function Contacto() {
    const [formulario, setFormulario] = useState({ nombre: '', email: '', mensaje: '' });
    const [enviado, setEnviado] = useState(false);

    const handleChange = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEnviado(true);
        setFormulario({ nombre: '', email: '', mensaje: '' });
    };

    return (
        <div className="container my-5" style={{ maxWidth: '550px' }}>
            <h2 className="text-center mb-3" style={{ color: '#3afff8' }}>CONTACTO</h2>
            <p className="text-center text-light mb-4">
                ¿Tienes alguna duda o sugerencia? Escríbenos y te responderemos lo más rápido posible.
            </p>

            {enviado && (
                <div className="alert alert-success text-center" role="alert">
                    ¡Mensaje enviado correctamente!
                </div>
            )}

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <input
                    type="text"
                    name="nombre"
                    className="form-control bg-dark text-white border-secondary p-3"
                    placeholder="Tu Nombre"
                    value={formulario.nombre}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    className="form-control bg-dark text-white border-secondary p-3"
                    placeholder="Tu Correo Electrónico"
                    value={formulario.email}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="mensaje"
                    rows="6"
                    className="form-control bg-dark text-white border-secondary p-3"
                    placeholder="Tu Mensaje"
                    style={{ resize: 'none' }}
                    value={formulario.mensaje}
                    onChange={handleChange}
                    required
                ></textarea>
                <button 
                    type="submit" 
                    className="btn fw-bold p-3 mt-2" 
                    style={{ borderColor: '#3afff8', color: '#3afff8' }}
                >
                    ENVIAR MENSAJE
                </button>
            </form>
        </div>
    );
}