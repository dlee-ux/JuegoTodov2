<<<<<<< HEAD
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
=======
// src/test/components/molecules/SearchBar.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../../components/molecules/SearchBar';

describe('SearchBar Molecule', () => {
  const mockOnSearch = jasmine.createSpy('onSearch');

  beforeEach(() => {
    mockOnSearch.calls.reset(); // Limpia el historial del espía antes de cada prueba
  });

  it('renderiza el campo de texto y el botón de búsqueda', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Buscar productos...');
    const button = screen.getByRole('button', { name: /buscar/i });

    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('permite al usuario escribir en el campo de texto', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Buscar productos...');
    
    fireEvent.change(input, { target: { value: 'Zapatillas' } });
    
    expect(input.value).toBe('Zapatillas');
  });

  it('ejecuta la función onSearch con el valor escrito al hacer clic en el botón', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Buscar productos...');
    const button = screen.getByRole('button', { name: /buscar/i });

    // 1. El usuario escribe
    fireEvent.change(input, { target: { value: 'Laptop' } });
    
    // 2. El usuario hace clic en buscar
    fireEvent.click(button);

    // 3. Verificamos que la función recibida por props se haya llamado con 'Laptop'
    expect(mockOnSearch).toHaveBeenCalledWith('Laptop');
>>>>>>> 85a064229c1a81749e535262809c78f2d584f816
  });
});