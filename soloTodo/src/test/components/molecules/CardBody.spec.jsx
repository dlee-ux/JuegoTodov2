// src/test/components/molecules/CardBody.spec.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import CardBody from '../../../components/molecules/CardBody';

describe('CardBody Component', () => {
  it('renderiza el título correctamente como un elemento h5', () => {
    render(<CardBody title="Consola Retro" description="Descripción de prueba" price={50} />);
    
    const titleElement = screen.getByText('Consola Retro');
    
    expect(titleElement).toBeTruthy();
    expect(titleElement.tagName).toBe('H5');
  });

  it('renderiza la descripción correctamente como un párrafo (p)', () => {
    render(<CardBody title="Consola" description="Incluye 2 controles y 500 juegos." price={50} />);
    
    const descriptionElement = screen.getByText('Incluye 2 controles y 500 juegos.');
    
    expect(descriptionElement).toBeTruthy();
    expect(descriptionElement.tagName).toBe('P');
  });

  it('renderiza el precio con el prefijo "$" y aplica la clase text-muted', () => {
    render(<CardBody title="Consola" description="Descripción" price={15000} />);
    
    const priceElement = screen.getByText('$15000');
    
    expect(priceElement).toBeTruthy();
    expect(priceElement.tagName).toBe('SPAN');
    expect(priceElement.classList.contains('text-muted')).toBeTrue();
  });
});