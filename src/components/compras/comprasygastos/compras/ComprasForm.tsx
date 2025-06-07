  import React, { useState } from "react";
  import styles from "./CompraForm.module.scss";


  const ComprasForm = () => {
    const [products, setProducts] = useState([
      { id: 1, name: "Paracetamol", quantity: 2, price: 50 },
      { id: 2, name: "Ibuprofeno", quantity: 1, price: 70 },
    ]);
    const [selectedProductsDelete, setSelectedProductsDelete] = useState<number[]>([]);
    const allSelected = products.length > 0 && products.every((p) => selectedProductsDelete.includes(p.id));
    const [modalOpen, setModalOpen] = useState(false);

    const handleCreateCustomer = () => {
      setModalOpen(true);
    };

    return (
      <div className="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto">
        {/* Encabezado */}
        <div className="flex justify-start gap-0 mb-6 p-0 rounded-full text-md w-44">
          Compra
        </div>
 
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
          <h3 className="font-semibold mb-2">Productos en compra</h3>
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
                <th>Variable</th>
                <th>Cantidad</th>
                <th>Precio de compra</th>
                <th>Precio de venta</th>
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
                  <td className="text-center">{p.name}</td>
                  <td className="text-center"><input type="number" value={p.quantity} className="p-1 w-20 text-center border-transparent hover:border hover:border-gray-300 rounded"/></td>
                  <td className="text-center"><input type="text"className="p-1 w-20 text-center border-transparent hover:border hover:border-gray-300 rounded"/></td>
                  <td className="text-center"><input type="text" className="p-1 w-20 text-center border-transparent hover:border hover:border-gray-300 rounded"/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <button onClick={handleCreateCustomer} className={styles.buttonAgregarProveedor}>
            + Agregar proveedor
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="tipoPago">
            Datos del pago
          </label>
          
          <div className="flex flex-wrap gap-2">
            <select
              name="formaPago"
              className="border rounded px-3 py-2 text-sm flex-1 min-w-[150px]"
              defaultValue=""
            >
              <option value="" disabled>Selecciona una opción</option>
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
              <option value="cheque">Cheque</option>
            </select>

            <select
              name="tipoPago"
              className="border rounded px-3 py-2 text-sm flex-1 min-w-[150px]"
              defaultValue=""
            >
              <option value="" disabled>Selecciona una opción</option>
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
              <option value="cheque">Cheque</option>
            </select>

            <input
              type="text"
              placeholder="Monto"
              className="border rounded px-3 py-2 text-sm flex-1 min-w-[120px]"
            />

            <input
              type="text"
              placeholder="Descripcion del pago"
              className="border rounded px-3 py-2 text-sm flex-1 min-w-[200px]"
            />
          </div>
        </div>


        <div className="flex gap-4 justify-end">
          <button className={styles.buttonfacturar}>
            Facturar
          </button>
          <button className={styles.buttonAgregarProveedor }>
            Imprimir ticket
          </button>
          <button className={styles.buttonAgregarProveedor }>
            Enviar por correo
          </button>
        </div>
        </>
      </div>
    );
  };

  export default ComprasForm;
