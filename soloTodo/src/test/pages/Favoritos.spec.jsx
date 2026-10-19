// src/test/pages/Favoritos.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Favoritos from '../../pages/Favoritos';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Favoritos Page', () => {
  const mockJuegosFavoritos = [
    { id: '101', nombre: 'Hollow Knight', precio: 15000, imagen: 'hollow.jpg' },
    { id: '102', nombre: 'Elden Ring', precio: 45000, imagen: 'elden.jpg' }
  ];

  beforeEach(() => {
    mockNavigate.mockClear();
    jest.restoreAllMocks();
  });

  it('muestra el estado vacío cuando no hay juegos y permite navegar al catálogo', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    render(
      <MemoryRouter>
        <Favoritos />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Aun no tienes juegos guardados en favoritos')).toBeTruthy();
    expect(screen.getByText(/Explora el catalogo/i)).toBeTruthy();
    
    const btnCatalogo = screen.getByRole('button', { name: 'IR AL CATALOGO' });
    fireEvent.click(btnCatalogo);
    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });

  it('renderiza las tarjetas de los juegos guardados en el localStorage', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockJuegosFavoritos));
    render(
      <MemoryRouter>
        <Favoritos />
      </MemoryRouter>
    );
    
    expect(screen.queryByText('Aun no tienes juegos guardados en favoritos')).toBeNull();
    
    expect(screen.getByText('Hollow Knight')).toBeTruthy();
    expect(screen.getByText('$15.000')).toBeTruthy();
    
    expect(screen.getByText('Elden Ring')).toBeTruthy();
    expect(screen.getByText('$45.000')).toBeTruthy();
  });

  it('navega al detalle del producto al hacer clic en "Ver"', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockJuegosFavoritos));

    render(
      <MemoryRouter>
        <Favoritos />
      </MemoryRouter>
    );
    
    const botonesVer = screen.getAllByRole('button', { name: 'Ver' });
    fireEvent.click(botonesVer[0]);
    
    expect(mockNavigate).toHaveBeenCalledWith('/products/101');
  });

  it('elimina un juego, actualiza localStorage y emite el evento global al hacer clic en "Quitar"', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockJuegosFavoritos));
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');

    render(
      <MemoryRouter>
        <Favoritos />
      </MemoryRouter>
    );
    
    const botonesQuitar = screen.getAllByRole('button', { name: 'Quitar' });
    fireEvent.click(botonesQuitar[0]);
    
    expect(screen.queryByText('Hollow Knight')).toBeNull();
    expect(screen.getByText('Elden Ring')).toBeTruthy();
    
    const arrayEsperado = [{ id: '102', nombre: 'Elden Ring', precio: 45000, imagen: 'elden.jpg' }];
    expect(setItemSpy).toHaveBeenCalledWith('favoritos_juegotodo', JSON.stringify(arrayEsperado));
    
    expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(Event));
    expect(dispatchEventSpy.mock.calls[0][0].type).toBe('favoritosActualizados');
  });
});