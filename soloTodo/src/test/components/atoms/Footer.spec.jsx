// src/test/components/atoms/Footer.spec.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../../../components/atoms/Footer';

describe('Footer Component', () => {
  it('renderiza un enlace externo con atributos de seguridad si la ruta empieza con "http"', () => {
    render(<Footer to="https://facebook.com">Redes Sociales</Footer>);
    
    const externalLink = screen.getByRole('link', { name: 'Redes Sociales' });
    
    expect(externalLink.getAttribute('href')).toBe('https://facebook.com');
    expect(externalLink.getAttribute('target')).toBe('_blank');
    expect(externalLink.getAttribute('rel')).toBe('noreferrer');
  });

  it('renderiza un enlace interno de navegación si la ruta es relativa', () => {
    render(
      <MemoryRouter>
        <Footer to="/contacto">Contacto</Footer>
      </MemoryRouter>
    );
    
    const internalLink = screen.getByRole('link', { name: 'Contacto' });
    
    expect(internalLink.getAttribute('href')).toBe('/contacto');
    expect(internalLink.hasAttribute('target')).toBe(false);
  });

  it('renderiza correctamente los children y aplica la clase base "footer-atom"', () => {
    render(
      <MemoryRouter>
        <Footer to="/nosotros">Sobre Nosotros</Footer>
      </MemoryRouter>
    );
    
    const linkElement = screen.getByText('Sobre Nosotros');
    
    expect(linkElement).toBeTruthy();
    expect(linkElement.classList.contains('footer-atom')).toBeTrue();
  });
});