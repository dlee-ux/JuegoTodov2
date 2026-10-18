import React from 'react';
import { Container } from 'react-bootstrap';
import Text from '../atoms/Text';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#0b0b0b', borderTop: '2px solid #3afff8', padding: '20px 0', marginTop: 'auto' }}>
      <Container className="text-center">
        <Text variant="p" style={{ color: '#3afff8', margin: 0, fontWeight: 'bold' }}>
          © JUEGOTODO - Comparador de Precios de Videojuegos
        </Text>
      </Container>
    </footer>
  );
}

export default Footer;