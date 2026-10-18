// src/test/pages/Login.spec.jsx
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Login from '../../pages/Login';

describe('Login Page', () => {
  let mockStorage = {};
  const originalLocation = window.location;

  beforeAll(() => {
    delete window.location;
    window.location = { href: '' };
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  beforeEach(() => {
    mockStorage = {};
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => mockStorage[key] || null);
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation((key, val) => { mockStorage[key] = val; });
    jest.useFakeTimers();
    window.location.href = '';
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('renderiza la vista de "Iniciar Sesión" por defecto', () => {
    render(<Login />);
    
    expect(screen.getByText('INICIAR SESIÓN')).toBeTruthy();
    expect(screen.getByLabelText(/Correo o Nombre de Usuario/i)).toBeTruthy();
    expect(screen.getByLabelText(/Contraseña/i)).toBeTruthy();
    
    expect(screen.queryByLabelText('Nombre de Usuario')).toBeNull();
  });

  it('cambia a la vista de "Registro" al hacer clic en el enlace inferior', () => {
    render(<Login />);
    
    const botonAlternar = screen.getByRole('button', { name: /Regístrate gratis aquí/i });
    fireEvent.click(botonAlternar);
    
    expect(screen.getByText('CREAR CUENTA')).toBeTruthy();
    expect(screen.getByLabelText('Nombre de Usuario')).toBeTruthy();
    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: 'REGISTRARME' })).toBeTruthy();
  });

  it('muestra un error si las credenciales de inicio de sesión son incorrectas', () => {
    mockStorage['usuarios_juegotodo'] = JSON.stringify([
      { usuario: 'admin', email: 'admin@correo.com', password: '123' }
    ]);

    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/Correo o Nombre de Usuario/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'claveEquivocada' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'ENTRAR' }));
    
    expect(screen.getByText('Usuario/correo o contraseña incorrectos.')).toBeTruthy();
  });

  it('muestra un error al intentar registrar un usuario o correo ya existente', () => {
    mockStorage['usuarios_juegotodo'] = JSON.stringify([
      { usuario: 'crist', email: 'crist@correo.com', password: '123' }
    ]);

    render(<Login />);
    
    fireEvent.click(screen.getByRole('button', { name: /Regístrate gratis aquí/i }));
    
    fireEvent.change(screen.getByLabelText('Nombre de Usuario'), { target: { value: 'crist' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'nuevo@correo.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '456' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'REGISTRARME' }));
    
    expect(screen.getByText('Ese nombre de usuario o correo ya está registrado.')).toBeTruthy();
  });

  it('registra un usuario exitosamente, guarda sesión y redirige al inicio', () => {
    render(<Login />);
    
    fireEvent.click(screen.getByRole('button', { name: /Regístrate gratis aquí/i }));
    
    fireEvent.change(screen.getByLabelText('Nombre de Usuario'), { target: { value: 'nuevoGamer' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'gamer@correo.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '123456' } });
    
    fireEvent.click(screen.getByRole('button', { name: 'REGISTRARME' }));
    
    expect(screen.getByText('¡Cuenta creada con éxito! Entrando a Juegotodo...')).toBeTruthy();
    
    const listaUsuarios = JSON.parse(mockStorage['usuarios_juegotodo']);
    expect(listaUsuarios.length).toBe(1);
    expect(listaUsuarios[0].usuario).toBe('nuevoGamer');
    
    const usuarioLogueado = JSON.parse(mockStorage['usuarioLogueado']);
    expect(usuarioLogueado.email).toBe('gamer@correo.com');
    
    act(() => {
      jest.runAllTimers();
    });
    
    expect(window.location.href).toBe('/');
  });
});