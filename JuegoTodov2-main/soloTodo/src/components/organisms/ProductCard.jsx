import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();

  const titulo = product.name || product.title || product.nombre;
  const descripcion = product.description || product.descripcion;
  const precio = product.price || product.precio;
  const imagen = product.image || product.imagen;
  const categoria = product.category || product.categoria;
  
  // 👇 Cambiado para que lea prioritariamente "product.link" (la página oficial de cada juego)
  const urlOficial = product.link || product.url || product.enlace || 'https://store.steampowered.com';

  const handleVerDetalles = (e) => {
    e.stopPropagation();
    window.open(urlOficial, '_blank');
  };

  return (
    <Col xs={12} md={6} lg={4} className="mb-4">
      <Card
        className="h-100"
        onClick={() => navigate(`/products/${product.id}`)}
        style={{
          backgroundColor: '#141414',
          border: '2px solid #3afff8',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 0 15px rgba(58, 255, 248, 0.18)',
          color: '#ffffff',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-6px)';
          e.currentTarget.style.boxShadow = '0 0 25px rgba(58, 255, 248, 0.55)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 0 15px rgba(58, 255, 248, 0.18)';
        }}
      >
        <div style={{ position: 'relative', height: '210px', overflow: 'hidden', borderBottom: '1px solid rgba(58, 255, 248, 0.3)' }}>
          <Card.Img
            variant="top"
            src={imagen}
            alt={titulo}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {categoria && (
            <span
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'rgba(11, 11, 11, 0.88)',
                border: '1.5px solid #3afff8',
                color: '#3afff8',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                letterSpacing: '1px'
              }}
            >
              {categoria}
            </span>
          )}
        </div>

        <Card.Body className="d-flex flex-column justify-content-between p-4">
          <div>
            <Card.Title style={{ color: '#3afff8', fontWeight: '800', fontSize: '1.2rem', marginBottom: '10px' }}>
              {titulo}
            </Card.Title>
            <Card.Text style={{ color: '#cccccc', fontSize: '0.92rem', lineHeight: '1.4' }}>
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

            {/* Usamos un <button> normal con la clase .btn-sesion-neon para evitar el azul de Bootstrap */}
            <button
              onClick={handleVerDetalles}
              className="btn-sesion-neon"
              style={{ cursor: 'pointer', backgroundColor: '#141414' }}
            >
              Ver detalles
            </button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductCard;