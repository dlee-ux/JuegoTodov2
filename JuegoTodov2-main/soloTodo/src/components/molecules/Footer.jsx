import React from 'react';
import Footer from '../atoms/Footer';

function Footer({ titulo, enlaces }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h5 style={{ color: '#3afff8', fontWeight: 'bold', letterSpacing: '1px', margin: 0 }}>
        {titulo}
      </h5>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {enlaces.map((enlace, index) => (
          <li key={index}>
            <Footer to={enlace.ruta}>{enlace.texto}</Footer>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;