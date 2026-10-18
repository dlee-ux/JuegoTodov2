// src/test/pages/Admin.spec.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Admin from '../../pages/Admin';
import * as productData from '../../data/products';

jest.mock('../../data/products', () => ({
  getProducts: jest.fn(),
  createProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn()
}));

describe('Admin Page (Integration)', () => {
  const mockProductos = [
    { id: 1, name: 'Zelda', category: 'AVENTURA', price: 40000, oferta: false }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    
    productData.getProducts.mockReturnValue(mockProductos);
    
    spyOn(window, 'confirm').and.returnValue(true);
  });

  it('muestra el formulario de login si no hay sesión y permite acceder con credenciales correctas', () => {
    render(<Admin />);
    
    expect(screen.getByText('ACCESO ADMINISTRATIVO')).toBeTruthy();
    
    const inputUsuario = screen.getByPlaceholderText("Ingresa 'admin'");
    const inputPassword = screen.getByPlaceholderText("Ingresa 'admin123'");
    
    fireEvent.change(inputUsuario, { target: { value: 'admin' } });
    fireEvent.change(inputPassword, { target: { value: 'admin123' } });
    
    const btnIngresar = screen.getByRole('button', { name: 'INGRESAR AL PANEL' });
    fireEvent.click(btnIngresar);
    
    expect(screen.getByText('PANEL ADMINISTRATIVO')).toBeTruthy();
    expect(localStorage.getItem('admin_autenticado')).toBe('true');
  });

  it('muestra un error de login si las credenciales son incorrectas', () => {
    render(<Admin />);
    
    const btnIngresar = screen.getByRole('button', { name: 'INGRESAR AL PANEL' });
    fireEvent.click(btnIngresar);
    
    expect(screen.getByText('Usuario o contraseña de administrador incorrectos')).toBeTruthy();
    expect(screen.queryByText('PANEL ADMINISTRATIVO')).toBeNull(); 
  });

  it('salta el login y carga los productos si el localStorage ya tiene la sesión activa', () => {
    localStorage.setItem('admin_autenticado', 'true');
    render(<Admin />);
    
    expect(screen.getByText('PANEL ADMINISTRATIVO')).toBeTruthy();
    expect(screen.getByText('Zelda')).toBeTruthy(); 
    expect(productData.getProducts).toHaveBeenCalledTimes(1);
  });

  it('abre el modal en modo creación y guarda un nuevo producto', async () => {
    localStorage.setItem('admin_autenticado', 'true');
    render(<Admin />);
    
    const btnAgregar = screen.getByRole('button', { name: '+ AGREGAR JUEGO' });
    fireEvent.click(btnAgregar);
    
    expect(screen.getByText('NUEVO JUEGO')).toBeTruthy();
    
    const inputNombre = screen.getByLabelText(/Nombre del Juego/i);
    fireEvent.change(inputNombre, { target: { value: 'Nuevo Juego Test' } });
    
    const btnGuardar = screen.getByRole('button', { name: 'CREAR JUEGO' });
    fireEvent.click(btnGuardar);
    
    await waitFor(() => {
      expect(productData.createProduct).toHaveBeenCalledWith(expect.objectContaining({
        nombre: 'Nuevo Juego Test',
        categoria: 'ACCION' 
      }));
      expect(productData.getProducts).toHaveBeenCalledTimes(2); 
    });
  });

  it('elimina un producto al confirmar el modal del navegador', () => {
    localStorage.setItem('admin_autenticado', 'true');
    render(<Admin />);
    
    const btnEliminar = screen.getByRole('button', { name: 'Eliminar' });
    fireEvent.click(btnEliminar);
    
    expect(window.confirm).toHaveBeenCalledWith('¿Seguro que deseas eliminar este juego del catálogo?');
    
    expect(productData.deleteProduct).toHaveBeenCalledWith(1);
    expect(productData.getProducts).toHaveBeenCalledTimes(2); 
  });
});