import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { getProducts } from '../data/products';
import ProductCard from '../components/organisms/ProductCard';
import Text from '../components/atoms/Text';
import '../styles/ofertas.css';

function Ofertas() {
  const [productosOferta, setProductosOferta] = useState([]);

  useEffect(() => {
    const todos = getProducts();
    const filtrados = todos.filter((p) => p.oferta === true);
    setProductosOferta(filtrados);
  }, []);

  return (
    <Container className="my-4">
      <Text variant="div" className="titulo-seccion">
         OFERTAS DESTACADAS 
      </Text>
      
      <Text variant="p" className="ofertas-subtitulo">
        Compara los mejores precios con descuento seleccionados para esta semana.
      </Text>

      {productosOferta.length === 0 ? (
        <div className="ofertas-vacio-box">
          <Text variant="h4" className="ofertas-vacio-titulo">
            No hay juegos en oferta en este momento
          </Text>
          <Text variant="p" className="ofertas-vacio-texto">
            Vuelve más tarde para revisar nuevos descuentos.
          </Text>
        </div>
      ) : (
        <Row>
          {productosOferta.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Ofertas;