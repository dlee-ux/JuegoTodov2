import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();

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
      <div className="titulo-seccion" style={{ fontSize: '1.5rem', marginBottom: '30px' }}>
         MIS JUEGOS FAVORITOS
      </div>

      {favoritos.length === 0 ? (
        <div
          className="text-center p-5 mx-auto"
          style={{
            maxWidth: '600px',
            backgroundColor: '#141414',
            border: '2px solid #3afff8',
            borderRadius: '18px',
            boxShadow: '0 0 18px rgba(58, 255, 248, 0.2)'
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}></div>
          <h4 style={{ color: '#3afff8', fontWeight: 'bold' }}>
            Aun no tienes juegos guardados en favoritos
          </h4>
          <p style={{ color: '#cccccc', marginTop: '10px' }}>
            Explora el catalogo y guarda los juegos que mas te gusten.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="btn-sesion-neon mt-3 py-2 px-4"
            style={{ cursor: 'pointer' }}
          >
            IR AL CATALOGO
          </button>
        </div>
      ) : (
        <Row>
          {favoritos.map((product) => {
            const titulo = product.name || product.title || product.nombre;
            const descripcion = product.description || product.descripcion;
            const precio = product.price || product.precio;
            const imagen = product.image || product.imagen;

            return (
              <Col key={product.id} xs={12} md={6} lg={4} className="mb-4">
                <Card
                  className="h-100"
                  style={{
                    backgroundColor: '#141414',
                    border: '2px solid #3afff8',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 0 15px rgba(58, 255, 248, 0.18)',
                    color: '#ffffff'
                  }}
                >
                  <div style={{ height: '210px', overflow: 'hidden', borderBottom: '1px solid rgba(58, 255, 248, 0.3)' }}>
                    <Card.Img
                      variant="top"
                      src={imagen}
                      alt={titulo}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <Card.Body className="d-flex flex-column justify-content-between p-4">
                    <div>
                      <Card.Title style={{ color: '#3afff8', fontWeight: '800', fontSize: '1.2rem' }}>
                        {titulo}
                      </Card.Title>
                      <Card.Text style={{ color: '#cccccc', fontSize: '0.92rem' }}>
                        {descripcion}
                      </Card.Text>
                    </div>

                    <div
                      className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-4 pt-3"
                      style={{ borderTop: '1px solid #262626' }}
                    >
                      <span style={{ color: '#3afff8', fontSize: '1.3rem', fontWeight: '900' }}>
                        ${Number(precio).toLocaleString('es-CL')}
                      </span>

                      <div className="d-flex gap-2">
                        <button
                          onClick={() => navigate(`/products/${product.id}`)}
                          className="btn-sesion-neon"
                          style={{ cursor: 'pointer' }}
                        >
                          Ver
                        </button>
                        <button
                          onClick={() => quitarDeFavoritos(product.id)}
                          className="btn-sesion-neon"
                          style={{ cursor: 'pointer', borderColor: '#ff4d4d', color: '#ff6b6b' }}
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
          })}
        </Row>
      )}
    </Container>
  );
}

export default Favoritos;