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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  return (
    <div className="product">
      <div className="product-description">
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>Stock: {product.stock}</p>
        </div>
        <input type='file' onChange={handleImageChange} ></input>
        <div className='product-image'>
          <img height={100} width={100} src={product.image_id} />
        </div>
      </div>
      <div className="quantity-controls">
        <button onClick={handleDecrease} disabled={quantity <= 1}>-</button>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
          max={product.stock}
        />
        <button className={(product.stock <= 0 || product.stock < quantity) ? 'disabled-class' : 'enabled-class'}
          onClick={handleIncrease} disabled={quantity >= product.stock}>+</button>
      </div>
      <button
        className={(product.stock <= 0 || product.stock < quantity) ? 'disabled-class' : 'enabled-class'}
        onClick={() => addToCart(product, quantity)}
        disabled={product.stock === 0}
      >
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default Product;
