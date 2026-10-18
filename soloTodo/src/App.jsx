import { Routes, Route } from 'react-router-dom';
import NavBar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer'; // 👈 Importamos el Footer
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contacto from './pages/contacto';
import Login from './pages/Login';
import Favoritos from './pages/Favoritos';
import Ofertas from './pages/Ofertas';
import Admin from './pages/Admin';

function App() {
  return (
    // Reemplazamos el <> </> por un div con Flexbox para empujar el footer hacia abajo
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      
      {/* Este div con flex: '1' ocupa todo el espacio sobrante y empuja el footer */}
      <div style={{ flex: '1' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>

      {/* 👇 Aquí colocamos el Footer al final */}
      <Footer />
    </div>
  );
}

export default App;