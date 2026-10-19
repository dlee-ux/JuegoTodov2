// src/test/components/molecules/Texts.spec.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Texts } from '../../../components/molecules/Texts';

describe('Texts Component', () => {
  it('renderiza sin errores cuando no se proporcionan items (usa el array vacío por defecto)', () => {
    const { container } = render(<Texts />);
    
    // Al pasar un array vacío, no debe renderizar ningún elemento HTML dentro del fragmento
    expect(container.children.length).toBe(0);
  });

  it('renderiza la cantidad correcta de elementos de texto según el array proporcionado', () => {
    const mockItems = [
      { text: 'Primer párrafo', variant: 'p' },
      { text: 'Subtítulo', variant: 'h2' },
      { text: 'Aviso legal', variant: 'span' }
    ];
    
    render(<Texts items={mockItems} />);
    
    expect(screen.getByText('Primer párrafo')).toBeTruthy();
    expect(screen.getByText('Subtítulo')).toBeTruthy();
    expect(screen.getByText('Aviso legal')).toBeTruthy();
  });

  it('aplica correctamente las propiedades variant (etiqueta HTML) y className a cada elemento', () => {
    const mockItems = [
      { text: 'Título Principal', variant: 'h1', className: 'text-primary text-bold' }
    ];
    
    render(<Texts items={mockItems} />);
    
    const titleElement = screen.getByText('Título Principal');
    
    expect(titleElement.tagName).toBe('H1');
    expect(titleElement.classList.contains('text-primary')).toBeTrue();
    expect(titleElement.classList.contains('text-bold')).toBeTrue();
  });
});