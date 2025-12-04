import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";

/* GLOBAL BRAND COLORS */
const brandYellow = "text-yellow-400";
const brandYellowBg = "bg-yellow-500 hover:bg-yellow-400";

/* NAVBAR */
const Navbar = () => (
  <header className="flex justify-between items-center py-4 px-6 bg-black border-b border-white/10">
    <Link to="/" className={`text-3xl font-bold ${brandYellow}`}>Onset Nation</Link>
    <nav className="flex gap-6 text-lg">
      <Link to="/" className="hover:text-gray-300">Home</Link>
      <Link to="/shop" className="hover:text-gray-300">Shop</Link>
      <Link to="/gallery" className="hover:text-gray-300">Gallery</Link>
      <Link to="/philosophy" className="hover:text-gray-300">Philosophy</Link>
      <Link to="/contact" className="hover:text-gray-300">Contact</Link>
    </nav>
  </header>
);

/* HERO HOME */
const Home = () => (
  <div className="p-6">
    <motion.section
      className="mt-16 text-center relative p-16 rounded-2xl"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{ backgroundImage: 'url(/hero-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <h2 className={`text-5xl font-bold mb-4 ${brandYellow}`}>Wear Your Beginning</h2>
      <p className="text-gray-300 max-w-2xl mx-auto text-lg">
        Onset Nation is more than a brand  it's ambition, identity, hustle, and new beginnings.
      </p>
      <Link to="/shop">
        <motion.button className={`mt-8 px-6 py-3 rounded-xl font-semibold ${brandYellowBg} text-black`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Shop Now
        </motion.button>
      </Link>
    </motion.section>
  </div>
);

/* SHOP PAGE */
const products = [
  { id: 1, name: "Onset Hoodie", price: "18,000 MWK", img: "/products/hoodie.png" },
  { id: 2, name: "Onset Cap", price: "7,500 MWK", img: "/products/cap.png" },
  { id: 3, name: "Onset T-Shirt", price: "10,000 MWK", img: "/products/tshirt.png" },
];

const Shop = () => (
  <div className="p-6">
    <h2 className={`text-4xl font-bold mb-8 ${brandYellow}`}>Shop</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.map((p, i) => (
        <motion.div key={p.id} className="bg-white/10 p-6 rounded-2xl shadow-xl flex flex-col items-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}>
          <img src={p.img} alt={p.name} className="w-40 h-40 object-contain mb-4" />
          <h3 className={`text-2xl font-semibold mb-1 ${brandYellow}`}>{p.name}</h3>
          <p className="text-gray-300 mb-4">{p.price}</p>
          <Link to={`/product/${p.id}`} className={`px-4 py-2 rounded-xl font-semibold ${brandYellowBg}`}>View Product</Link>
        </motion.div>
      ))}
    </div>
  </div>
);

/* PRODUCT PAGE */
const ProductPage = ({ id }) => {
  const product = products.find(p => p.id === Number(id));
  if (!product) return <p className="p-6 text-red-500">Product not found.</p>;

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-12">
        <img src={product.img} className="w-72 h-72 object-contain" />
        <div>
          <h2 className={`text-4xl font-bold mb-4 ${brandYellow}`}>{product.name}</h2>
          <p className="text-xl text-gray-300 mb-6">Price: {product.price}</p>
          <a href="https://wa.me/265886147600" className={`px-6 py-3 rounded-xl font-semibold ${brandYellowBg} inline-block`}>Order Now</a>
        </div>
      </div>
    </div>
  );
};

/* GALLERY */
const Gallery = () => (
  <div className="p-6">
    <h2 className={`text-4xl font-bold mb-6 ${brandYellow}`}>Gallery</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1,2,3,4,5,6,7,8].map(i => (
        <motion.div key={i} className="bg-white/10 p-4 rounded-xl" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <img src={`/gallery/img${i}.jpg`} className="w-full h-40 object-cover rounded-lg" />
        </motion.div>
      ))}
    </div>
  </div>
);

/* PHILOSOPHY */
const Philosophy = () => (
  <div className="p-6 max-w-3xl">
    <h2 className={`text-4xl font-bold mb-6 ${brandYellow}`}>Philosophy</h2>
    <p className="text-gray-300 leading-relaxed">Onset Nation stands for beginnings, hustle, identity, resilience and legacy. It represents the journey from Chigumula to Chilobwe, from dreaming to doing, from surviving to rising.</p>
  </div>
);

/* CONTACT PAGE */
const Contact = () => (
  <div className="p-6">
    <h2 className={`text-4xl font-bold mb-4 ${brandYellow}`}>Contact</h2>
    <p className="text-gray-300">WhatsApp: +265 886147600 (Enerst Chipula)</p>
    <p className="text-gray-300">Email: enerstchipula@gmail.com</p>
    <p className="text-gray-300">Location: Chilobwe, Blantyre</p>
    <a href="https://wa.me/265886147600" className={`mt-6 inline-block px-6 py-3 rounded-xl font-semibold ${brandYellowBg}`}>Chat on WhatsApp</a>
  </div>
);

/* FOOTER */
const Footer = () => (
  <footer className="text-center text-gray-500 py-6 mt-12 border-t border-white/10">
    <div className="flex justify-center gap-8 mb-4">
      <Link to="/shop" className="hover:text-gray-300">Shop</Link>
      <Link to="/gallery" className="hover:text-gray-300">Gallery</Link>
      <Link to="/contact" className="hover:text-gray-300">Contact</Link>
    </div>
    <p> {new Date().getFullYear()} Onset Nation. Lotus Crown Legacy.</p>
  </footer>
);

export default function OnsetNation() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<DynamicProduct />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

const DynamicProduct = (props) => {
  const id = window.location.pathname.split("/").pop();
  return <ProductPage id={id} />;
};