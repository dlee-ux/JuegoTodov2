import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer 
      style={{ 
        backgroundColor: '#0b0b0b', 
        borderTop: '2px solid #3afff8', 
        padding: '30px 0 20px 0', 
        marginTop: '60px',
        textAlign: 'center',
        boxShadow: '0 -4px 15px rgba(58, 255, 248, 0.1)'
      }}
    >
      <Container>
        <p>
          <img src="img/logopag.png" alt="" style={{ width: '180px', marginBottom: '15px' }} />
        </p>
        <p style={{ color: '#cccccc', fontSize: '0.9rem', marginBottom: '5px' }}>
          Comparador de Precios de Videojuegos
        </p>
        <p style={{ color: '#555555', fontSize: '0.8rem', marginTop: '15px', marginBottom: '0' }}>
          2026 Juegotodo.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;