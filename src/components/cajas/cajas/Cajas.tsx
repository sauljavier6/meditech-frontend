  import React, { useState } from "react";
  import styles from "./Cajas.module.scss";
import ModalCustomers from "../../sales/customers/modalcustomers/ModalCustomers";


  const Cajas = () => {
    const [products, setProducts] = useState([
      { id: 1, name: "Paracetamol", quantity: 2, price: 50 },
      { id: 2, name: "Ibuprofeno", quantity: 1, price: 70 },
    ]);
    const [selectedProductsDelete, setSelectedProductsDelete] = useState<number[]>([]);
    const allSelected = products.length > 0 && products.every((p) => selectedProductsDelete.includes(p.id));
    const [modalOpen, setModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"caja" | "retiro">("caja");

    const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const iva = subtotal * 0.16; // IVA 16%
    const total = subtotal + iva;

    const handleRetiroSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const data = {
        monto: formData.get("monto"),
        descripcion: formData.get("descripcion"),
        tipoPago: formData.get("tipoPago"),
        // El lote puedes obtenerlo de la sesión o donde lo tengas
        lote: "Lote #123", 
      };

      console.log("Datos del formulario:", data);
    };

    const handleCreateCustomer = () => {
      setModalOpen(true);
    };

    return (
      <div className="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto">
        
        {/* Encabezado */}
        <div className="flex justify-start gap-0 mb-6 bg-gray-200 p-0 rounded-full text-sm w-44">
          <button
            type="button"
            onClick={() => setActiveTab("caja")}
            className={`px-4 py-2 rounded ${
              activeTab === "caja"
                ? styles.tabActive
                : styles.tabinActive
            }`}
          >
            Caja
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("retiro")}
            className={`px-4 py-2 rounded ${
              activeTab === "retiro"
                ? styles.tabActive
                : styles.tabinActive
            }`}
          >
            Retiro
          </button>
        </div>


        {activeTab === "caja" && (  
        <>
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
            Imprimir ticket
          </button>
          <button className={styles.buttonAgregarCliente}>
            Enviar por correo
          </button>
        </div>
        </>
        )}

        {activeTab === "retiro" && (
          <div className="border rounded p-4 mb-4 bg-white shadow">
            <h3 className="font-semibold text-lg mb-4">Retiro de dinero</h3>
          <form onSubmit={handleRetiroSubmit}> 
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="monto">
                Monto a retirar
              </label>
              <input
                type="number"
                name="monto"
                placeholder="Ingrese el monto..."
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Lote
              </label>
              <input
                type="text"
                name="lote"
                value={`Lote: #`} // reemplaza session.lote por tu variable de sesión
                disabled
                className="w-full border rounded px-3 py-2 text-sm bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="descripcion">
                Motivo del retiro
              </label>
              <textarea
                name="descripcion"
                placeholder="Motivo del retiro..."
                rows={3}
                className="w-full border rounded px-3 py-2 text-sm"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="tipoPago">
                Tipo de retiro
              </label>
              <select
                name="tipoPago"
                className="w-full border rounded px-3 py-2 text-sm"
                defaultValue=""
              >
                <option value="" disabled>Selecciona una opción</option>
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia</option>
                <option value="cheque">Cheque</option>
              </select>
            </div>

            <div className="flex justify-center">
              <button className={styles.buttonAgregarCliente}>
                Confirmar retiro
              </button>
            </div>
          </form>
          </div>
        )}

        {modalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <ModalCustomers onClose={() => setModalOpen(false)} />
          </div>
        )}
      </div>
    );
  };

  export default Cajas;
