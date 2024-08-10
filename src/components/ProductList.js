import React from 'react';
import Product from './Product';

const ProductList = ({ products, addToCart }) => {
  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <Product key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;
