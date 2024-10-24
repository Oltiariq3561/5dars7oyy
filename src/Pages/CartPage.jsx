import React, { useEffect, useState } from 'react';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const shippingCost = 5;
  const taxRate = 0.10;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.amount, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;

  const removeItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">Shopping Cart</h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 mb-4 border-b pb-3">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-500">Color: <span style={{ backgroundColor: item.color }} className="w-3 h-3 inline-block rounded-full"></span></p>
                  <div className="flex items-center mt-1">
                    <label htmlFor="amount" className="mr-2">Amount:</label>
                    <select value={item.amount} onChange={(e) => { const updatedAmount = Number(e.target.value); const updatedCart = [...cartItems]; updatedCart[index].amount = updatedAmount; setCartItems(updatedCart); localStorage.setItem('cart', JSON.stringify(updatedCart)); }} className="border p-1 rounded">
                      {[...Array(10)].map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <button onClick={() => removeItem(index)} className="text-blue-500 ml-4">remove</button>
                  </div>
                </div>
                <p className="text-lg font-semibold">${(item.price * item.amount).toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        <div className="p-4 bg-gray-500 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mt-3">
            <span>Order Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="bg-blue-500 text-white w-full mt-4 py-2 rounded">PLEASE LOGIN</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
