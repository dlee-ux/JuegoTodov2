// src/test/components/atoms/Input.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../components/atoms/Input';

describe('Input Component', () => {
  it('renderiza con el tipo "text" por defecto y las clases base de Bootstrap/Admin', () => {
    render(<Input placeholder="Ingresa tu nombre" />);
    
    const inputElement = screen.getByPlaceholderText('Ingresa tu nombre');
    
    expect(inputElement).toBeTruthy();
    expect(inputElement.getAttribute('type')).toBe('text');
    expect(inputElement.classList.contains('form-control')).toBeTrue();
    expect(inputElement.classList.contains('admin-input-field')).toBeTrue();
  });

  it('aplica un tipo diferente y concatena clases personalizadas correctamente', () => {
    render(<Input type="email" className="mi-clase-extra" data-testid="custom-input" />);
    
    const inputElement = screen.getByTestId('custom-input');
    
    expect(inputElement.getAttribute('type')).toBe('email');
    expect(inputElement.classList.contains('mi-clase-extra')).toBeTrue();
    expect(inputElement.classList.contains('form-control')).toBeTrue(); 
  });

  it('pasa props adicionales (...props) y responde a eventos del usuario', () => {
    const handleChange = jasmine.createSpy('handleChange');
    render(<Input placeholder="Buscador" onChange={handleChange} />);
    
    const inputElement = screen.getByPlaceholderText('Buscador');
    
    fireEvent.change(inputElement, { target: { value: 'PlayStation 5' } });
    
    expect(handleChange).toHaveBeenCalled();
    expect(inputElement.value).toBe('PlayStation 5');
  });
});