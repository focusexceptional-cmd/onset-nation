import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "./firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const brandYellow = "text-yellow-400";
const brandYellowBg = "bg-yellow-500 hover:bg-yellow-400";

const initialProducts = [
  { id: "1", name: "Hoodie", price: 50000, img: "/products/hoodie.png" },
  { id: "2", name: "Cap", price: 12000, img: "/products/cap.png" },
  { id: "3", name: "T-Shirt", price: 20000, img: "/products/tshirt.png" },
];

/* Navbar */
const Navbar = () => (
  <header className="flex justify-between items-center py-4 px-6 bg-black border-b border-white/10">
    <Link to="/" className="flex items-center gap-2">
      <img src="/logo.svg" alt="Onset Nation" className="h-12 w-auto" />
    </Link>
    <nav className="flex gap-6 text-lg">
      <Link to="/" className="hover:text-gray-300">Home</Link>
      <Link to="/shop" className="hover:text-gray-300">Shop</Link>
      <Link to="/gallery" className="hover:text-gray-300">Gallery</Link>
      <Link to="/philosophy" className="hover:text-gray-300">Philosophy</Link>
      <Link to="/contact" className="hover:text-gray-300">Contact</Link>
      <Link to="/admin" className="hover:text-gray-300">Admin</Link>
    </nav>
  </header>
);

/* Home */
const Home = () => (
  <div className="p-6">
    <motion.section className="mt-16 text-center relative p-16 rounded-2xl" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={{ backgroundImage: "url(/hero-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
      <motion.img src="/logo.svg" alt="Onset Nation" className="h-24 w-auto mx-auto mb-6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }} />
      <h2 className={`text-5xl font-bold mb-4 ${brandYellow}`}>Wear Your Beginning</h2>
      <p className="text-gray-300 max-w-2xl mx-auto text-lg">Onset Nation is more than a brand  it is ambition, identity, hustle, and new beginnings.</p>
      <Link to="/shop">
        <motion.button className={`mt-8 px-6 py-3 rounded-xl font-semibold ${brandYellowBg} text-black`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Shop Now</motion.button>
      </Link>
    </motion.section>
  </div>
);

/* Shop - Uses Firebase */
const Shop = ({ products }) => (
  <div className="p-6">
    <h2 className={`text-4xl font-bold mb-8 ${brandYellow}`}>Shop</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.map((p, i) => (
        <motion.div key={p.id} className="bg-white/10 p-6 rounded-2xl shadow-xl flex flex-col items-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}>
          <img src={p.img} alt={p.name} className="w-40 h-40 object-contain mb-4" />
          <h3 className={`text-2xl font-semibold mb-1 ${brandYellow}`}>{p.name}</h3>
          <p className="text-gray-300 mb-4">Price: {p.price} MWK</p>
          <Link to={`/product/${p.id}`} className={`px-4 py-2 rounded-xl font-semibold ${brandYellowBg}`}>View Product</Link>
        </motion.div>
      ))}
    </div>
  </div>
);

/* Gallery */
const Gallery = () => (
  <div className="p-6">
    <h2 className={`text-4xl font-bold mb-8 ${brandYellow}`}>Gallery</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <motion.div key={i} className="bg-white/10 rounded-2xl overflow-hidden" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <img src={`/gallery/img${i}.jpg`} alt={`Gallery ${i}`} className="w-full h-64 object-cover hover:scale-110 transition-transform" />
        </motion.div>
      ))}
    </div>
  </div>
);

/* Philosophy */
const Philosophy = () => (
  <div className="p-6 max-w-3xl mx-auto">
    <h2 className={`text-4xl font-bold mb-6 ${brandYellow}`}>Philosophy</h2>
    <p className="text-gray-300 leading-relaxed mb-4">
      Onset Nation stands for new beginnings, resilience, and the fire of the young hustler.
    </p>
    <p className="text-gray-300 leading-relaxed mb-4">
      This brand celebrates every step of the grind  from the struggles of Chigumula to the rise of Chilobwe, from ambition to identity, from hustle to legacy.
    </p>
    <p className="text-gray-300 leading-relaxed">
      Every piece you wear is a statement. It says you are ready, you are ambitious, and you believe in new beginnings.
    </p>
  </div>
);

/* Contact */
const Contact = () => (
  <div className="p-6 max-w-3xl mx-auto">
    <h2 className={`text-4xl font-bold mb-6 ${brandYellow}`}>Contact Us</h2>
    <div className="bg-white/10 rounded-xl p-8">
      <p className="text-gray-300 mb-4">Get in touch for orders, collaborations, or custom designs.</p>
      <p className="text-lg font-semibold mb-2">WhatsApp: <a href="https://wa.me/265886147600" className={`${brandYellow} hover:underline`}>+265 886 147 600</a></p>
      <p className="text-lg font-semibold">Email: onset.nation@example.com</p>
    </div>
  </div>
);

/* Product Page */
const ProductPage = ({ products }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  if (!product) return <p className="p-6 text-red-500">Product not found.</p>;
  return (
    <div className="p-6 flex flex-col md:flex-row gap-12">
      <img src={product.img} className="w-72 h-72 object-contain" alt={product.name} />
      <div>
        <h2 className={`text-4xl font-bold mb-4 ${brandYellow}`}>{product.name}</h2>
        <p className="text-xl text-gray-300 mb-6">Price: {product.price} MWK</p>
        <a href="https://wa.me/265886147600" className={`px-6 py-3 rounded-xl font-semibold ${brandYellowBg} inline-block text-black`}>Order Now</a>
      </div>
    </div>
  );
};

/* Admin Login */
const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (password === "OnsetAdmin123") {
      onLogin(true);
    } else {
      setError("Wrong password!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-20 bg-white/10 rounded-xl text-center">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Admin Login</h2>
      <input type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} className="p-2 rounded text-black w-full mb-4" />
      <button onClick={handleLogin} className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 rounded font-semibold text-black">Login</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

/* Admin Dashboard - Uses Firebase */
const Admin = ({ products, onProductsChange }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImg(reader.result);
    if(file) reader.readAsDataURL(file);
  };

  const addProduct = async () => {
    if (!name || !price || !img) {
      alert("Please fill all fields and upload an image");
      return;
    }
    setLoading(true);
    try {
      const newProduct = { name, price: Number(price), img };
      const docRef = await addDoc(collection(db, "products"), newProduct);
      onProductsChange([...products, { id: docRef.id, ...newProduct }]);
      setName(""); setPrice(""); setImg("");
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Check Firebase config.");
    }
    setLoading(false);
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "products", id));
      onProductsChange(products.filter(p => p.id !== id));
      alert("Product deleted!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className={`text-4xl font-bold mb-6 ${brandYellow}`}>Admin Dashboard</h2>
      <div className="mb-6 border-b border-white/20 pb-6">
        <h3 className={`text-2xl mb-2 ${brandYellow}`}>Add Product</h3>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="p-2 mr-2 rounded text-black mb-2" disabled={loading} />
        <input placeholder="Price (MWK)" value={price} onChange={e => setPrice(e.target.value)} className="p-2 mr-2 rounded text-black mb-2" disabled={loading} />
        <input type="file" onChange={handleImageUpload} className="p-2 rounded text-black mb-2" disabled={loading} />
        <button onClick={addProduct} className={`px-4 py-2 ${brandYellowBg} rounded font-semibold text-black`} disabled={loading}>{loading ? "Adding..." : "Add"}</button>
      </div>
      <div>
        <h3 className={`text-2xl mb-4 ${brandYellow}`}>Existing Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map(p => (
            <div key={p.id} className="bg-white/10 p-4 rounded-xl flex flex-col items-center">
              <img src={p.img} className="w-32 h-32 object-contain mb-2" alt={p.name} />
              <h4 className={brandYellow}>{p.name}</h4>
              <p className="text-gray-300">Price: {p.price} MWK</p>
              <button onClick={() => deleteProduct(p.id)} className={`mt-2 px-3 py-1 rounded ${brandYellowBg} text-black`} disabled={loading}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdminWrapper = ({ products, onProductsChange }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return isLoggedIn ? <Admin products={products} onProductsChange={onProductsChange} /> : <AdminLogin onLogin={setIsLoggedIn} />;
};

const Footer = () => (
  <footer className="text-center text-gray-500 py-6 mt-12 border-t border-white/10">
    <img src="/logo.svg" alt="Onset Nation" className="h-12 w-auto mx-auto mb-4" />
    <div className="flex justify-center gap-8 mb-4">
      <Link to="/shop" className="hover:text-gray-300">Shop</Link>
      <Link to="/gallery" className="hover:text-gray-300">Gallery</Link>
      <Link to="/contact" className="hover:text-gray-300">Contact</Link>
    </div>
    <p> {new Date().getFullYear()} Onset Nation. Lotus Crown Legacy.</p>
  </footer>
);

export default function OnsetNation() {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const firebaseProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        if (firebaseProducts.length > 0) {
          setProducts(firebaseProducts);
        }
      } catch (error) {
        console.error("Error fetching products from Firebase:", error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center"><p>Loading...</p></div>;

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop products={products} />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductPage products={products} />} />
          <Route path="/admin" element={<AdminWrapper products={products} onProductsChange={setProducts} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
