import React, { useEffect, useState } from "react";
import { getProducts } from "../../../api/Post/ProductApi/ProductApi";
import { useQuery } from '@tanstack/react-query';

export interface StockVariant {
  ID_Stock: number;
  ID_Product: number;
  Description: string;
  Amount: number;
  Saleprice: number;
  Purchaseprice: number;
  State: boolean;
}

export interface ProductProps {
  ID_Product: number;
  Description: string;
  Code: string;
  Imagen: string;

  ID_Category: number;
  Category?: {
    ID_Category: number;
    Description: string;
  };

  Stock?: StockVariant[];
}


interface ProductsListProps {
  onDelete: (ids: number[]) => void;
  resetChecks: boolean;
  onResetComplete: () => void;
}


const ProductsList = ({onDelete, resetChecks, onResetComplete}: ProductsListProps ) => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 5,
  });
  const [selectedIds, setSelectedIds] = useState<number[]>([]);


  const { data, isLoading } = useQuery({
    queryKey: ['products', pagination.currentPage],
    queryFn: () => getProducts(pagination.currentPage, pagination.itemsPerPage),
  });

  useEffect(() => {
    if (data && data.pagination) {
      setPagination(prev => ({
        ...prev,
        totalPages: data.pagination.totalPages,
      }));
    }
  }, [data]);
  
  useEffect(() => {
    if (resetChecks) {
      setSelectedIds([]);
      onDelete([]);
      onResetComplete(); 
    }
  }, [resetChecks]);

  useEffect(() => {
    onDelete(selectedIds);
  }, [selectedIds]);


  const handleNext = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  };

  const handlePrev = () => {
    if (pagination.currentPage > 1) {
      setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (!data?.data) return;

    if (selectedIds.length === data.data.length) {
      setSelectedIds([]); // deselecciona todo
    } else {
      const allIds = data.data.map((prod: ProductProps) => prod.ID_Product);
      setSelectedIds(allIds); // selecciona todo
    }
  };



  return (
    <>
    <div className="overflow-x-auto border rounded-md shadow-sm">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="px-2 py-2">
            <input
              type="checkbox"
              checked={selectedIds.length === data?.data?.length && data?.data?.length > 0}
              onChange={handleSelectAll}
            />
            </th>
            <th className="px-2 py-2">ID</th>
            <th className="px-2 py-2">Nombre</th>
            <th className="px-2 py-2">Categoria</th>
            <th className="px-2 py-2">Codigo</th>
            <th className="px-2 py-2">Precio venta</th>
            <th className="px-2 py-2">Precio compra</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={7} className="text-center py-4">Cargando productos...</td>
            </tr>
          ) : (
            data?.data?.map((prod: ProductProps) => (
              <tr key={prod.ID_Product} className="border-t">
                <td className="px-2 py-2">
                  <input type="checkbox" checked={selectedIds.includes(prod.ID_Product)}
                  onChange={() => handleCheckboxChange(prod.ID_Product)}
                  onClick={(e) => e.stopPropagation()}/>
                </td>
                <td className="px-2 py-2">{prod.ID_Product}</td>
                <td className="px-2 py-2">{prod.Description}</td>
                <td className="px-2 py-2">{prod.Category?.Description}</td>
                <td className="px-2 py-2">{prod.Code}</td>
                <td className="px-2 py-2">${prod.Stock?.[0]?.Saleprice ?? '—'}</td>
                <td className="px-2 py-2">${prod.Stock?.[0]?.Purchaseprice ?? '—'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    <div className="flex justify-end items-center gap-4 mt-6">
      <button
        onClick={handlePrev}
        disabled={pagination.currentPage === 1}
        className={`px-4 py-2 rounded-md text-white font-semibold transition-colors duration-200 
          ${pagination.currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        Anterior
      </button>

      <span className="text-sm font-medium">
        Página {pagination.currentPage} de {pagination.totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={pagination.currentPage === pagination.totalPages}
        className={`px-4 py-2 rounded-md text-white font-semibold transition-colors duration-200 
          ${pagination.currentPage === pagination.totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        Siguiente
      </button>
    </div>
    </>
  );
};

export default ProductsList;
