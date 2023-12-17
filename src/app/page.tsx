"use client";

import { useState, useEffect } from "react";
import { api } from "../../services";
import Image from "next/image";

interface ProductProps {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState([] as ProductProps[]);
  const [loading, setLoading] = useState(false);
  const [productNameInput, setproductNameInput] = useState("");
  const [productPriceInput, setproductPriceInput] = useState("");
  const [productCategoryInput, setproductCategoryInput] = useState("");
  const [productImageInput, setproductImageInput] = useState("");

  async function loadProducts() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const response = await api.get("/products");
      setProducts(response.data);
      console.log("Success:", response);
    } catch (error) {
      console.log("Error:", error);
      alert("Ocorreu um erro ao tentar se conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleAddItem() {
    const data: Omit<ProductProps, "id"> = {
      name: productNameInput,
      price: productPriceInput,
      category: productCategoryInput,
      image: productImageInput,
    };
    try {
      await api.post("/products", data);

      // setproductNameInput("");
      // setproductPriceInput("");
      // setproductCategoryInput("");
      // setproductImageInput("");

      loadProducts();
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-10">
      <h1 className="pt-10 text-3xl font-extrabold">Cadastre o produto novo</h1>
      <div>
        <form className="flex flex-col gap-4 p-10">
          <input
            className="border border-solid border-blue-800 rounded px-4"
            type="text"
            onChange={(e) => setproductNameInput(e.target.value)}
            placeholder="Nome do produto"
          />
          <input
            className="border border-solid border-blue-800 rounded px-4"
            type="text"
            onChange={(e) => setproductPriceInput(e.target.value)}
            placeholder="Preço do produto"
          />
          <input
            className="border border-solid border-blue-800 rounded px-4"
            type="text"
            onChange={(e) => setproductCategoryInput(e.target.value)}
            placeholder="Categoria do produto"
          />
          <input
            className="border border-solid border-blue-800 rounded px-4"
            type="text"
            onChange={(e) => setproductImageInput(e.target.value)}
            placeholder="Link da img do produto"
          />
          <button
            onClick={handleAddItem}
            type="submit"
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6"
          >
            Cadastrar
          </button>
        </form>
      </div>
      <h2 className="p-24 text-7xl font-extrabold">Produtos</h2>
      <ul className="grid grid-cols-4 gap-10 p-10">
        {products.map((product) => (
          <li key={product.id}>
            <article className="p-10 rounded-xl min-h-full border border-gray-300 flex flex-col justify-center items-center ">
              <img className="w-cover rounded" src={product.image} alt="" />
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
