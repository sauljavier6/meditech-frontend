import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Categoria {
  ID_Categoria: number;
  Descripcion: string;
}

interface Stock {
  ID_Stock: number;
  Descripcion: string;
  Cantidad: number;
  PrecioVenta: number;
  PrecioCompra: number;
}

interface ProductProps {
  ID_Product: number;
  Descripcion: string;
  Categoria: Categoria;
  Codigo: string;
  Stock: Stock;
  Imagen: string;
}

export default function ProductCard({ product }: { product: ProductProps }) {
  const navigate = useNavigate();


  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se dispare otro evento padre si es necesario
    console.log("Detalles del producto:", product);
    navigate(`/detalles/${product.ID_Product}`); // redirige a /detalles
  };

  return (
    <div onClick={handleDetailsClick} className="group p-4 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full">
        <img
        src={product.Imagen}
        alt={product.Descripcion}
        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
        />
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.Descripcion}</h2>
        <p className="text-sm text-gray-500">{product.Categoria.Descripcion}</p>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-base font-bold text-green-600">${product.Stock.PrecioVenta.toFixed(2)}</p>
          <p className={`text-xs px-2 py-1 rounded-full ${
            product.Stock.Cantidad > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {product.Stock.Cantidad > 0 ? 'En stock' : 'Agotado'}
          </p>
        </div>
    </div>
  );
}