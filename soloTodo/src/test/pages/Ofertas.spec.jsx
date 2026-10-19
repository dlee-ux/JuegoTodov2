// src/test/pages/Ofertas.spec.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Ofertas from '../../pages/Ofertas';
import { getProducts } from '../../data/products';

jest.mock('../../data/products', () => ({
  getProducts: jest.fn(),
}));

jest.mock('../../components/organisms/ProductCard', () => {
  return function MockProductCard({ product }) {
    return <div data-testid={`tarjeta-oferta-${product.id}`}>{product.nombre}</div>;
  };
});

describe('Ofertas Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza correctamente el título y subtítulo de la sección', () => {
    getProducts.mockReturnValue([]);

    render(<Ofertas />);
    
    expect(screen.getByText('OFERTAS DESTACADAS')).toBeTruthy();
    expect(screen.getByText(/Compara los mejores precios/i)).toBeTruthy();
  });

  it('muestra el mensaje de estado vacío cuando no hay juegos con oferta === true', () => {
    const mockJuegosSinOferta = [
      { id: 1, nombre: 'Juego Normal 1', oferta: false },
      { id: 2, nombre: 'Juego Normal 2', oferta: false }
    ];
    
    getProducts.mockReturnValue(mockJuegosSinOferta);

    render(<Ofertas />);
    
    expect(screen.getByText('No hay juegos en oferta en este momento')).toBeTruthy();
    expect(screen.getByText('Vuelve más tarde para revisar nuevos descuentos.')).toBeTruthy();
    
    const tarjetas = screen.queryAllByTestId(/tarjeta-oferta-/);
    expect(tarjetas.length).toBe(0);
  });

  it('filtra y renderiza únicamente los juegos que están en oferta', () => {
    const mockCatalogoMixto = [
      { id: 1, nombre: 'Juego Caro', oferta: false },
      { id: 2, nombre: 'Juego Barato', oferta: true },
      { id: 3, nombre: 'Juego Exclusivo', oferta: false },
      { id: 4, nombre: 'Juego de Remate', oferta: true }
    ];
    
    getProducts.mockReturnValue(mockCatalogoMixto);

    render(
      <MemoryRouter>
        <Ofertas />
      </MemoryRouter>
    );
    
    expect(screen.queryByText('No hay juegos en oferta en este momento')).toBeNull();
    
    const tarjetas = screen.getAllByTestId(/tarjeta-oferta-/);
    expect(tarjetas.length).toBe(2);
    
    expect(screen.getByText('Juego Barato')).toBeTruthy();
    expect(screen.getByText('Juego de Remate')).toBeTruthy();
    
    expect(screen.queryByText('Juego Caro')).toBeNull();
  });
});