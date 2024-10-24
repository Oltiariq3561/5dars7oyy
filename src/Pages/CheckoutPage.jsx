import React, { useEffect, useState } from 'react';

function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const shippingCost = 5.00;
  const taxRate = 0.10;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.amount, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;

  const handlePlaceOrder = () => {
    if (!username || !address) {
      alert('Please fill in all fields.');
      return;
    }
    
    // Bu yerda buyurtma berish jarayonini qo'shishingiz mumkin
    alert(`Order placed successfully for ${username} at ${address}!`);

    // Xaridlarni tozalash
    localStorage.removeItem('cart');
    setCartItems([]);
    setUsername('');
    setAddress('');
  };

  return (
    <div className="container mx-auto p-6 flex">
      <div className="w-1/2 pr-6">
        <h2 className="text-3xl font-semibold mb-6">Checkout</h2>
        {cartItems.length > 0 ? (
          <div className="mb-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center mb-4 border-b pb-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-500">Color: <span style={{ backgroundColor: item.color }} className="w-3 h-3 inline-block rounded-full"></span></p>
                    <p>Amount: {item.amount}</p>
                  </div>
                </div>
                <p className="text-lg font-semibold">${(item.price * item.amount).toFixed(2)}</p>
              </div>
            ))}

            <div className="mb-4">
              <label className="block mb-1">Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 text-black rounded w-full"
                placeholder="Enter your username"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Address:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border p-2 text-black rounded w-full"
                placeholder="Enter your address"
              />
            </div>

            <button onClick={handlePlaceOrder} className="bg-blue-500 text-white w-full py-2 rounded">Place Order</button>
          </div>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      <div className="w-1/2 mt-[120px] pl-6">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
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
        <div className="flex justify-between font-semibold text-lg">
          <span>Order Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
