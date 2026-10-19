import React, { useState, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';

function NavBar() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [cantidadFavs, setCantidadFavs] = useState(0);

  const actualizarContadorFavs = () => {
    const guardados = JSON.parse(localStorage.getItem('favoritos_juegotodo')) || [];
    setCantidadFavs(guardados.length);
  };

  useEffect(() => {
    const guardado = localStorage.getItem('usuarioLogueado');
    if (guardado) {
      setUsuarioLogueado(JSON.parse(guardado));
    }
    actualizarContadorFavs();

    window.addEventListener('favoritosActualizados', actualizarContadorFavs);
    return () => window.removeEventListener('favoritosActualizados', actualizarContadorFavs);
  }, []);

  const cerrarSesion = (e) => {
    e.preventDefault();
    localStorage.removeItem('usuarioLogueado');
    setUsuarioLogueado(null);
    window.location.reload();
  };

  return (
    <>

        <header 
          className="juegotodo-header" 
          style={{ width: '98%', maxWidth: '100%', margin: '20px auto 30px auto' }}
        >
        <div className="header-col-izq">
          <button
            onClick={() => setMostrarMenu(true)}
            className="btn-hamburguesa"
            aria-label="Abrir menú"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className="header-col-centro">
          <a href="/">
            <img 
              src="/img/logopag.png" 
              alt="Logo Juegotodo" 
              className="logo-header-central"
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
          </a>
        </div>

        <div className="header-col-der">
          <a href="/favoritos" className="btn-sesion-neon" title="Mis Favoritos">
            FAVORITOS: {cantidadFavs}
          </a>

          {usuarioLogueado ? (
            <>
              <span className="saludo-usuario">
                Hola, <strong>{usuarioLogueado.usuario}</strong>
              </span>
              <button onClick={cerrarSesion} className="btn-sesion-neon">
                CERRAR SESION
              </button>
            </>
          ) : (
            <a href="/login" className="btn-sesion-neon">
              INICIAR SESION
            </a>
          )}
        </div>
      </header>

      {/* Menú lateral desplegable */}
      <Offcanvas
        show={mostrarMenu}
        onHide={() => setMostrarMenu(false)}
        placement="start"
        style={{
          backgroundColor: '#121212',
          borderRight: '2px solid #3afff8',
          color: '#ffffff',
          boxShadow: '0 0 25px rgba(58, 255, 248, 0.3)',
          width: '290px'
        }}
      >
        <Offcanvas.Header
          closeButton
          closeVariant="white"
          style={{ borderBottom: '1px solid rgba(58, 255, 248, 0.3)' }}
        >
          <Offcanvas.Title style={{ color: '#3afff8', fontWeight: '900', letterSpacing: '1px' }}>
            JUEGOTODO
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="d-flex flex-column gap-2 pt-4">
          <a href="/" className="item-menu-lateral"> INICIO</a>
          <a href="/products" className="item-menu-lateral"> CATALOGO COMPLETO</a>
          <a href="/favoritos" className="item-menu-lateral"> JUEGOS FAVORITOS ({cantidadFavs})</a>
          <a href="/ofertas" className="item-menu-lateral">  OFERTAS</a>
          <a href="/contacto" className="item-menu-lateral"> CONTACTO</a>
          <a href="/admin" className="item-menu-lateral">  ADMINISTRADOR</a>

          <hr style={{ borderColor: '#3afff8', opacity: 0.4, margin: '15px 0' }} />

          <div style={{ color: '#3afff8', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '5px' }}>
            CATEGORIAS RAPIDAS
          </div>
          <a href="/products?categoria=ACCION" className="item-menu-lateral sub"> Accion</a>
          <a href="/products?categoria=DEPORTE" className="item-menu-lateral sub"> Deporte</a>
          <a href="/products?categoria=HISTORIA" className="item-menu-lateral sub"> Historia</a>
          <a href="/products?categoria=SHOOTERS" className="item-menu-lateral sub"> Shooters</a>
          <a href="/products?categoria=MULTIJUGADOR" className="item-menu-lateral sub"> Multijugador</a>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavBar;