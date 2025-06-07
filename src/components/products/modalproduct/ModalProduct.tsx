import React, { useState } from "react";
import styles from "./ModalProducts.module.scss";

interface ModalProductProps { 
  onClose: () => void;
}

const ModalProduct = ({onClose}:ModalProductProps) => {
  const [isCounting, setIsCounting] = useState<number[]>([1]);

  const addInput = () => {
    setIsCounting((prev) => [...prev, prev.length + 1]);
  };

  const removeInput = () => {
    setIsCounting((prev) => prev.slice(0, -1));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Crear Producto</h2>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
            <img src="/icons/close.png" alt="Cerrar" className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario */}
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="Nombre del producto"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Selecciona categoria</option>
              <option value="opcion1">Pastillas</option>
              <option value="opcion2">Inyectables</option>
              <option value="opcion3">Solucion oral</option>
            </select>
            <input
              type="text"
              placeholder="Código del producto"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input 
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Stock del producto */}
          {isCounting?.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 border-t pt-2 pb-2">
              <input
                type="text"
                placeholder="Porción"
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                placeholder="Stock"
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                placeholder="Precio venta"
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
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
        </form>

        {/* Botón guardar */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Guardar producto
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalProduct;
