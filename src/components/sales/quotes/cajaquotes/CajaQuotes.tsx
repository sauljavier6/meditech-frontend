import React, { useEffect, useState } from "react";
import styles from "./CajaQuotes.module.scss";
import ModalCustomers from "../../customers/modalcustomers/ModalCustomers";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../../../../api/Post/SaleApi/SaleApi";

interface SaleProduct {
  id: number;
  name: string;
  quantity: number;
  price: number;
}


  const CajasQuotes = () => {    
    const [search, setSearch] = useState('');
    const [debounced, setDebounced] = useState(search);
    const [products, setProducts] = useState<SaleProduct[]>([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProductsDelete, setSelectedProductsDelete] = useState<number[]>([]);
    const allSelected = products.length > 0 && products.every((p) => selectedProductsDelete.includes(p.id));

    const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva; 

    useEffect(() => {
      const timeout = setTimeout(() => setDebounced(search), 300);
      return () => clearTimeout(timeout);
    }, [search]);

    const { data, isLoading } = useQuery({
      queryKey: ['search', debounced],
      queryFn: () => searchProducts(debounced || ''),
      enabled: debounced.length > 0,
    });

    console.log('data',data)

    const handleCreateCustomer = () => {
      setModalOpen(true);
    };

    return (
      <div className="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Caja</h2>

      <div className="flex flex-col mb-4 relative">
        <div className="flex items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar producto..."
            className="border rounded px-3 py-2 w-full mr-2"
          />
          <button
            onClick={() => {
              setProducts((prev) => prev.filter((p) => !selectedProductsDelete.includes(p.id)));
              setSelectedProductsDelete([]);
            }}
            className={styles.removeButton}
          >
            Quitar
          </button>
        </div>

        {/* Lista de sugerencias */}
        {search.length > 0 && data?.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-md z-10 max-h-60 overflow-y-auto">
            {data.map((product) => (
              <li
                key={product.ID_Product}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setProducts((prev) => {
                    const exists = prev.find(p => p.id === product.ID_Product);
                    if (exists) {
                      return prev.map(p =>
                        p.id === product.ID_Product
                          ? { ...p, quantity: p.quantity + 1 }
                          : p
                      );
                    } else {
                      return [
                        ...prev,
                        {
                          id: product.ID_Product,
                          name: product.Description,
                          quantity: 1,
                          price: product.Stock?.[0]?.Saleprice || 0,
                        }
                      ];
                    }
                  });
                  setSearch('');
                }}
              >
                {product.Description} - {product.Code}
              </li>
            ))}
          </ul>
        )}

        {/* Resultado vacío */}
        {search.length > 0 && !isLoading && data?.length === 0 && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-md z-10 px-4 py-2 text-gray-500">
            No se encontraron productos.
          </div>
        )}
      </div>


        <div className="border rounded p-4 mb-4">
          <h3 className="font-semibold mb-2">Productos en venta</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProductsDelete(products.map((p) => p.id)); // Marca todos
                      } else {
                        setSelectedProductsDelete([]); // Desmarca todos
                      }
                    }}
                  />
                </th>
                <th className="text-left">Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b">
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedProductsDelete.includes(p.id)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setSelectedProductsDelete((prev) =>
                          checked
                            ? [...prev, p.id]
                            : prev.filter((id) => id !== p.id)
                        );
                      }}
                    />
                  </td>
                  <td className="py-1">{p.name}</td>
                  <td className="text-center">{p.quantity}</td>
                  <td className="text-center">${p.price}</td>
                  <td className="text-center">${p.price * p.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <button onClick={handleCreateCustomer} className={styles.buttonAgregarCliente}>
            + Agregar cliente
          </button>

          <div className="text-sm w-full md:w-auto">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>IVA (16%): ${iva.toFixed(2)}</p>
            <p className="font-semibold">Total: ${total.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <button className={styles.buttonfacturar}>
            Facturar
          </button>
          <button className={styles.buttonAgregarCliente}>
            Guardar
          </button>
          <button className={styles.buttonAgregarCliente}>
            Imprimir cotizacion
          </button>
          <button className={styles.buttonAgregarCliente}>
            Enviar por correo
          </button>
        </div>

              
        {modalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <ModalCustomers onClose={() => setModalOpen(false)} />
          </div>
        )}

      </div>
    );
  };

  export default CajasQuotes;
