// src/test/components/organisms/Footer.spec.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../../../components/organisms/Footer';

describe('Footer Organism', () => {
  it('renderiza la sección de marca con el título "JUEGOTODO" y su descripción', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    
    expect(screen.getByText('JUEGOTODO')).toBeTruthy();
    expect(screen.getByText(/Tu tienda digital de confianza/i)).toBeTruthy();
  });

  it('renderiza las columnas de navegación (Moléculas) con sus enlaces correspondientes', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    
    // Verifica que los títulos de las tres moléculas FooterNav se rendericen
    expect(screen.getByText('EXPLORAR')).toBeTruthy();
    expect(screen.getByText('LEGAL')).toBeTruthy();
    expect(screen.getByText('COMUNIDAD')).toBeTruthy();
    
    // Verifica que existan enlaces representativos de las listas
    expect(screen.getByRole('link', { name: 'Catálogo de Juegos' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Discord' })).toBeTruthy();
  });

  it('renderiza la barra inferior de copyright con el año dinámico actual', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    
    const añoActual = new Date().getFullYear();
    // Creamos una expresión regular para buscar el texto exacto sin importar los espacios alrededor
    const textoCopyright = new RegExp(`${añoActual} Juegotodo\\. Todos los derechos reservados\\.`);
    
    expect(screen.getByText(textoCopyright)).toBeTruthy();
  });
});