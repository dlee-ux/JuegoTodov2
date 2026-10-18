import React from 'react';
import Input from '../atoms/Input';

function ContactForm({ formulario, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="d-flex flex-column gap-3">
      <Input
        type="text"
        name="nombre"
        placeholder="Tu Nombre"
        value={formulario.nombre}
        onChange={onChange}
        required
      />
      <Input
        type="email"
        name="email"
        placeholder="Tu Correo Electrónico"
        value={formulario.email}
        onChange={onChange}
        required
      />
      <textarea
        name="mensaje"
        rows="6"
        className="form-control contacto-textarea p-3"
        placeholder="Tu Mensaje"
        value={formulario.mensaje}
        onChange={onChange}
        required
      ></textarea>
      <button 
        type="submit" 
        className="btn-sesion-neon py-3 mt-2"
        style={{ cursor: 'pointer' }}
      >
        ENVIAR MENSAJE
      </button>
    </form>
  );
}

export default ContactForm;