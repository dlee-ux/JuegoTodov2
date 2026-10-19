<<<<<<< HEAD
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
=======
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';


describe('Home Page', () => {
 it('renderiza el título de la página de inicio', () => {
   render(<Home />);
   const title = screen.getByText('Página de Inicio');
   expect(title).toBeTruthy();
 });


 it('renderiza el párrafo de bienvenida', () => {
   render(<Home />);
   const paragraph = screen.getByText('Bienvenidos a nuestro sitio web.');
   expect(paragraph).toBeTruthy();
 });


 it('renderiza el contenedor de Bootstrap', () => {
   render(<Home />);
   const container = screen.getByText('Página de Inicio').closest('div');
   expect(container).toHaveClass('container'); // Verifica la clase de Bootstrap
   expect(container).toHaveClass('my-5'); // Verifica la clase my-5
 });
});
>>>>>>> 85a064229c1a81749e535262809c78f2d584f816
