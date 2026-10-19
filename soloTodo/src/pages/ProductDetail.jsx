import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { getProducts } from '../data/products';
import ProductDetailNotFound from '../components/organisms/ProductDetailNotFound';
import ProductDetailCard from '../components/organisms/ProductDetailCard';
import '../styles/productDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const product = getProducts().find((p) => p.id === Number(id));
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('favoritos_juegotodo')) || [];
    const existe = guardados.some((fav) => fav.id === Number(id));
    setEsFavorito(existe);
  }, [id]);

  if (!product) {
    return <ProductDetailNotFound />;
  }

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
    window.dispatchEvent(new Event('favoritosActualizados'));
  };

  return (
    <Container className="my-5 product-detail-container">
      <ProductDetailCard
        product={product}
        esFavorito={esFavorito}
        onToggleFavorito={toggleFavorito}
      />
    </Container>
  );
}

export default ProductDetail;