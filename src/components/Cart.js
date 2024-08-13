import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cart, removeFromCart, removeAllFromCart }) => {
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const placeAllOrder = async () => {
    try {
      const orders = cart.map(item => ({
        orderDate: new Date().toISOString(),
        totalPrice: item.price * item.quantity,
        productId: item.id,
        quantity: item.quantity,
      }));

      const response = await fetch('http://localhost:8080/api/create-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orders),
      });

      if (response.ok) {
        // Handle successful order placement, e.g., clear the cart
        console.log('Order placed successfully');
        removeAllFromCart(); // Assuming this function clears the cart
      } else {
        // Handle error response
        console.error('Failed to place the order');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

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
          <button onClick={placeAllOrder}>Place All Order</button>
        </>
      )}
    </div>
  );
};

export default Cart;
