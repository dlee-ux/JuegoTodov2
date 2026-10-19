import React from 'react';
import { Link } from 'react-router-dom';

function Footer({ to, children }) {
  // Si el link empieza con "http", es una página externa (ej: redes sociales)
  if (to.startsWith('http')) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className="footer-atom">
        {children}
      </a>
    );
  }

  // Si no, es una ruta interna de Juegotodo
  return (
    <Link to={to} className="footer-atom">
      {children}
    </Link>
  );
}

export default Footer;