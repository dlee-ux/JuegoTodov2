import React from 'react';
import Text from '../components/atoms/Text';
import NovedadesCarousel from '../components/organisms/NovedadesCarousel';
import '../styles/home.css';

function Home() {
  return (
    <main>
      <Text variant="div" className="titulo-seccion">
        NOVEDADES
      </Text>

      <NovedadesCarousel />
    </main>
  );
}

export default Home;