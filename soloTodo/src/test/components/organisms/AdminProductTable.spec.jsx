// src/test/components/organisms/AdminProductTable.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminProductTable from '../../../components/organisms/AdminProductTable';

describe('AdminProductTable Organism', () => {
  const mockOnEdit = jasmine.createSpy('onEdit');
  const mockOnDelete = jasmine.createSpy('onDelete');

  const mockProductos = [
    { id: 1, name: 'Juego Inglés', category: 'ACCION', price: 15000, image: 'juego1.jpg', oferta: true },
    { id: 2, nombre: 'Juego Español', categoria: 'ROL', precio: 25000, imagen: 'juego2.jpg', oferta: false }
  ];

  beforeEach(() => {
    mockOnEdit.calls.reset();
    mockOnDelete.calls.reset();
  });

  it('renderiza correctamente los encabezados de la tabla y las filas de los productos', () => {
    render(<AdminProductTable productos={mockProductos} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('Nombre')).toBeTruthy();
    expect(screen.getByText('Categoría')).toBeTruthy();
    expect(screen.getByText('Acciones')).toBeTruthy();
    
    expect(screen.getByText('Juego Inglés')).toBeTruthy();
    expect(screen.getByText('Juego Español')).toBeTruthy();
  });

  it('normaliza las propiedades (inglés/español) y formatea el precio y la oferta correctamente', () => {
    render(<AdminProductTable productos={mockProductos} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    expect(screen.getByText(' SÍ')).toBeTruthy(); 
    expect(screen.getByText('NO')).toBeTruthy();  
    
    expect(screen.getByText('$15.000')).toBeTruthy();
    expect(screen.getByText('$25.000')).toBeTruthy();
  });

  it('ejecuta onEdit con el objeto completo y onDelete con el ID al hacer clic en los botones respectivos', () => {
    render(<AdminProductTable productos={mockProductos} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    const editButtons = screen.getAllByRole('button', { name: 'Editar' });
    const deleteButtons = screen.getAllByRole('button', { name: 'Eliminar' });
    
    fireEvent.click(editButtons[0]);
    expect(mockOnEdit).toHaveBeenCalledWith(mockProductos[0]);
    
    fireEvent.click(deleteButtons[1]);
    expect(mockOnDelete).toHaveBeenCalledWith(2); 
  });
});