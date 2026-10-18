// src/test/components/atoms/Image.spec.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '../../../components/atoms/Image';

describe('Image Component', () => {
  it('renderiza la imagen con los atributos src y alt correctos', () => {
    render(<Image src="producto.jpg" alt="Imagen de producto" />);
    
    const imageElement = screen.getByRole('img', { name: 'Imagen de producto' });
    
    expect(imageElement).toBeTruthy();
    expect(imageElement.getAttribute('src')).toBe('producto.jpg');
    expect(imageElement.getAttribute('alt')).toBe('Imagen de producto');
  });

  it('aplica correctamente la clase CSS proporcionada mediante className', () => {
    render(<Image src="logo.png" alt="Logo" className="img-fluid rounded" />);
    
    const imageElement = screen.getByRole('img', { name: 'Logo' });
    
    expect(imageElement.classList.contains('img-fluid')).toBeTrue();
    expect(imageElement.classList.contains('rounded')).toBeTrue();
  });

  it('renderiza correctamente sin clases adicionales si no se proporciona className', () => {
    render(<Image src="banner.jpg" alt="Banner" />);
    
    const imageElement = screen.getByRole('img', { name: 'Banner' });
    
    expect(imageElement.getAttribute('class')).toBeNull(); 
  });
});