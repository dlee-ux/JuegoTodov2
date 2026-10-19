import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Text from '../atoms/Text';

function ProductDetailNotFound() {
  const navigate = useNavigate();

  return (
    <Container className="my-5 text-center">
      <Text variant="h2" style={{ color: '#3afff8' }}>
        Juego no encontrado
      </Text>
      <button
        onClick={() => navigate('/products')}
        className="btn-sesion-neon mt-3 py-2 px-4"
        style={{ cursor: 'pointer' }}
      >
        VOLVER AL CATÁLOGO
      </button>
    </Container>
  );
}

export default ProductDetailNotFound;