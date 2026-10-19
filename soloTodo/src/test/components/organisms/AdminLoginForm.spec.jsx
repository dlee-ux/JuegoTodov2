// src/test/components/organisms/AdminLoginForm.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminLoginForm from '../../../components/organisms/AdminLoginForm';

describe('AdminLoginForm Organism', () => {
  const mockSetCredenciales = jasmine.createSpy('setCredenciales');
  const mockOnSubmit = jasmine.createSpy('onSubmit').and.callFake((e) => e.preventDefault());

  const defaultProps = {
    credenciales: { usuario: '', password: '' },
    setCredenciales: mockSetCredenciales,
    onSubmit: mockOnSubmit,
    errorLogin: null,
  };

  beforeEach(() => {
    mockSetCredenciales.calls.reset();
    mockOnSubmit.calls.reset();
  });

  it('renderiza correctamente el título, los campos de texto y el botón de envío', () => {
    render(<AdminLoginForm {...defaultProps} />);
    
    expect(screen.getByText('ACCESO ADMINISTRATIVO')).toBeTruthy();
    expect(screen.getByPlaceholderText("Ingresa 'admin'")).toBeTruthy();
    expect(screen.getByPlaceholderText("Ingresa 'admin123'")).toBeTruthy();
    expect(screen.getByRole('button', { name: 'INGRESAR AL PANEL' })).toBeTruthy();
  });

  it('llama a setCredenciales con los datos actualizados cuando el usuario escribe en los inputs', () => {
    render(<AdminLoginForm {...defaultProps} />);
    
    const userInput = screen.getByPlaceholderText("Ingresa 'admin'");
    const passwordInput = screen.getByPlaceholderText("Ingresa 'admin123'");
    
    fireEvent.change(userInput, { target: { value: 'nuevoUsuario' } });
    expect(mockSetCredenciales).toHaveBeenCalledWith({ usuario: 'nuevoUsuario', password: '' });
    
    fireEvent.change(passwordInput, { target: { value: 'miClaveSegura' } });
    expect(mockSetCredenciales).toHaveBeenCalledWith({ usuario: '', password: 'miClaveSegura' });
  });

  it('muestra el mensaje de error cuando existe y llama a onSubmit al enviar el formulario', () => {
    render(<AdminLoginForm {...defaultProps} errorLogin="Credenciales incorrectas, intenta de nuevo" />);
    
    expect(screen.getByText('Credenciales incorrectas, intenta de nuevo')).toBeTruthy();
    
    const submitButton = screen.getByRole('button', { name: 'INGRESAR AL PANEL' });
    fireEvent.click(submitButton);
    
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});