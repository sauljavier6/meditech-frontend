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
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

