import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegSun } from "react-icons/fa6";


function MainLayout({ children }) {
  const navigate = useNavigate()
  function handleClick(e) {
    e.preventDefault()
    navigate('cart')
  }
  return (
    <div className="bg-[#0a192f] p-4 text-white">
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-500 p-4 px-5 rounded text-white font-bold">C</div>
        </div> 
        <nav className="flex space-x-4">
          <Link to="/" className="text-gray-400 hover:text-blue-500">Home</Link>
          <Link to="/about" className="text-gray-400 hover:text-blue-500">About</Link>
          <Link to="/products" className="text-gray-400 hover:text-blue-500">Products</Link>
          <Link to="/cart" className="text-gray-400 hover:text-blue-500">Cart</Link>
          <Link to="/checkout" className="text-gray-400 hover:text-blue-500">Checkout</Link>
          <Link to="/cart" className="text-gray-400 hover:text-blue-500">Cart</Link>

        </nav>
        <div className='wrap flex gap-7'>
        <FaRegSun className='w-[30px] h-[30px]'/>
        <div onClick={handleClick} className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>

              <span className="badge badge-sm indicator-item">0</span>
            </div>

        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}

export default MainLayout;
