"use client";

import { useState, useEffect } from "react";
import { api } from "../../services";
import Image from "next/image";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState([] as ProductProps[]);

  useEffect(() => {
    api.get("/products").then((response) => {
      const respApi = response.data;
      setProducts(respApi);
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-10">
      <h1 className="p-24 text-7xl font-extrabold">Produtos</h1>
      <ul className="grid grid-cols-4 gap-10">
        {products.map((product) => (
          <li key={product.id}>
            <article className="p-10 rounded-xl min-h-full border border-gray-300 flex flex-col justify-center items-center ">
              <img className="w-fit" src={product.image} alt="" />
              <p className="font-bold text-center py-4">{product.name}</p>
              <p className="text-5xl font-extrabold">
                <span className="font-bold text-base">R$</span>
                {product.price}
              </p>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6"
              >
                Comprar
              </button>
            </article>
          </li>
        ))}
        ;
      </ul>
    </main>
  );
}
