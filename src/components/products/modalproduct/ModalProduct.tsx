import React, { useEffect, useRef, useState } from "react";
import styles from "./ModalProducts.module.scss";
import { useMutation, useQuery, useQueryClient  } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getProductById, postProduct, updateProduct } from "../../../api/Post/ProductApi/ProductApi";
import { getCategory } from "../../../api/Post/CategoryApi/CategoryApi";

interface ModalProductProps { 
  onClose: () => void;
  onEdit?: number | null;
}

const ModalProduct = ({onClose, onEdit}:ModalProductProps) => {
  const [products, setProducts] = useState({
    Description: '',
    ID_Category: 0,
    Code: '',
    Imagen: '',
    StockData: [
      {
        Description: '',  
        Amount: 0,
        Saleprice: 0,
        Purchaseprice: 0,
      }
    ],
  });

  useEffect(() => {
    if (onEdit) {
      const fetchProduct = async () => {
        try {
          const data = await getProductById(onEdit);
          setProducts({
            Description: data.Description,
            ID_Category: data.ID_Category,
            Code: data.Code,
            Imagen: data.Imagen,
            StockData: data.Stock || [],
          });
        } catch (error) {
          console.error("Error cargando producto:", error);
        }
      };

      fetchProduct();
    }
  }, [onEdit]);

  const { data: categoryData } = useQuery({
    queryKey: ['category'],
    queryFn: getCategory,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: postProduct,
    onError: (error) => {
        toast.error(`${error.message}`, {
        position: "top-right",
        });
    },
    onSuccess: () => {
        resetForm();
        onClose();
        toast.success("Producto registrado con éxito", {
        position: "top-right",
        progressClassName: "custom-progress",
        });
        queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const { mutate: updatemutate } = useMutation({
    mutationFn: updateProduct,
    onError: (error) => {
        toast.error(`${error.message}`, {
        position: "top-right",
        });
    },
    onSuccess: () => {
        resetForm();
        onClose();
        toast.success("Producto actualizado con éxito", {
        position: "top-right",
        progressClassName: "custom-progress",
        });
        queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const addInput = () => {
    setProducts(prev => ({
      ...prev,
      StockData: [
        ...prev.StockData,
        { Description: '', Amount: 0, Saleprice: 0, Purchaseprice: 0 }
      ]
    }));
  };

  const removeInput = () => {
    setProducts(prev => ({
      ...prev,
      StockData: prev.StockData.length > 1
        ? prev.StockData.slice(0, -1)
        : prev.StockData
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onEdit) {
      const newdata = {
        ...products,
        ID_Product: onEdit,
      };

      updatemutate(newdata);
    } else {
      mutate(products);
    }
  };


  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setProducts({
      Description: '',
      ID_Category: 0,
      Code: '',
      Imagen: '',
      StockData: [
        {
          Description: '',
          Amount: 0,
          Saleprice: 0,
          Purchaseprice: 0
        }
      ],
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (value === -1) {
      console.log("Abrir formulario de creación de categoría");
    } else {
      setProducts({ ...products, ID_Category: value });
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Crear Producto</h2>
          <button onClick={handleClose} className="p-2 rounded hover:bg-gray-100">
            <img src="/icons/close.png" alt="Cerrar" className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              id="Description"
              value={products.Description}
              onChange={(e) => setProducts({ ...products, Description: e.target.value })}
              placeholder="Nombre del producto"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              id="ID_Category"
              name="ID_Category"
              value={products.ID_Category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Selecciona categoría</option>

              {categoryData?.data?.map((cat) => (
                <option key={cat.ID_Category} value={cat.ID_Category}>
                  {cat.Description}
                </option>
              ))}

              <option
                disabled
                className="bg-gray-100 text-gray-500 text-sm font-medium"
              >
                ---------------------------
              </option>
              <option value={-1} className="text-blue-600 font-semibold">
                ➕ Crear nueva categoría
              </option>
            </select>
            <input
              type="text"
              id="Code"
              name="Code"
              value={products.Code}
              onChange={(e) => setProducts({ ...products, Code: e.target.value })}
              placeholder="Código del producto"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input 
              type="file"
              id="Imagen"
              name="Imagen"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setProducts({ ...products, Imagen: file.name });
                }
              }}
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />   
          </div>

          {/* Stock del producto */}
          {products.StockData.map((stock, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 border-t pt-2 pb-2">
              <input
                type="text"
                value={stock.Description}
                onChange={(e) => {
                  const newStock = [...products.StockData];
                  newStock[index].Description = e.target.value;
                  setProducts({ ...products, StockData: newStock });
                }}
                placeholder="Descripción"
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="number"
                value={stock.Amount === 0 ? '' : stock.Amount}
                onChange={(e) => {
                  const newStock = [...products.StockData];
                  newStock[index].Amount = Number(e.target.value);
                  setProducts({ ...products, StockData: newStock });
                }}
                placeholder="Stock"
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="number"
                value={stock.Saleprice === 0 ? '' : stock.Saleprice}
                onChange={(e) => {
                  const newStock = [...products.StockData];
                  newStock[index].Saleprice = Number(e.target.value);
                  setProducts({ ...products, StockData: newStock });
                }}
                placeholder="Precio venta"
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="number"
                value={stock.Purchaseprice === 0 ? '' : stock.Purchaseprice}
                onChange={(e) => {
                  const newStock = [...products.StockData];
                  newStock[index].Purchaseprice = Number(e.target.value);
                  setProducts({ ...products, StockData: newStock });
                }}
                placeholder="Precio compra"
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <div className="flex justify-end mt-4 gap-4">
            <button
              type="button"
              onClick={addInput}
              className={styles.btnaddvariant}
            >
              Añadir variante
            </button>

            <button
              type="button"
              onClick={removeInput}
              className={styles.btnremovevariant}
            >
              Eliminar variante
            </button>
          </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Guardar producto
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default ModalProduct;
