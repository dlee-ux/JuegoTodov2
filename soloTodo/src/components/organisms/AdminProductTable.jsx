import React from 'react';
import { Table } from 'react-bootstrap';
import Image from '../atoms/Image';
import Text from '../atoms/Text';

function AdminProductTable({ productos, onEdit, onDelete }) {
  return (
    <Table responsive variant="dark" striped bordered hover className="admin-tabla">
      <thead>
        <tr>
          <th>ID</th>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Precio (CLP)</th>
          <th>Oferta</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((p) => {
          const nombre = p.name || p.nombre;
          const categoria = p.category || p.categoria;
          const precio = p.price || p.precio;
          const imagen = p.image || p.imagen;

          return (
            <tr key={p.id} className="align-middle">
              <td>{p.id}</td>
              <td>
                <Image src={imagen} alt={nombre} className="admin-img-thumb" />
              </td>
              <td>
                <Text variant="strong">{nombre}</Text>
              </td>
              <td>{categoria}</td>
              <td>${Number(precio).toLocaleString('es-CL')}</td>
              <td>{p.oferta ? ' SÍ' : 'NO'}</td>
              <td>
                {/* 👇 Aquí está el contenedor mágico que separa los botones y los acomoda en celular */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <button
                    onClick={() => onEdit(p)}
                    className="btn-sesion-neon py-1 px-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="btn-sesion-neon admin-btn-eliminar py-1 px-2"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default AdminProductTable;