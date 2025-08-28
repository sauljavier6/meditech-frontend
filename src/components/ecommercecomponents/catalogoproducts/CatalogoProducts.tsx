import { useState } from "react";
import ProductCard from "../productcard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProductsBestProduct } from "../../../api/Ecommerce/productsApi/ProductsApi";
import { getCategory } from "../../../api/Post/CategoryApi/CategoryApi";

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
  const [page, setPage] = useState(1);
  const limit = 4;
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCategoriesOpen, setCategoriesOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => getProductsBestProduct({ page, limit }),
    placeholderData: (prev) => prev,
  });

  const { data: categorias } = useQuery({
    queryKey: ['ecategories'],
    queryFn: getCategory,
  });

  if (isLoading) {
    return (
      <h2 className="text-2xl text-center p-10">
        Cargando las mejores ofertas...
      </h2>
    );
  }

  return (
    <>
      <div className="flex relative">
        <button
          onClick={() => setSidebarOpen(true)}
          className="absolute top-4 left-4 md:hidden z-20 bg-white shadow-md p-2 rounded-md"
        >
          <img src="/icons/menu.png" alt="menu" className="w-6 h-6" />
        </button>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed md:static left-0 h-screen w-64 bg-white border-r border-gray-200 p-6 shadow-md transform transition-transform duration-300 z-30
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden absolute top-4 right-4"
          >
            <img src="/icons/close.svg" alt="close" className="w-6 h-6" />
          </button>

          <h2 className="text-xl font-bold text-gray-800 mb-6 tracking-wide">
            Filtros
          </h2>

          <ul className="space-y-3">
            <li
              onClick={() => setCategoriesOpen(!isCategoriesOpen)}
              className="cursor-pointer flex items-center justify-between text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-2 transition"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                Categorías
              </div>
              <img
                src="/icons/flecha-negra.png"
                alt="arrow"
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  isCategoriesOpen ? "rotate-90" : "-rotate-90"
                }`}
              />
            </li>
            {isCategoriesOpen && (
              <ul className="ml-6 mt-2 space-y-1">
                {categorias?.data?.map((cat: Category) => (
                  <li
                    key={cat.ID_Category}
                    className="cursor-pointer text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-1 transition"
                  >
                    {cat.Description}
                  </li>
                ))}
              </ul>
            )}

            <li className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-2 transition">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              Precio
            </li>
            <li className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-2 transition">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              Ofertas
            </li>
          </ul>

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

        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.data?.map((product: ProductProps) => (
              <div key={product.ID_Product} className="relative">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </main>
      </div>

      <div className="flex justify-end items-center mt-6 mb-6 mr-6 space-x-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 flex items-center justify-center"
        >
          <img src="/icons/flecha-negra.png" alt="Anterior" className="w-4 h-4" />
        </button>

        {data && data.totalPages >= 1 && (
          <>
            {(() => {
              const maxButtons = 5;
              let start = Math.max(1, page - Math.floor(maxButtons / 2));
              let end = start + maxButtons - 1;

              if (end > data.totalPages) {
                end = data.totalPages;
                start = Math.max(1, end - maxButtons + 1);
              }

              return Array.from({ length: end - start + 1 }, (_, i) => start + i).map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`px-3 py-1 rounded ${
                    page === num
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {num}
                </button>
              ));
            })()}
          </>
        )}

        <button
          disabled={page >= (data?.totalPages || 1)}
          onClick={() => setPage((old) => old + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 flex items-center justify-center"
        >
          <img src="/icons/flecha-negra.png" alt="Siguiente" className="w-4 h-4 rotate-180" />
        </button>
      </div>
    </>
  );
};

export default CatalogoProducts;
