import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import ProductCard from '../components/organisms/ProductCard';
import CategoryFilterSection from '../components/organisms/CategoryFilterSection';
import Text from '../components/atoms/Text';
import { getProducts } from '../data/products';
import '../styles/product.css';

function Products() {
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [listaJuegos, setListaJuegos] = useState([]);

  useEffect(() => {
    setListaJuegos(getProducts());
  }, []);

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
    (juego) => (juego.category || juego.categoria) === categoriaActiva
  );

  return (
    <Container className="my-4">
      <Text variant="div" className="titulo-seccion">
        CATALOGO
      </Text>

      <CategoryFilterSection
        categorias={categorias}
        categoriaActiva={categoriaActiva}
        onSelectCategory={seleccionarCategoria}
        juegosFiltrados={juegosFiltrados}
        onCerrar={() => setCategoriaActiva(null)}
      />

      <Text variant="h2" className="products-all-title">
        TODOS LOS JUEGOS
      </Text>

      <Row>
        {listaJuegos.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Row>
    </Container>
  );
}

export default Products;