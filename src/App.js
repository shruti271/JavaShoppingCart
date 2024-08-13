import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ImageUpload from './components/ImageUpload';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', description: 'Description 1', price: 10.00, stock: 5, image_id: 'megan-byers-qln8l_yTi0w-unsplash.jpg' },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 20.00, stock: 3, image_id: 'image2' },
    // Add more products as needed
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://'); // Replace with your API endpoint
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }

    setProducts(products.map(p => p.id === product.id ? { ...p, stock: p.stock - quantity } : p));
  };

  const removeFromCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct.quantity > 1) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item));
      setProducts(products.map(p => p.id === product.id ? { ...p, stock: p.stock + 1 } : p));
    } else {
      setCart(cart.filter(item => item.id !== product.id));
      setProducts(products.map(p => p.id === product.id ? { ...p, stock: p.stock + existingProduct.quantity } : p));
    }
  };

  const removeAllFromCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    setCart(cart.filter(item => item.id !== product.id));
    setProducts(products.map(p => p.id === product.id ? { ...p, stock: p.stock + existingProduct.quantity } : p));
  };

  const handleImageUpload = (file) => {
    console.log('Uploaded file:', file);
    // Handle file upload logic here
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/upload">Upload Image</Link></li>
          </ul>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<ProductList products={products} addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} removeAllFromCart={removeAllFromCart} />} />
            <Route path="/upload" element={<ImageUpload onImageUpload={handleImageUpload} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
