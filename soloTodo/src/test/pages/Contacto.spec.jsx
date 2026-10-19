// src/test/pages/Contacto.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Contacto from '../../pages/Contacto';

describe('Contacto Page', () => {
  it('renderiza correctamente el título, la descripción y el formulario vacío', () => {
    render(<Contacto />);
    
    expect(screen.getByText('CONTACTO')).toBeTruthy();
    expect(screen.getByText(/¿Tienes alguna duda o sugerencia\?/i)).toBeTruthy();
    
    expect(screen.getByPlaceholderText('Tu Nombre').value).toBe('');
    expect(screen.getByPlaceholderText('Tu Correo Electrónico').value).toBe('');
    expect(screen.getByPlaceholderText('Tu Mensaje').value).toBe('');
    
    expect(screen.getByRole('button', { name: 'ENVIAR MENSAJE' })).toBeTruthy();
    
    expect(screen.queryByText('¡Mensaje enviado correctamente!')).toBeNull();
  });

  it('permite al usuario escribir en los campos del formulario (controlled inputs)', () => {
    render(<Contacto />);
    
    const inputNombre = screen.getByPlaceholderText('Tu Nombre');
    const inputEmail = screen.getByPlaceholderText('Tu Correo Electrónico');
    const inputMensaje = screen.getByPlaceholderText('Tu Mensaje');
    
    fireEvent.change(inputNombre, { target: { value: 'Juan Pérez' } });
    fireEvent.change(inputEmail, { target: { value: 'juan@test.com' } });
    fireEvent.change(inputMensaje, { target: { value: 'Tengo un problema con un juego.' } });
    
    expect(inputNombre.value).toBe('Juan Pérez');
    expect(inputEmail.value).toBe('juan@test.com');
    expect(inputMensaje.value).toBe('Tengo un problema con un juego.');
  });

  it('muestra el mensaje de éxito y limpia el formulario al enviar', () => {
    render(<Contacto />);
    
    const inputNombre = screen.getByPlaceholderText('Tu Nombre');
    const inputEmail = screen.getByPlaceholderText('Tu Correo Electrónico');
    const inputMensaje = screen.getByPlaceholderText('Tu Mensaje');
    const btnEnviar = screen.getByRole('button', { name: 'ENVIAR MENSAJE' });
    
    fireEvent.change(inputNombre, { target: { value: 'Ana Gómez' } });
    fireEvent.change(inputEmail, { target: { value: 'ana@ejemplo.com' } });
    fireEvent.change(inputMensaje, { target: { value: 'Excelente página, me encanta.' } });
    
    fireEvent.click(btnEnviar);
    
    expect(screen.getByText('¡Mensaje enviado correctamente!')).toBeTruthy();
    
    expect(inputNombre.value).toBe('');
    expect(inputEmail.value).toBe('');
    expect(inputMensaje.value).toBe('');
  });
});