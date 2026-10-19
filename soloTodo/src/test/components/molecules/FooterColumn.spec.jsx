// src/test/components/molecules/FooterColumn.spec.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FooterColumn from '../../../components/molecules/FooterColumn';

describe('FooterColumn Component', () => {
  const mockEnlaces = [
    { texto: 'Inicio', ruta: '/' },
    { texto: 'Nosotros', ruta: '/nosotros' }
  ];

  it('renderiza el título correctamente como un elemento h5', () => {
    render(
      <MemoryRouter>
        <FooterColumn titulo="Navegación" enlaces={mockEnlaces} />
      </MemoryRouter>
    );
    
    const titleElement = screen.getByText('Navegación');
    
    expect(titleElement).toBeTruthy();
    expect(titleElement.tagName).toBe('H5');
  });

  it('renderiza exactamente la cantidad de elementos de lista proporcionados en la prop "enlaces"', () => {
    render(
      <MemoryRouter>
        <FooterColumn titulo="Navegación" enlaces={mockEnlaces} />
      </MemoryRouter>
    );
    
    const listItems = screen.getAllByRole('listitem');
    
    expect(listItems.length).toBe(2);
  });

  it('renderiza los enlaces (átomos) con el texto y la ruta (href) correspondientes', () => {
    render(
      <MemoryRouter>
        <FooterColumn titulo="Navegación" enlaces={mockEnlaces} />
      </MemoryRouter>
    );
    
    const firstLink = screen.getByRole('link', { name: 'Inicio' });
    const secondLink = screen.getByRole('link', { name: 'Nosotros' });
    
    expect(firstLink).toBeTruthy();
    expect(firstLink.getAttribute('href')).toBe('/');
    
    expect(secondLink).toBeTruthy();
    expect(secondLink.getAttribute('href')).toBe('/nosotros');
  });
});