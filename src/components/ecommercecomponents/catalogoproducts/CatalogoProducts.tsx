import React, { useEffect, useState } from "react";
import ProductCard from "../productcard/ProductCard";

interface categoria {
  ID_Categoria: number;
  Descripcion: string;
}

interface stock {
  ID_Stock: number;
  Descripcion: string;
  Cantidad: number;
  PrecioVenta: number;
  PrecioCompra: number;
}

interface Product {
  ID_Product: number;
  Descripcion: string;
  Categoria: categoria;
  Codigo: string;
  Stock: stock;
  Imagen: string;
}

const mockProducts: Product[] = [
  {
    ID_Product: 1,
    Descripcion: "Laptop Lenovo",
    Categoria: { ID_Categoria: 1, Descripcion: "Tecnología" },
    Codigo: "LEN-123",
    Stock: {
      ID_Stock: 1,
      Descripcion: "Stock disponible",
      Cantidad: 10,
      PrecioVenta: 1200,
      PrecioCompra: 1000,
    },
    Imagen: "/public/carrusel/medicare.jpg",
  },
  {
    ID_Product: 2,
    Descripcion: "Audífonos Sony",
    Categoria: { ID_Categoria: 2, Descripcion: "Audio" },
    Codigo: "SON-456",
    Stock: {
      ID_Stock: 2,
      Descripcion: "Stock disponible",
      Cantidad: 25,
      PrecioVenta: 150,
      PrecioCompra: 100,
    },
    Imagen: "/public/carrusel/medicare.jpg",
  },
  {
    ID_Product: 3,
    Descripcion: "Teclado Mecánico",
    Categoria: { ID_Categoria: 3, Descripcion: "Periféricos" },
    Codigo: "TEC-789",
    Stock: {
      ID_Stock: 3,
      Descripcion: "Stock limitado",
      Cantidad: 5,
      PrecioVenta: 80,
      PrecioCompra: 60,
    },
    Imagen: "/public/carrusel/medicare.jpg",
  },
  {
    ID_Product: 4,
    Descripcion: "Monitor Samsung",
    Categoria: { ID_Categoria: 4, Descripcion: "Pantallas" },
    Codigo: "SAM-101",
    Stock: {
      ID_Stock: 4,
      Descripcion: "Pocas unidades",
      Cantidad: 8,
      PrecioVenta: 300,
      PrecioCompra: 250,
    },
    Imagen: "/public/carrusel/medicare.jpg",
  },
  {
    ID_Product: 5,
    Descripcion: "Laptop Lenovo",
    Categoria: { ID_Categoria: 1, Descripcion: "Tecnología" },
    Codigo: "LEN-123",
    Stock: {
      ID_Stock: 1,
      Descripcion: "Stock disponible",
      Cantidad: 10,
      PrecioVenta: 1200,
      PrecioCompra: 1000,
    },
    Imagen: "/public/carrusel/medicare.jpg",
  },
  {
    ID_Product: 6,
    Descripcion: "Audífonos Sony",
    Categoria: { ID_Categoria: 2, Descripcion: "Audio" },
    Codigo: "SON-456",
    Stock: {
      ID_Stock: 2,
      Descripcion: "Stock disponible",
      Cantidad: 25,
      PrecioVenta: 150,
      PrecioCompra: 100,
    },
    Imagen: "/public/carrusel/medicare.jpg",
  },
  {
    ID_Product: 7,
    Descripcion: "Teclado Mecánico",
    Categoria: { ID_Categoria: 3, Descripcion: "Periféricos" },
    Codigo: "TEC-789",
    Stock: {
      ID_Stock: 3,
      Descripcion: "Stock limitado",
      Cantidad: 5,
      PrecioVenta: 80,
      PrecioCompra: 60,
    },
    Imagen: "/public/carrusel/medicare.jpg",
  },
  {
    ID_Product: 8,
    Descripcion: "Monitor Samsung",
    Categoria: { ID_Categoria: 4, Descripcion: "Pantallas" },
    Codigo: "SAM-101",
    Stock: {
      ID_Stock: 4,
      Descripcion: "Pocas unidades",
      Cantidad: 8,
      PrecioVenta: 300,
      PrecioCompra: 250,
    },
    Imagen: "/public/carrusel/medicare.jpg",
  },
];


function CatalogoProducts() {
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setPage] = useState(1);
  const totalPages = 5; // Este valor debe venir del backend (por ejemplo, en la respuesta: `totalPages`)


  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/banner/bestsellers', { cache: 'no-store' });
        const data = await res.json();
        setProducts(data.bestSellingProducts);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setProducts(mockProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
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

