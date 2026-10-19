import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom'; 
import ProductCard from '../components/organisms/ProductCard';
import { getProducts } from '../data/products'; 
import '../styles/global.css';

function Products() {
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [listaJuegos, setListaJuegos] = useState([]);
  const [searchParams] = useSearchParams();
  const categoriaUrl = searchParams.get('categoria');

  useEffect(() => {
    setListaJuegos(getProducts());
  }, []);

  useEffect(() => {
    if (categoriaUrl) {
      setCategoriaActiva(categoriaUrl.toUpperCase());
    } else {
      setCategoriaActiva(null);
    }
  }, [categoriaUrl]);

  const categorias = [
    { nombre: 'ACCION', img: '/img/accion.png' },
    { nombre: 'DEPORTE', img: '/img/deporte1.png' },
    { nombre: 'HISTORIA', img: '/img/historia..png' },
    { nombre: 'SHOOTERS', img: '/img/shoter.png' },
    { nombre: 'MULTIJUGADOR', img: '/img/multijugador1.png' }
  ];

  const seleccionarCategoria = (nombre) => {
    if (categoriaActiva === nombre) {
      setCategoriaActiva(null);
    } else {
      setCategoriaActiva(nombre);
    }
  };

  const juegosFiltrados = listaJuegos.filter(
    (juego) => (juego.category || juego.categoria)?.toUpperCase() === categoriaActiva
  );

  return (
    <Container className="my-4">
      <div className="titulo-seccion">CATALOGO</div>

      <div 
        style={{
          border: '2px solid #3afff8',
          borderRadius: '20px',
          padding: '20px',
          maxWidth: '1150px',
          margin: '0 auto 50px auto',
          backgroundColor: '#0b0b0b'
        }}
      >
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {categorias.map((cat, index) => (
            <div
              key={index}
              onClick={() => seleccionarCategoria(cat.nombre)}
              className={`categoria-card-interactiva ${categoriaActiva === cat.nombre ? 'activa' : ''}`}
              style={{ flex: '1 1 180px', maxWidth: '210px' }}
            >
              <img src={cat.img} alt={cat.nombre} />
            </div>
          ))}
        </div>

        {categoriaActiva && (
          <div style={{ marginTop: '25px', paddingTop: '20px', borderTop: '2px solid #3afff8' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 style={{ color: '#3afff8', margin: 0 }}>
                {categoriaActiva}
              </h3>
              <button onClick={() => setCategoriaActiva(null)} className="btn-sesion-neon">
                CERRAR
              </button>
            </div>

            <Row>
              {juegosFiltrados.length > 0 ? (
                juegosFiltrados.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p style={{ color: '#aaa', textAlign: 'center' }}>No hay juegos en esta categoría.</p>
              )}
            </Row>
          </div>
        )}
      </div>

      <h2 style={{ color: '#3afff8' }} className="mb-4">
        TODOS LOS JUEGOS
      </h2>

      <Row>
        {listaJuegos.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Row>
    </Container>
  );
}

export default Products;