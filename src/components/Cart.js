import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cart, removeFromCart, removeAllFromCart }) => {
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <CartItem key={item.id} item={item} removeFromCart={removeFromCart} removeAllFromCart={removeAllFromCart} />
          ))}
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </>
      )}
    </div>
  );
};

export default Cart;
