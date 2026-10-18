import React from 'react';
import { Link } from 'react-router-dom';

// --- 1. ÁTOMO (Enlace individual) ---
function FooterLink({ to, children }) {
  const estiloEnlace = {
    color: '#3afff8', // 👈 Forzamos el color #3afff8
    textDecoration: 'none', // 👈 Quitamos el subrayado feo por defecto
    fontSize: '0.95rem',
    transition: 'color 0.3s ease, text-shadow 0.3s ease',
    display: 'inline-block'
  };

  // Efecto hover simple para las letras
  const manejarMouseEncima = (e) => {
    e.target.style.color = '#ffffff';
    e.target.style.textShadow = '0 0 8px #3afff8';
  };

  const manejarMouseFuera = (e) => {
    e.target.style.color = '#3afff8';
    e.target.style.textShadow = 'none';
  };

  if (to.startsWith('http')) {
    return (
      <a 
        href={to} 
        target="_blank" 
        rel="noreferrer" 
        style={estiloEnlace}
        onMouseEnter={manejarMouseEncima}
        onMouseLeave={manejarMouseFuera}
      >
        {children}
      </a>
    );
  }
  
  return (
    <Link 
      to={to} 
      style={estiloEnlace}
      onMouseEnter={manejarMouseEncima}
      onMouseLeave={manejarMouseFuera}
    >
      {children}
    </Link>
  );
}

// --- 2. MOLÉCULA (Grupo de enlaces con título) ---
function FooterNav({ titulo, enlaces }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h5 style={{ color: '#3afff8', fontWeight: 'bold', letterSpacing: '1px', margin: 0 }}>
        {titulo}
      </h5>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {enlaces.map((enlace, index) => (
          <li key={index}>
            <FooterLink to={enlace.ruta}>{enlace.texto}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- 3. ORGANISMO (El Footer completo) ---
function Footer() {
  const linksExplorar = [
    { texto: 'Inicio', ruta: '/' },
    { texto: 'Catálogo de Juegos', ruta: '/products' },
    { texto: 'Contacto', ruta: '/contacto' }
  ];

  const linksLegal = [
    { texto: 'Términos y Condiciones', ruta: '#' },
    { texto: 'Política de Privacidad', ruta: '#' },
    
  ];

  const linksRedes = [
    { texto: 'Instagram', ruta: 'https://instagram.com' },
    { texto: 'Twitter / X', ruta: 'https://twitter.com' },
    { texto: 'Discord', ruta: 'https://discord.com' }
  ];

  return (
    <footer 
      style={{
        backgroundColor: '#0b0b0b',
        borderTop: '2px solid #3afff8',
        boxShadow: '0 -5px 15px rgba(58, 255, 248, 0.15)',
        padding: '50px 0 20px 0',
        marginTop: 'auto' 
      }}
    >
      <div style={{ maxWidth: '1150px', width: '95%', margin: '0 auto' }}>
        
        <div className="d-flex flex-wrap justify-content-between gap-4 mb-5">
          <div style={{ flex: '1 1 250px' }}>
            <h3 style={{ color: '#3afff8', fontWeight: '900', letterSpacing: '2px', marginBottom: '15px' }}>
              JUEGOTODO
            </h3>
            <p style={{ color: '#cccccc', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Tu tienda digital de confianza. Encuentra los mejores precios en videojuegos para todas las plataformas.
            </p>
          </div>

          <div style={{ flex: '1 1 150px' }}>
            <FooterNav titulo="EXPLORAR" enlaces={linksExplorar} />
          </div>

          <div style={{ flex: '1 1 150px' }}>
            <FooterNav titulo="LEGAL" enlaces={linksLegal} />
          </div>

          <div style={{ flex: '1 1 150px' }}>
            <FooterNav titulo="COMUNIDAD" enlaces={linksRedes} />
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1f1f1f', paddingTop: '20px', textAlign: 'center' }}>
          <p style={{ color: '#777777', fontSize: '0.85rem', margin: 0 }}>
             {new Date().getFullYear()} Juegotodo. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;