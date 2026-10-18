import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
// 👇 Importamos getProducts para asegurar que siempre tenga el precio actualizado
import { getProducts } from '../data/products';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 👇 Leemos desde la memoria fresca
  const product = getProducts().find((p) => p.id === Number(id));
  const [esFavorito, setEsFavorito] = useState(false);

  // Revisa al cargar si este juego ya está guardado en favoritos
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('favoritos_juegotodo')) || [];
    const existe = guardados.some((fav) => fav.id === Number(id));
    setEsFavorito(existe);
  }, [id]);

  if (!product) {
    return (
      <Container className="my-5 text-center">
        <h2 style={{ color: '#3afff8' }}>Juego no encontrado</h2>
        <button onClick={() => navigate('/products')} className="btn-sesion-neon mt-3">
          VOLVER AL CATÁLOGO
        </button>
      </Container>
    );
  }

  const titulo = product.name || product.title || product.nombre;
  const descripcion = product.description || product.descripcion;
  const precio = product.price || product.precio;
  const imagen = product.image || product.imagen;
  const categoria = product.category || product.categoria;
  
  // 👇 Ahora lee tu propiedad "link" desde products.js
  const urlOficial = product.link || product.url || product.enlace || 'https://store.steampowered.com';

  // Agrega o quita el juego de favoritos
  const toggleFavorito = () => {
    const guardados = JSON.parse(localStorage.getItem('favoritos_juegotodo')) || [];
    let nuevaLista;

    if (esFavorito) {
      nuevaLista = guardados.filter((fav) => fav.id !== product.id);
      setEsFavorito(false);
    } else {
      nuevaLista = [...guardados, product];
      setEsFavorito(true);
    }

    localStorage.setItem('favoritos_juegotodo', JSON.stringify(nuevaLista));
    // Avisa a la barra superior para que actualice el contador al instante
    window.dispatchEvent(new Event('favoritosActualizados'));
  };

  return (
    <Container className="my-5" style={{ maxWidth: '950px' }}>
      <div
        style={{
          backgroundColor: '#141414',
          border: '2px solid #3afff8',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 0 22px rgba(58, 255, 248, 0.25)'
        }}
      >
        <Row className="align-items-center g-4">
          <Col md={6}>
            <div
              style={{
                border: '2px solid #3afff8',
                borderRadius: '14px',
                overflow: 'hidden',
                height: '340px'
              }}
            >
              <img
                src={imagen}
                alt={titulo}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </Col>

          <Col md={6} className="d-flex flex-column justify-content-between">
            <div>
              {categoria && (
                <span
                  style={{
                    display: 'inline-block',
                    border: '1px solid #3afff8',
                    color: '#3afff8',
                    padding: '4px 12px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    marginBottom: '12px'
                  }}
                >
                  {categoria}
                </span>
              )}

              <h1 style={{ color: '#3afff8', fontWeight: '900', marginBottom: '15px' }}>
                {titulo}
              </h1>

              <p style={{ color: '#d0d0d0', fontSize: '1.05rem', lineHeight: '1.6' }}>
                {descripcion}
              </p>

              <h2 style={{ color: '#ffffff', fontWeight: '900', margin: '25px 0' }}>
                Precio: <span style={{ color: '#3afff8' }}>${Number(precio).toLocaleString('es-CL')}</span>
              </h2>
            </div>

            <div className="d-flex flex-column gap-3 mt-2">
              <button
                onClick={toggleFavorito}
                className="btn-sesion-neon py-2 px-4 d-flex align-items-center justify-content-center gap-2"
                style={{
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  backgroundColor: esFavorito ? 'rgba(58, 255, 248, 0.15)' : 'transparent',
                  boxShadow: esFavorito ? '0 0 15px rgba(58, 255, 248, 0.4)' : 'none'
                }}
              >
                {esFavorito ? 'QUITAR DE FAVORITOS' : 'AGREGAR A FAVORITOS'}
              </button>

              {esFavorito && (
                <button
                  onClick={() => navigate('/favoritos')}
                  className="btn-sesion-neon py-2 px-3"
                  style={{ cursor: 'pointer', fontSize: '0.9rem' }}
                >
                  VER MIS FAVORITOS
                </button>
              )}

              {/* Fila con Pagina oficial y Volver */}
              <div className="d-flex gap-3">
                <button
                  onClick={() => window.open(urlOficial, '_blank')}
                  className="btn-sesion-neon py-2 px-3 flex-grow-1"
                  style={{ cursor: 'pointer', fontSize: '0.9rem', backgroundColor: '#141414' }}
                >
                  Ver detalles
                </button>

                <button
                  onClick={() => navigate('/products')}
                  className="btn-sesion-neon py-2 px-4"
                  style={{ cursor: 'pointer', fontSize: '0.95rem', borderColor: '#3afff8', color: '#ccc', backgroundColor: '#141414' }}
                >
                  VOLVER
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default ProductDetail;