import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../data/products';
import Text from '../components/atoms/Text';
import AdminLoginForm from '../components/organisms/AdminLoginForm';
import AdminProductTable from '../components/organisms/AdminProductTable';
import AdminProductModal from '../components/organisms/AdminProductModal';
import '../styles/admin.css';

function Admin() {
  const [esAdmin, setEsAdmin] = useState(false);
  const [credenciales, setCredenciales] = useState({ usuario: '', password: '' });
  const [errorLogin, setErrorLogin] = useState('');

  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    nombre: '',
    categoria: 'ACCION',
    precio: '',
    descripcion: '',
    imagen: '',
    oferta: false
  });

  useEffect(() => {
    const adminSesion = localStorage.getItem('admin_autenticado');
    if (adminSesion === 'true') {
      setEsAdmin(true);
      setProductos(getProducts());
    }
  }, []);

  const handleLoginAdmin = (e) => {
    e.preventDefault();
    if (credenciales.usuario === 'admin' && credenciales.password === 'admin123') {
      localStorage.setItem('admin_autenticado', 'true');
      setEsAdmin(true);
      setErrorLogin('');
      setProductos(getProducts());
    } else {
      setErrorLogin('Usuario o contraseña de administrador incorrectos');
    }
  };

  const handleCerrarSesionAdmin = () => {
    localStorage.removeItem('admin_autenticado');
    setEsAdmin(false);
  };

  const cargarProductos = () => {
    setProductos(getProducts());
  };

  const handleOpenModal = (prod = null) => {
    if (prod) {
      setEditId(prod.id);
      setForm({
        nombre: prod.name || prod.nombre || '',
        categoria: prod.category || prod.categoria || 'ACCION',
        precio: prod.price || prod.precio || '',
        descripcion: prod.description || prod.descripcion || '',
        imagen: prod.image || prod.imagen || '',
        oferta: prod.oferta || false
      });
    } else {
      setEditId(null);
      setForm({
        nombre: '',
        categoria: 'ACCION',
        precio: '',
        descripcion: '',
        imagen: 'https://via.placeholder.com/400x300',
        oferta: false
      });
    }
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const datosProducto = {
      name: form.nombre,
      title: form.nombre,
      nombre: form.nombre,
      category: form.categoria,
      categoria: form.categoria,
      price: Number(form.precio),
      precio: Number(form.precio),
      description: form.descripcion,
      descripcion: form.descripcion,
      image: form.imagen,
      imagen: form.imagen,
      oferta: form.oferta
    };

    if (editId) {
      updateProduct(editId, datosProducto);
    } else {
      createProduct(datosProducto);
    }

    setShowModal(false);
    cargarProductos();
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este juego del catálogo?')) {
      deleteProduct(id);
      cargarProductos();
    }
  };

  // FORMULARIO LOGIN <
  if (!esAdmin) {
    return (
      <Container className="my-5" style={{ maxWidth: '440px' }}>
        <AdminLoginForm
          credenciales={credenciales}
          setCredenciales={setCredenciales}
          onSubmit={handleLoginAdmin}
          errorLogin={errorLogin}
        />
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="admin-header">
        <div>
          <Text variant="h2" className="admin-titulo">
            PANEL ADMINISTRATIVO
          </Text>
          <Text variant="span" style={{ color: '#888', fontSize: '0.85rem' }}>
            Sesión activa como Administrador
          </Text>
        </div>

        <div className="d-flex gap-2">
          <button onClick={() => handleOpenModal()} className="btn-sesion-neon py-2 px-3">
            + AGREGAR JUEGO
          </button>
          <button
            onClick={handleCerrarSesionAdmin}
            className="btn-sesion-neon py-2 px-3"
            style={{ borderColor: '#ff4d4d', color: '#ff6b6b' }}
          >
            SALIR
          </button>
        </div>
      </div>

      <AdminProductTable
        productos={productos}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
      />

      <AdminProductModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={handleSave}
        editId={editId}
        form={form}
        setForm={setForm}
      />
    </Container>
  );
}

export default Admin;