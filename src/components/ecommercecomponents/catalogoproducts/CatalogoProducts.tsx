import React, { useEffect, useState } from "react";
import ProductCard from "../productcard/ProductCard";
import { getProducts } from "../../../api/productsApi/ProductsApi";

interface ProductProps {
  ID_Product: number;
  Description: string;
  Code: string;
  Imagen: string;
  ID_Category: number; // sólo el número
  Category?: {
    ID_Category: number;
    Description: string;
  };
  ID_Stock: number; // sólo el número
  Stock?: {
    ID_Stock: number;
    Description: string;
    Amount: number;
    Saleprice: number;
    Purchaseprice: number;
  };
}

function CatalogoProducts() {
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setPage] = useState(1);
  const totalPages = 5; // Este valor debe venir del backend (por ejemplo, en la respuesta: `totalPages`)


  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getProducts();
        console.log('data:', data)
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!isClient || isLoading) {
    return <h2 className="text-2xl text-center p-10">Cargando las mejores ofertas...</h2>;
  }
  
  return (   
    <div>
        <div className="w-full pl-2 pr-2 pb-2">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductCard key={product.ID_Product} product={product} />
            ))}
            </div>
        </div>
        <div className="flex justify-end pr-2 pb-10">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            <img
              src="/public/icons/flechaabajo.png"
              alt="flechaarriba"
              className="w-5 h-5 rotate-90"
            />
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-blue"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            <img
              src="/public/icons/flechaabajo.png"
              alt="flechaarriba"
              className="w-5 h-5 rotate-270"
            />
          </button>
        </div>
    </div>
  );
}

export default CatalogoProducts;

