// src/test/components/organisms/AdminProductModal.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminProductModal from '../../../components/organisms/AdminProductModal';

describe('AdminProductModal Organism', () => {
  const mockSetForm = jasmine.createSpy('setForm');
  const mockOnSubmit = jasmine.createSpy('onSubmit').and.callFake((e) => e.preventDefault());
  const mockOnHide = jasmine.createSpy('onHide');

  const defaultForm = {
    nombre: 'Super Mario',
    categoria: 'AVENTURA',
    precio: '35000',
    imagen: 'mario.jpg',
    descripcion: 'Un clásico de Nintendo',
    oferta: false
  };

  const baseProps = {
    show: true,
    onHide: mockOnHide,
    onSubmit: mockOnSubmit,
    setForm: mockSetForm,
    form: defaultForm
  };

  beforeEach(() => {
    mockSetForm.calls.reset();
    mockOnSubmit.calls.reset();
    mockOnHide.calls.reset();
  });

  it('renderiza el modal en modo "NUEVO JUEGO" cuando no se proporciona un editId', () => {
    render(<AdminProductModal {...baseProps} editId={null} />);
    
    expect(screen.getByText('NUEVO JUEGO')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'CREAR JUEGO' })).toBeTruthy();
    
    expect(screen.getByDisplayValue('Super Mario')).toBeTruthy();
    expect(screen.getByDisplayValue('35000')).toBeTruthy();
  });

  it('renderiza el modal en modo "EDITAR JUEGO" cuando se proporciona un editId', () => {
    render(<AdminProductModal {...baseProps} editId={10} />);
    
    expect(screen.getByText('EDITAR JUEGO')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'GUARDAR CAMBIOS' })).toBeTruthy();
  });

  it('actualiza el estado del formulario al interactuar y llama a onSubmit al guardar', () => {
    render(<AdminProductModal {...baseProps} editId={null} />);
    
    const checkbox = screen.getByLabelText(/Marcar como Oferta Destacada/i);
    fireEvent.click(checkbox);
    
    expect(mockSetForm).toHaveBeenCalledWith({ ...defaultForm, oferta: true });
    
    const submitButton = screen.getByRole('button', { name: 'CREAR JUEGO' });
    fireEvent.click(submitButton);
    
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});