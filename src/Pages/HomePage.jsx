import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../../public/hero2-2271e3ad.webp';
import img2 from '../../public/hero1-deae5a1f.webp';
import { http } from '../axios';

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    http.get(`products?featured=true`)
      .then(data => {
        if (data.status === 200) {
          setProducts(data.data.data);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleRedirect = (id) => {
    navigate(`/products/${id}`);
  };

  const handleProducts = (e) => {
    e.preventDefault();
    navigate("/products");
  };

  return (
    <div>
      <div className="flex mb-20">
        <div className="flex-1">
          <h1 className="text-7xl ml-10 mr-56 mb-4 font-bold">
            We are changing <br /> the way people <br /> shop
          </h1>
          <p className="ml-10 text-2xl">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br />
            Tempore repellat explicabo enim soluta temporibus asperiores <br />
            aut obcaecati perferendis porro nobis.
          </p>
          <button onClick={handleProducts} className="ml-10 bg-blue-500 p-3 rounded-md text-white mt-4">
            OUR PRODUCTS
          </button>
        </div>
        <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">
          <div className="carousel-item">
            <img src={img1} className="rounded-box h-[420px]" alt="Hero 1" />
          </div>
          <div className="carousel-item">
            <img src={img2} className="rounded-box h-[420px]" alt="Hero 2" />
          </div>
        </div>
      </div>

      <h1 className="text-4xl ml-10 mb-10">Featured Products</h1>
      <div className="wrapper container mx-auto flex flex-wrap gap-3 justify-center">
        {products.length > 0 && products.map((product) => (
          <div key={product.id} className="w-1/4 shadow-md rounded-md cursor-pointer" onClick={() => handleRedirect(product.id)}>
            <img className="h-[300px] w-full object-cover" src={product.attributes.image} alt={product.attributes.title} />
            <h2 className="text-lg font-semibold mt-2">{product.attributes.title}</h2>
            <h3 className="text-xl text-gray-600">${product.attributes.price}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
