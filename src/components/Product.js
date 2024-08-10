import React, { useState } from 'react';

const Product = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value, 10))));
  };

  const handleIncrease = () => {
    setQuantity(prevQuantity => Math.min(product.stock, prevQuantity + 1));
  };

  const handleDecrease = () => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
  };

  return (
    <div className="product">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Stock: {product.stock}</p>
      <div className="quantity-controls">
        <button onClick={handleDecrease} disabled={quantity <= 1}>-</button>
        <input 
          type="number" 
          value={quantity} 
          onChange={handleQuantityChange} 
          min="1" 
          max={product.stock}
        />
        <button onClick={handleIncrease} disabled={quantity >= product.stock}>+</button>
      </div>
      <button 
        onClick={() => addToCart(product, quantity)} 
        disabled={product.stock === 0}
      >
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default Product;
