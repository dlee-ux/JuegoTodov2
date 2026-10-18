// src/test/pages/ProductDetail.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetail from '../../pages/ProductDetail';
import { getProducts } from '../../data/products';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../data/products', () => ({
  getProducts: jest.fn(),
}));

describe('ProductDetail Page', () => {
  const mockProduct = {
    id: 5,
    nombre: 'Zelda: Ocarina of Time',
    descripcion: 'Juego legendario',
    precio: 35000,
    categoria: 'AVENTURA',
    imagen: 'zelda.jpg',
    link: 'https://nintendo.com'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
  });

  it('muestra "Juego no encontrado" si el ID de la URL no existe en el catálogo', () => {
    useParams.mockReturnValue({ id: '999' });
    getProducts.mockReturnValue([mockProduct]);

    render(<ProductDetail />);
    
    expect(screen.getByText('Juego no encontrado')).toBeTruthy();
    
    const btnVolver = screen.getByRole('button', { name: 'VOLVER AL CATÁLOGO' });
    fireEvent.click(btnVolver);
    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });

  it('renderiza los detalles del producto correctamente y formatea el precio', () => {
    useParams.mockReturnValue({ id: '5' });
    getProducts.mockReturnValue([mockProduct]);
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    render(<ProductDetail />);
    
    expect(screen.getByText('Zelda: Ocarina of Time')).toBeTruthy();
    expect(screen.getByText('AVENTURA')).toBeTruthy();
    expect(screen.getByText('Juego legendario')).toBeTruthy();
    
    expect(screen.getByText('$35.000')).toBeTruthy();
    
    expect(screen.getByRole('button', { name: 'AGREGAR A FAVORITOS' })).toBeTruthy();
    
    expect(screen.queryByRole('button', { name: 'VER MIS FAVORITOS' })).toBeNull();
  });

  it('alterna el estado de favoritos, actualiza localStorage y emite el evento global', () => {
    useParams.mockReturnValue({ id: '5' });
    getProducts.mockReturnValue([mockProduct]);
    
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null); 
    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');

    render(<ProductDetail />);
    
    const btnFavorito = screen.getByRole('button', { name: 'AGREGAR A FAVORITOS' });

    fireEvent.click(btnFavorito);
    
    expect(setItemSpy).toHaveBeenCalledWith('favoritos_juegotodo', JSON.stringify([mockProduct]));
    
    expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(Event));
    expect(dispatchEventSpy.mock.calls[0][0].type).toBe('favoritosActualizados');
    
    expect(screen.getByRole('button', { name: 'QUITAR DE FAVORITOS' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'VER MIS FAVORITOS' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'QUITAR DE FAVORITOS' }));
    
    expect(setItemSpy).toHaveBeenCalledWith('favoritos_juegotodo', JSON.stringify([]));
    expect(screen.getByRole('button', { name: 'AGREGAR A FAVORITOS' })).toBeTruthy();
  });
});