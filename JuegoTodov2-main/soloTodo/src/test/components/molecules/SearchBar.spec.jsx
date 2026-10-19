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
  });
});