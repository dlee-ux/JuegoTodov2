import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Text from '../components/atoms/Text';
import FavoritosEmptyState from '../components/organisms/FavoritosEmptyState';
import FavoriteCard from '../components/organisms/FavoriteCard';
import '../styles/favoritos.css';

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('favoritos_juegotodo')) || [];
    setFavoritos(guardados);
  }, []);

  const quitarDeFavoritos = (id) => {
    const actualizados = favoritos.filter((juego) => juego.id !== id);
    setFavoritos(actualizados);
    localStorage.setItem('favoritos_juegotodo', JSON.stringify(actualizados));
    window.dispatchEvent(new Event('favoritosActualizados'));
  };

  return (
    <Container className="my-5">
      <Text variant="div" className="titulo-seccion">
        MIS JUEGOS FAVORITOS
      </Text>

      {favoritos.length === 0 ? (
        <FavoritosEmptyState />
      ) : (
        <Row>
          {favoritos.map((product) => (
            <FavoriteCard
              key={product.id}
              product={product}
              onQuitar={quitarDeFavoritos}
            />
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Favoritos;