import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Text from '../atoms/Text';
import Image from '../atoms/Image';

function NovedadesCarousel() {
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
    <div className="carousel-container-neon">
      <Carousel fade interval={3500} pause="hover">
        {novedades.map((juego) => (
          <Carousel.Item key={juego.id}>
            <Link to="/products" style={{ textDecoration: 'none' }}>
              <div className="carousel-img-wrapper">
                <Image
                  src={juego.img}
                  alt={juego.nombre}
                  onError={(e) => { e.target.src = juego.fallback; }}
                  className="carousel-img-slide"
                />
                <div className="carousel-overlay-gradient" />
              </div>

              <Carousel.Caption className="carousel-caption-bottom">
                <Text variant="h2" className="carousel-title-neon">
                  {juego.nombre}
                </Text>
                <Text variant="p" className="carousel-text-desc">
                  {juego.descripcion}
                </Text>
                <Text variant="span" className="btn-sesion-neon d-inline-block">
                  VER EN EL CATÁLOGO
                </Text>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default NovedadesCarousel;