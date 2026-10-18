// src/test/components/atoms/Text.spec.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from '../../../components/atoms/Text';

describe('Text Component', () => {
  it('renderiza como una etiqueta <p> por defecto y muestra los children', () => {
    render(<Text>Texto de prueba por defecto</Text>);
    
    const textElement = screen.getByText('Texto de prueba por defecto');
    
    expect(textElement).toBeTruthy();
    expect(textElement.tagName).toBe('P'); 
  });

  it('renderiza la etiqueta HTML correspondiente según la prop "variant"', () => {
    render(<Text variant="h1">Título Principal</Text>);
    
    const textElement = screen.getByText('Título Principal');
    
    expect(textElement).toBeTruthy();
    expect(textElement.tagName).toBe('H1');
  });

  it('aplica correctamente las clases CSS proporcionadas mediante className', () => {
    render(
      <Text className="text-bold text-center text-primary">
        Texto con estilos
      </Text>
    );
    
    const textElement = screen.getByText('Texto con estilos');
    
    expect(textElement.classList.contains('text-bold')).toBeTrue();
    expect(textElement.classList.contains('text-center')).toBeTrue();
    expect(textElement.classList.contains('text-primary')).toBeTrue();
  });
});