import React from 'react';
import { Row } from 'react-bootstrap';
import ProductCard from './ProductCard';
import Text from '../atoms/Text';

function CategoryFilterSection({
  categorias,
  categoriaActiva,
  onSelectCategory,
  juegosFiltrados,
  onCerrar
}) {
  return (
    <div className="products-filter-box">
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {categorias.map((cat, index) => (
          <div
            key={index}
            onClick={() => onSelectCategory(cat.nombre)}
            className={`categoria-card-interactiva category-card-wrapper ${
              categoriaActiva === cat.nombre ? 'activa' : ''
            }`}
          >
            <img src={cat.img} alt={cat.nombre} />
          </div>
        ))}
      </div>

      {categoriaActiva && (
        <div className="products-category-active-section">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Text variant="h3" className="products-category-title">
              {categoriaActiva}
            </Text>
            <button onClick={onCerrar} className="btn-sesion-neon">
              CERRAR
            </button>
          </div>

          <Row>
            {juegosFiltrados.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Row>
        </div>
      )}
    </div>
  );
}

export default CategoryFilterSection;