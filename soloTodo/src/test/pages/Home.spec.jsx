// src/test/pages/Home.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../pages/Home';

describe('Home Page', () => {
  it('renderiza el título principal y los juegos del carrusel', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    expect(screen.getByText('NOVEDADES')).toBeTruthy();
    
    expect(screen.getByText('Grand Theft Auto VI')).toBeTruthy();
    expect(screen.getByText(/Bienvenido de vuelta a Vice City/i)).toBeTruthy();
    
    expect(screen.getByText('EA Sports FC 27')).toBeTruthy();
    expect(screen.getByText("Assassin's Creed Shadows")).toBeTruthy();
  });

  it('envuelve cada novedad en un enlace que dirige al catálogo (/products)', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    const enlaces = screen.getAllByRole('link');
    
    expect(enlaces.length).toBe(5);
    
    expect(enlaces[0].getAttribute('href')).toBe('/products');
  });

  it('reemplaza la imagen por un fallback si la original falla al cargar', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    const imgGta = screen.getByAltText('Grand Theft Auto VI');
    
    expect(imgGta.getAttribute('src')).toBe('/img/gta.png');
    
    fireEvent.error(imgGta);
    
    expect(imgGta.getAttribute('src')).toBe('https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc675r.webp');
  });
});