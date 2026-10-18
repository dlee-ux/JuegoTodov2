// src/test/pages/Products.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Products from '../../pages/Products';
import { getProducts } from '../../data/products';

jest.mock('../../data/products', () => ({
  getProducts: jest.fn(),
}));

jest.mock('../../components/organisms/ProductCard', () => {
  return function MockProductCard({ product }) {
    return <div data-testid="mock-product-card">{product.nombre || product.name}</div>;
  };
});

describe('Products Page (Catálogo)', () => {
  const mockCatalogo = [
    { id: 1, nombre: 'Juego Acción 1', category: 'ACCION' },
    { id: 2, nombre: 'Juego Acción 2', categoria: 'ACCION' },
    { id: 3, nombre: 'Juego Deporte 1', category: 'DEPORTE' },
    { id: 4, nombre: 'Juego Shooter 1', categoria: 'SHOOTERS' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    getProducts.mockReturnValue(mockCatalogo);
  });

  it('renderiza todas las categorías y la lista completa de juegos al inicio', () => {
    render(<Products />);
    
    expect(screen.getByText('CATALOGO')).toBeTruthy();
    expect(screen.getByText('TODOS LOS JUEGOS')).toBeTruthy();
    
    expect(screen.getByAltText('ACCION')).toBeTruthy();
    expect(screen.getByAltText('DEPORTE')).toBeTruthy();
    expect(screen.getByAltText('HISTORIA')).toBeTruthy();
    expect(screen.getByAltText('SHOOTERS')).toBeTruthy();
    expect(screen.getByAltText('MULTIJUGADOR')).toBeTruthy();

    const tarjetas = screen.getAllByTestId('mock-product-card');
    expect(tarjetas.length).toBe(4);
    
    expect(screen.queryByText('CERRAR')).toBeNull();
  });

  it('muestra la sección filtrada al hacer clic en una categoría (soportando category y categoria)', () => {
    render(<Products />);
    
    const btnAccion = screen.getByAltText('ACCION');
    fireEvent.click(btnAccion);
    
    expect(screen.getByRole('heading', { name: 'ACCION' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'CERRAR' })).toBeTruthy();
    
    const tarjetas = screen.getAllByTestId('mock-product-card');
    expect(tarjetas.length).toBe(6);
    
    const juegosAccionRenderizados = screen.getAllByText(/Juego Acción/i);
    expect(juegosAccionRenderizados.length).toBe(4);
  });

  it('cierra la sección filtrada al hacer clic en el botón CERRAR', () => {
    render(<Products />);
    
    fireEvent.click(screen.getByAltText('DEPORTE'));
    expect(screen.getByText('CERRAR')).toBeTruthy();
    
    fireEvent.click(screen.getByText('CERRAR'));
    
    expect(screen.queryByText('CERRAR')).toBeNull();
    expect(screen.queryByRole('heading', { name: 'DEPORTE' })).toBeNull();
  });

  it('cierra la sección filtrada al hacer clic nuevamente en la misma categoría (toggle)', () => {
    render(<Products />);
    
    const btnShooters = screen.getByAltText('SHOOTERS');
    
    fireEvent.click(btnShooters);
    expect(screen.getByText('CERRAR')).toBeTruthy();
    
    fireEvent.click(btnShooters);
    
    expect(screen.queryByText('CERRAR')).toBeNull();
  });
});