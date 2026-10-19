import React from 'react';
import { useNavigate } from 'react-router-dom';
import Text from '../atoms/Text';

function FavoritosEmptyState() {
  const navigate = useNavigate();

  return (
    <div className="favoritos-vacio-box">
      <Text variant="h4" className="favoritos-vacio-titulo">
        Aún no tienes juegos guardados en favoritos
      </Text>
      <Text variant="p" className="favoritos-vacio-texto">
        Explora el catálogo y guarda los juegos que más te gusten.
      </Text>
      <button
        onClick={() => navigate('/products')}
        className="btn-sesion-neon mt-3 py-2 px-4"
        style={{ cursor: 'pointer' }}
      >
        IR AL CATÁLOGO
      </button>
    </div>
  );
}

export default FavoritosEmptyState;