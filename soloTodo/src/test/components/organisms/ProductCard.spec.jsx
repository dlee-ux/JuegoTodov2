// src/test/components/organisms/ProductCard.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as router from 'react-router-dom';
import ProductCard from '../../../components/organisms/ProductCard';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('ProductCard Organism', () => {
  const mockProduct = {
    id: '777',
    nombre: 'The Witcher 3', 
    descripcion: 'Juego del año',
    precio: 25000,
    imagen: 'witcher.jpg',
    categoria: 'AVENTURA',
    link: 'https://store.steampowered.com/app/292030'
  };

  beforeEach(() => {
    mockNavigate.mockClear();
    spyOn(window, 'open');
  });

  it('renderiza correctamente la información del producto y formatea el precio', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('The Witcher 3')).toBeTruthy();
    expect(screen.getByText('Juego del año')).toBeTruthy();
    expect(screen.getByText('AVENTURA')).toBeTruthy();
    
    expect(screen.getByText('$25.000')).toBeTruthy();
  });

  it('navega al detalle del producto internamente al hacer clic en la tarjeta', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
    
    const cardTitle = screen.getByText('The Witcher 3');
    fireEvent.click(cardTitle);
    
    expect(mockNavigate).toHaveBeenCalledWith('/products/777');
  });

  it('abre el enlace oficial en una nueva pestaña y evita la navegación interna al hacer clic en "Ver detalles"', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
    
    const botonDetalles = screen.getByRole('button', { name: 'Ver detalles' });
    fireEvent.click(botonDetalles);
    
    expect(window.open).toHaveBeenCalledWith('https://store.steampowered.com/app/292030', '_blank');
    
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});