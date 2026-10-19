import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Text from '../atoms/Text';
import Image from '../atoms/Image';

function ProductDetailCard({ product, esFavorito, onToggleFavorito }) {
  const navigate = useNavigate();

  const titulo = product.name || product.title || product.nombre;
  const descripcion = product.description || product.descripcion;
  const precio = product.price || product.precio;
  const imagen = product.image || product.imagen;
  const categoria = product.category || product.categoria;
  const urlOficial = product.link || product.url || product.enlace || 'https://store.steampowered.com';

  return (
    <div className="product-detail-card">
      <Row className="align-items-center g-4">
        <Col md={6}>
          <div className="product-detail-img-box">
            <Image src={imagen} alt={titulo} className="product-detail-img" />
          </div>
        </Col>

        <Col md={6} className="d-flex flex-column justify-content-between">
          <div>
            {categoria && (
              <Text variant="span" className="product-detail-badge">
                {categoria}
              </Text>
            )}

            <Text variant="h1" className="product-detail-title">
              {titulo}
            </Text>

            <Text variant="p" className="product-detail-desc">
              {descripcion}
            </Text>

            <Text variant="h2" className="product-detail-price">
              Precio:{' '}
              <Text variant="span" className="product-detail-price-num">
                ${Number(precio).toLocaleString('es-CL')}
              </Text>
            </Text>
          </div>

          <div className="d-flex flex-column gap-3 mt-2">
            <button
              onClick={onToggleFavorito}
              className={`btn-sesion-neon py-2 px-4 d-flex align-items-center justify-content-center gap-2 ${
                esFavorito ? 'btn-fav-active' : ''
              }`}
              style={{ cursor: 'pointer', fontSize: '0.95rem' }}
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

            <div className="d-flex gap-3">
              <button
                onClick={() => window.open(urlOficial, '_blank')}
                className="btn-sesion-neon py-2 px-3 flex-grow-1 btn-detalles-dark"
                style={{ cursor: 'pointer', fontSize: '0.9rem' }}
              >
                Ver detalles
              </button>

              <button
                onClick={() => navigate('/products')}
                className="btn-sesion-neon py-2 px-4 btn-volver-muted"
                style={{ cursor: 'pointer', fontSize: '0.95rem' }}
              >
                VOLVER
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetailCard;