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


const marcas = [
  {
    Id: 1,
    Descripcion: "Pfizer",
    Imagen: "/carruselmarcas/Pfizer.jpg",
  },
  {
    Id: 2,
    Descripcion: "Bayer",
    Imagen: "/carruselmarcas/Bayer.jpg",
  },
  {
    Id: 3,
    Descripcion: "Novartis",
    Imagen: "/carruselmarcas/Novartis.jpg",
  },
  {
    Id: 4,
    Descripcion: "Sanofi",
    Imagen: "/carruselmarcas/Sanofi.png",
  },
  {
    Id: 5,
    Descripcion: "Roche",
    Imagen: "/carruselmarcas/Roche.jpeg",
  },
  {
    Id: 6,
    Descripcion: "GSK",
    Imagen: "/carruselmarcas/GSK.jpg",
  },
];


function CatalogoBanner() {
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
    <div>
        <div className="bg-white dark:bg-gray-800 p-6 shadow-md flex flex-wrap gap-4 justify-between text-gray-800 dark:text-white mb-4">
        <div className="flex-1 min-w-[150px] flex flex-col items-center text-center">
            <img src="/public/icons/farmacia.png" alt="Farmacia" className="w-12 h-12 mb-2" />
            <p className="font-semibold text-sm">Directo de las Farmacias</p>
        </div>
        <div className="flex-1 min-w-[150px] flex flex-col items-center text-center">
            <img src="/public/icons/medicamento.png" alt="Medicamento" className="w-12 h-12 mb-2" />
            <p><span className="font-bold text-blue-600">+14,000</span> Productos</p>
        </div>
        <div className="flex-1 min-w-[150px] flex flex-col items-center text-center">
            <img src="/public/icons/etiqueta.png" alt="Promocion" className="w-12 h-12 mb-2" />
            <p className="font-semibold">Super Promos</p>
        </div>
        <div className="flex-1 min-w-[150px] flex flex-col items-center text-center">
            <img src="/public/icons/camion.png" alt="Camion" className="w-12 h-12 mb-2" />
            <p className="font-semibold">Envíos a Domicilio</p>
        </div>
        </div>

        <div className="w-full p-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.ID_Product} product={product} />
            ))}
            </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 shadow-md flex flex-wrap gap-4 justify-between text-gray-800 dark:text-white mt-4">
          {marcas.map((marca) => (
            <img
              key={marca.Id}
              src={marca.Imagen}
              alt={marca.Descripcion}
              title={marca.Descripcion}
              className="w-28 h-auto object-contain mx-2"
            />
          ))}
        </div>
    </div>
  );
}

export default CatalogoBanner;

