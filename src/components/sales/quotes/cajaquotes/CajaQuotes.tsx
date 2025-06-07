  import React, { useState } from "react";
  import styles from "./CajaQuotes.module.scss";
import ModalCustomers from "../../customers/modalcustomers/ModalCustomers";


  const CajasQuotes = () => {
    const [products, setProducts] = useState([
      { id: 1, name: "Paracetamol", quantity: 2, price: 50 },
      { id: 2, name: "Ibuprofeno", quantity: 1, price: 70 },
    ]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProductsDelete, setSelectedProductsDelete] = useState<number[]>([]);
    const allSelected = products.length > 0 && products.every((p) => selectedProductsDelete.includes(p.id));

    const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const iva = subtotal * 0.16; // IVA 16%
    const total = subtotal + iva; 

    const handleCreateCustomer = () => {
      setModalOpen(true);
    };

    return (
      <div className="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Caja</h2>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="border rounded px-3 py-2 w-full mr-2"
          />
          <button onClick={() => {setProducts((prev) => prev.filter((p) => !selectedProductsDelete.includes(p.id)));setSelectedProductsDelete([]);}} className={styles.removeButton}>
            Quitar
          </button>
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
