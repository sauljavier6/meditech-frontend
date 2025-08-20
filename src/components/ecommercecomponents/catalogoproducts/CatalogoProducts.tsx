import { useState } from "react";
import ProductCard from "../productcard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProductsBestProduct } from "../../../api/Ecommerce/productsApi/ProductsApi";

interface Category {
  ID_Category: number;
  Description: string;
}

interface Stock {
  ID_Stock: number;
  Amount: number;
  Description: string;
  Saleprice: number;
  Purchaseprice: number;
}

interface Imagenes {
  ID_Image: number;
  ImagenUno: string;
  ImagenDos: string;
  ImagenTres: string;
  ImagenCuatro: string;
  ImagenCinco: string;
}

interface ProductProps {
  ID_Product: number;
  Description: string;
  Code: string;
  Category: Category;
  Stock: Stock[];
  ImagenProduct: Imagenes[];
}

const CatalogoProducts = () => {
  const [page] = useState(2);
  const limit = 4;

  const { data, isLoading } = useQuery({
    queryKey: ["productsbanner", page, limit],
    queryFn: () => getProductsBestProduct({ page, limit }),
    placeholderData: (prev) => prev,
  });

  if (isLoading) {
    return (
      <h2 className="text-2xl text-center p-10">
        Cargando las mejores ofertas...
      </h2>
    );
  }

  return (
    <div className="flex">
      {/* 🔹 Sidebar */}
      <aside className="w-64 h-screen bg-white border-r border-gray-200 p-6 hidden md:block shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-6 tracking-wide">
          Filtros
        </h2>

        <ul className="space-y-3">
          <li className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-2 transition">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            Categorías
          </li>
          <li className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-2 transition">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            Precio
          </li>
          <li className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-2 transition">
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
            Ofertas
          </li>
        </ul>

        {/* Línea divisoria */}
        <div className="border-t border-gray-200 my-6"></div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Ordenar por
          </h3>
          <button className="w-full text-left text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-2 transition">
            Más vendidos
          </button>
          <button className="w-full text-left text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-2 transition">
            Mejor precio
          </button>
          <button className="w-full text-left text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-2 transition">
            Nuevos
          </button>
        </div>
      </aside>


      {/* 🔹 Catálogo */}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.data?.map((product: ProductProps) => (
            <div key={product.ID_Product} className="relative">
              <img
                src="/icons/oferta.svg"
                alt="Oferta"
                className="absolute top-0 left-0 w-16 animate-bounce z-10"
              />
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CatalogoProducts;
