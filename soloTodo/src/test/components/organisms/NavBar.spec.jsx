// src/test/components/organisms/NavBar.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '../../../components/organisms/NavBar';

describe('NavBar Organism', () => {
  beforeEach(() => {
    spyOn(Storage.prototype, 'getItem').and.returnValue(null);
    spyOn(Storage.prototype, 'removeItem');
  });

  it('renderiza la barra por defecto mostrando el botón de iniciar sesión y 0 favoritos', () => {
    render(<NavBar />);
    
    expect(screen.getByText('INICIAR SESION')).toBeTruthy();
    expect(screen.getByText('JUEGOS GUARDADOS: 0')).toBeTruthy();
    
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toBeTruthy();
  });

  it('renderiza el saludo y el contador de favoritos cuando hay un usuario en localStorage', () => {
    Storage.prototype.getItem.and.callFake((key) => {
      if (key === 'usuarioLogueado') return JSON.stringify({ usuario: 'GamerPro' });
      if (key === 'favoritos_juegotodo') return JSON.stringify(['id1', 'id2', 'id3']);
      return null;
    });

    render(<NavBar />);
    
    expect(screen.getByText('GamerPro')).toBeTruthy();
    expect(screen.getByText('CERRAR SESION')).toBeTruthy();
    
    expect(screen.getByText('JUEGOS GUARDADOS: 3')).toBeTruthy();
  });

  it('abre el menú lateral (Offcanvas) al hacer clic en el botón de hamburguesa', () => {
    render(<NavBar />);
    
    const botonHamburguesa = screen.getByRole('button', { name: 'Abrir menú' });
    fireEvent.click(botonHamburguesa);
    
    expect(screen.getByText('CATALOGO COMPLETO')).toBeTruthy();
    expect(screen.getByText('CATEGORIAS RAPIDAS')).toBeTruthy();
    
    const enlaceAccion = screen.getByText('Accion');
    expect(enlaceAccion).toBeTruthy();
    expect(enlaceAccion.getAttribute('href')).toBe('/products?categoria=ACCION');
  });
});