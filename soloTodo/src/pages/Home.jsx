import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/global.css';

function Home() {
  const novedades = [
    { 
      id: 1, 
      nombre: 'Grand Theft Auto VI', 
      descripcion: 'Bienvenido de vuelta a Vice City. Reserva el lanzamiento más esperado.',
      img: '/img/gta.png', 
      fallback: 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc675r.webp' 
    },
    { 
      id: 2, 
      nombre: 'EA Sports FC 27', 
      descripcion: 'La nueva era del fútbol mundial con hipermovimiento y ligas oficiales.',
      img: 'https://sm.ign.com/ign_latam/screenshot/default/ea27mbappe_k4mn.jpg', 
    },
    { 
      id: 3, 
      nombre: 'Forza Horizon 6', 
      descripcion: 'Velocidad sin límites y mundo abierto con gráficos de última generación.',
      img: 'https://i.ytimg.com/vi/9fxR3p1TtE0/maxresdefault.jpg', 
    },
    { 
      id: 4, 
      nombre: "Assassin's Creed Shadows", 
      descripcion: 'Vive las historias entrelazadas de Naoe y Yasuke en el Japón feudal.',
      img: 'https://image.api.playstation.com/vulcan/ap/rnd/202412/2018/f5a4f3f89d83a53b6ce319816637fb358e4880b7505ee37d.jpg', 
    },
    { 
      id: 5, 
      nombre: 'The Legend of Zelda: Ocarina of Time', 
      descripcion: 'Una aventura legendaria a través del tiempo en el reino de Hyrule.',
      img: 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/store/software/switch2/70010000130792/21d17919819cffebda2817f9b0110116c28568e0b6fa30a9778f1679271be809', 
    }
  ];

  return (
    <main>
      <div className="titulo-seccion">NOVEDADES</div>

      {/* Carrusel de Bootstrap con el estilo neón cian de Juegotodo */}
      <div 
        style={{
          width: '95%',
          maxWidth: '1200px',
          margin: '0 auto 50px auto',
          border: '2px solid #3afff8',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 0 20px rgba(0, 255, 204, 0.3)',
          backgroundColor: '#0b0b0b'
        }}
      >
        <Carousel fade interval={3500} pause="hover">
          {novedades.map((juego) => (
            <Carousel.Item key={juego.id}>
              <Link to="/products" style={{ textDecoration: 'none' }}>
                <div style={{ height: '420px', position: 'relative' }}>
                  <img
                    src={juego.img}
                    alt={juego.nombre}
                    onError={(e) => { e.target.src = juego.fallback; }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.85)'
                    }}
                  />
                  {/* Sombra inferior para que el texto siempre se lea perfecto */}
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
                    }}
                  />
                </div>

                <Carousel.Caption style={{ bottom: '20px' }}>
                  <h2 
                    style={{ 
                      color: '#3afff8', 
                      fontWeight: '900', 
                      textShadow: '0 0 12px rgba(0, 255, 204, 0.6)',
                      letterSpacing: '1px'
                    }}
                  >
                    {juego.nombre}
                  </h2>
                  <p style={{ color: '#e0e0e0', fontSize: '1.05rem', marginBottom: '12px' }}>
                    {juego.descripcion}
                  </p>
                  <span className="btn-sesion-neon" style={{ display: 'inline-block' }}>
                    VER EN EL CATÁLOGO
                  </span>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </main>
  );
}

export default Home;