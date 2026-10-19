// 👇 1. Cambiamos el nombre de "products" a "initialProducts" para evitar el choque
const initialProducts = [
  {
    id: 1,
    name: "The Witcher 3: Wild Hunt",
    title: "The Witcher 3: Wild Hunt",
    nombre: "The Witcher 3: Wild Hunt",
    category: "HISTORIA",
    categoria: "HISTORIA",
    price: 19990,
    precio: 19990,
    stock: 15,
    oferta: true,
    description: "Juego de rol de mundo abierto en un universo de fantasía oscura.",
    descripcion: "Juego de rol de mundo abierto en un universo de fantasía oscura.",
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg",
    imagen: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg",
    link: "https://www.thewitcher.com/"
  },
  {
    id: 2,
    name: "Red Dead Redemption 2",
    title: "Red Dead Redemption 2",
    nombre: "Red Dead Redemption 2",
    category: "ACCION",
    categoria: "ACCION",
    price: 29990,
    precio: 29990,
    stock: 8,
    oferta: true,
    description: "Épica historia de forajidos en el corazón de América.",
    descripcion: "Épica historia de forajidos en el corazón de América.",
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg",
    imagen: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg",
    link: "https://www.rockstargames.com/reddeadredemption2/"
  },
  {
    id: 3,
    name: "God of War Ragnarök",
    title: "God of War Ragnarök",
    nombre: "God of War Ragnarök",
    category: "HISTORIA",
    categoria: "HISTORIA",
    price: 44990,
    precio: 44990,
    stock: 10,
    oferta: false,
    description: "Kratos y Atreus se embarcan en un viaje mítico por los Nueve Reinos.",
    descripcion: "Kratos y Atreus se embarcan en un viaje mítico por los Nueve Reinos.",
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/header.jpg",
    imagen: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/header.jpg",
    link: "https://www.playstation.com/games/god-of-war-ragnarok/"
  },
  {
    id: 4,
    name: "Grand Theft Auto V",
    title: "Grand Theft Auto V",
    nombre: "Grand Theft Auto V",
    category: "ACCION",
    categoria: "ACCION",
    price: 15990,
    precio: 15990,
    stock: 20,
    oferta: false,
    description: "Acción en mundo abierto en la ciudad de Los Santos.",
    descripcion: "Acción en mundo abierto en la ciudad de Los Santos.",
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg",
    imagen: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg",
    link: "https://www.rockstargames.com/gta-v"
  },
  {
    id: 5,
    name: "EA Sports FC 7",
    title: "EA Sports FC 7",
    nombre: "EA Sports FC 7",
    category: "DEPORTE",
    categoria: "DEPORTE",
    price: 49990,
    precio: 49990,
    stock: 12,
    oferta: true,
    description: "Fútbol mundial con las mejores ligas y clubes oficiales.",
    descripcion: "Fútbol mundial con las mejores ligas y clubes oficiales.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScalyfN5o3rXgoJSPD87w052aYrH7gi7LX3YnKZ_bunA&s=10",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScalyfN5o3rXgoJSPD87w052aYrH7gi7LX3YnKZ_bunA&s=10",
    link: "https://www.ea.com/games/ea-sports-fc/fc-7"
  },
  {
    id: 6,
    name: "Forza Horizon 5",
    title: "Forza Horizon 5",
    nombre: "Forza Horizon 5",
    category: "DEPORTE",
    categoria: "DEPORTE",
    price: 32990,
    precio: 32990,
    stock: 14,
    oferta: false,
    description: "Festival de automovilismo y carreras en mundo abierto.",
    descripcion: "Festival de automovilismo y carreras en mundo abierto.",
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1551360/header.jpg",
    imagen: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1551360/header.jpg",
    link: "https://forza.net/horizon"
  },
  {
    id: 7,
    name: "Call of Duty: Modern Warfare",
    title: "Call of Duty: Modern Warfare",
    nombre: "Call of Duty: Modern Warfare",
    category: "SHOOTERS",
    categoria: "SHOOTERS",
    price: 39990,
    precio: 39990,
    stock: 5,
    oferta: false,
    description: "Combate táctico en primera persona de alta intensidad.",
    descripcion: "Combate táctico en primera persona de alta intensidad.",
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1938090/header.jpg",
    imagen: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1938090/header.jpg",
    link: "https://www.callofduty.com/modernwarfare"
  },
  {
    id: 8,
    name: "Counter-Strike 2",
    title: "Counter-Strike 2",
    nombre: "Counter-Strike 2",
    category: "SHOOTERS",
    categoria: "SHOOTERS",
    price: 13990,
    precio: 13990,
    stock: 50,
    oferta: true,
    description: "Shooter táctico competitivo por equipos.",
    descripcion: "Shooter táctico competitivo por equipos.",
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg",
    imagen: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg",
    link: "https://www.counter-strike.net/"
  },
  {
    id: 9,
    name: "Minecraft",
    title: "Minecraft",
    nombre: "Minecraft",
    category: "MULTIJUGADOR",
    categoria: "MULTIJUGADOR",
    price: 14990,
    precio: 14990,
    stock: 20,
    oferta: false,
    description: "Construye, explora y sobrevive en un mundo de bloques.",
    descripcion: "Construye, explora y sobrevive en un mundo de bloques.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQoApDK5-Eb15dkriejVf1RxBU05Z5sUrDwBqgc9-vkQ&s=10",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQoApDK5-Eb15dkriejVf1RxBU05Z5sUrDwBqgc9-vkQ&s=10",
    link: "https://www.minecraft.net/"
  },
  {
    id: 10,
    name: "It Takes Two",
    title: "It Takes Two",
    nombre: "It Takes Two",
    category: "MULTIJUGADOR",
    categoria: "MULTIJUGADOR",
    price: 18990,
    precio: 18990,
    stock: 7,
    oferta: false,
    description: "Aventura cooperativa diseñada para jugar entre dos.",
    descripcion: "Aventura cooperativa diseñada para jugar entre dos.",
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1426210/header.jpg",
    imagen: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1426210/header.jpg",
    link: "https://www.ea.com/games/it-takes-two"
  }
];

// 👇 2. Funciones CRUD que necesita tu página "Admin" para guardar juegos nuevos
export const getProducts = () => {
  const guardados = localStorage.getItem('juegotodo_productos_v2');
  if (guardados) {
    return JSON.parse(guardados);
  }
  localStorage.setItem('juegotodo_productos_v2', JSON.stringify(initialProducts));
  return initialProducts;
};

export const createProduct = (newProduct) => {
  const current = getProducts();
  const created = { ...newProduct, id: Date.now() };
  current.push(created);
  localStorage.setItem('juegotodo_productos_v2', JSON.stringify(current));
  return created;
};

export const updateProduct = (id, updatedData) => {
  const updated = getProducts().map((p) => (p.id === Number(id) ? { ...p, ...updatedData } : p));
  localStorage.setItem('juegotodo_productos_v2', JSON.stringify(updated));
  return updated;
};

export const deleteProduct = (id) => {
  const filtered = getProducts().filter((p) => p.id !== Number(id));
  localStorage.setItem('juegotodo_productos_v2', JSON.stringify(filtered));
  return filtered;
};

// 👇 3. Exportamos "products" una sola vez al final
const products = getProducts();
export default products;