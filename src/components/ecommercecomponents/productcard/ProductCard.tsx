import React from 'react';
import { useNavigate } from 'react-router-dom';

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

export default function ProductCard({ product }: { product: ProductProps }) {
  const navigate = useNavigate();

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Detalles del producto:", product);
    navigate(`/detalles/${product.ID_Product}`);
  };

  return (
    <div onClick={handleDetailsClick} className="group p-4 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full">
        <img
          src={product.Imagen}
          alt={product.Description}
          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
        />
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.Description}</h2>
        <p className="text-sm text-gray-500">
          {product.Category?.Description ?? 'Sin categoría'}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-base font-bold text-green-600">
            ${product.Stock?.Saleprice.toFixed(2) ?? 'N/A'}
          </p>
          <p className={`text-xs px-2 py-1 rounded-full ${
            product.Stock?.Amount && product.Stock.Amount > 0
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {product.Stock?.Amount && product.Stock.Amount > 0 ? 'En stock' : 'Agotado'}
          </p>
        </div>
    </div>
  );
}
