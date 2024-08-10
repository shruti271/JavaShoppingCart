import React from 'react';

const CartItem = ({ item, removeFromCart, removeAllFromCart }) => {
  return (
    <div className="cart-item">
      <h3>{item.name}</h3>
      <p>Quantity: {item.quantity}</p>
      <p>Price: ${item.price.toFixed(2)}</p>
      <div className="cart-item-buttons">
        <button onClick={() => removeFromCart(item)}>Remove One</button>
        <button onClick={() => removeAllFromCart(item)}>Remove All</button>
      </div>
    </div>
  );
};

export default CartItem;
