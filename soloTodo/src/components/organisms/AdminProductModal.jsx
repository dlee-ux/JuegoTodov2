import React from 'react';
import { Modal } from 'react-bootstrap';
import Text from '../atoms/Text';
import Input from '../atoms/Input';

function AdminProductModal({ show, onHide, onSubmit, editId, form, setForm }) {
  return (
    <Modal show={show} onHide={onHide} centered contentClassName="admin-modal-content">
      <Modal.Header closeButton closeVariant="white" className="admin-modal-header">
        <Modal.Title>
          <Text variant="span" className="admin-titulo">
            {editId ? 'EDITAR JUEGO' : 'NUEVO JUEGO'}
          </Text>
        </Modal.Title>
      </Modal.Header>

      <form onSubmit={onSubmit}>
        <Modal.Body className="d-flex flex-column gap-3">
          <div>
            <Text variant="label" className="admin-label">Nombre del Juego</Text>
            <Input
              type="text"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              required
            />
          </div>

          <div>
            <Text variant="label" className="admin-label">Categoría</Text>
            <select
              className="form-select admin-input-field"
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            >
              <option value="ACCION">Acción</option>
              <option value="DEPORTE">Deporte</option>
              <option value="HISTORIA">Historia</option>
              <option value="SHOOTERS">Shooters</option>
              <option value="MULTIJUGADOR">Multijugador</option>
              <option value="ROL">Rol</option>
              <option value="AVENTURA">Aventura</option>
              <option value="INDIE">Indie</option>
            </select>
          </div>

          <div>
            <Text variant="label" className="admin-label">Precio (CLP)</Text>
            <Input
              type="number"
              value={form.precio}
              onChange={(e) => setForm({ ...form, precio: e.target.value })}
              required
            />
          </div>

          <div>
            <Text variant="label" className="admin-label">URL de la Imagen</Text>
            <Input
              type="text"
              value={form.imagen}
              onChange={(e) => setForm({ ...form, imagen: e.target.value })}
              required
            />
          </div>

          <div>
            <Text variant="label" className="admin-label">Descripción</Text>
            <textarea
              rows="3"
              className="form-control admin-input-field"
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              required
            ></textarea>
          </div>

          <div className="form-check mt-1">
            <input
              type="checkbox"
              className="form-check-input"
              id="checkOfertaAdmin"
              checked={form.oferta}
              onChange={(e) => setForm({ ...form, oferta: e.target.checked })}
            />
            <label className="form-check-label text-light ms-1" htmlFor="checkOfertaAdmin">
              Marcar como Oferta Destacada 
            </label>
          </div>
        </Modal.Body>

        <Modal.Footer className="admin-modal-footer">
          <button type="submit" className="btn-sesion-neon py-2 px-4">
            {editId ? 'GUARDAR CAMBIOS' : 'CREAR JUEGO'}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default AdminProductModal;