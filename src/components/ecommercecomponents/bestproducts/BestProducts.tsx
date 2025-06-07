import { useEffect, useState } from "react";
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
];


const BestProducts = () => {
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="w-full bg-gray-100 p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Las mejores ofertas</h2>
        <p className="text-gray-600 text-center">¿Buscas calidad al mejor precio? Descubre nuestras ofertas exclusivas y ahorra en grande</p>
        <p className="text-gray-600 text-center mb-6">con nuestra amplia gama de productos</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
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
    </div>

    
  );
};

export default BestProducts;