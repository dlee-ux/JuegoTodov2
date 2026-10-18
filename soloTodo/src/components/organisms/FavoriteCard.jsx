import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Text from '../atoms/Text';
import Image from '../atoms/Image';

function FavoriteCard({ product, onQuitar }) {
  const navigate = useNavigate();

  const titulo = product.name || product.title || product.nombre;
  const descripcion = product.description || product.descripcion;
  const precio = product.price || product.precio;
  const imagen = product.image || product.imagen;

  return (
    <Col xs={12} md={6} lg={4} className="mb-4">
      <Card className="h-100 favorito-card">
        <div className="favorito-card-img-wrapper">
          <Image
            src={imagen}
            alt={titulo}
            className="favorito-card-img"
          />
        </div>

        <Card.Body className="d-flex flex-column justify-content-between p-4">
          <div>
            <Text variant="h5" className="favorito-card-title">
              {titulo}
            </Text>
            <Text variant="p" className="favorito-card-desc">
              {descripcion}
            </Text>
          </div>

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-4 pt-3 favorito-card-footer">
            <Text variant="span" className="favorito-card-price">
              ${Number(precio).toLocaleString('es-CL')}
            </Text>

            <div className="d-flex gap-2">
              <button
                onClick={() => navigate(`/products/${product.id}`)}
                className="btn-sesion-neon"
                style={{ cursor: 'pointer' }}
              >
                Ver
              </button>
              <button
                onClick={() => onQuitar(product.id)}
                className="btn-sesion-neon btn-quitar-neon"
                style={{ cursor: 'pointer' }}
                title="Quitar de favoritos"
              >
                Quitar
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default FavoriteCard;