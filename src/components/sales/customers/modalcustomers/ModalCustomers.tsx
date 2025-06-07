import { useState } from "react";
import styles from "./ModalCustomers.module.scss";

interface ModalCustomersProps {
  onClose: () => void;
}

const ModalCustomers = ({ onClose }: ModalCustomersProps) => {
  const [activeTab, setActiveTab] = useState<"personal" | "facturacion">("personal");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Crear Cliente</h2>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
            <img src="/icons/close.png" alt="Cerrar" className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs (Switch) */}
        <div className="flex justify-center gap-0 mb-6 bg-gray-200 p-0 rounded-[50px]">
          <button
            type="button"
            onClick={() => setActiveTab("personal")}
            className={`px-4 py-2 rounded ${
              activeTab === "personal"
                ? styles.tabActive
                : styles.tabinActive
            }`}
          >
            Datos personales
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("facturacion")}
            className={`px-4 py-2 rounded ${
              activeTab === "facturacion"
                ? styles.tabActive
                : styles.tabinActive
            }`}
          >
            Datos de facturación
          </button>
        </div>

        {/* Formulario */}
        <form>
          {activeTab === "personal" && (
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="nombreCliente" className="block mb-1 text-sm font-medium text-gray-700">
                  Nombre del cliente
                </label>
                <input
                  id="nombreCliente"
                  type="text"
                  placeholder="Nombre del cliente"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label htmlFor="telefonoCliente" className="block mb-1 text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  id="telefonoCliente"
                  type="text"
                  placeholder="Teléfono"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label htmlFor="correoCliente" className="block mb-1 text-sm font-medium text-gray-700">
                  Correo
                </label>
                <input
                  id="correoCliente"
                  type="email"
                  placeholder="Correo"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          )}

          {activeTab === "facturacion" && (
            <div className="grid grid-cols-1 gap-4">
               <div>
                <label htmlFor="rfcCliente" className="block mb-1 text-sm font-medium text-gray-700">
                  Razon social
                </label>
                <input
                  id="razonsocialCliente"
                  type="text"
                  placeholder="RFC"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="rfcCliente" className="block mb-1 text-sm font-medium text-gray-700">
                  Codigo postal
                </label>
                <input
                  id="codigopostalCliente"
                  type="text"
                  placeholder="RFC"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div> 
              <div>
                <label htmlFor="rfcCliente" className="block mb-1 text-sm font-medium text-gray-700">
                  RFC
                </label>
                <input
                  id="rfcCliente"
                  type="text"
                  placeholder="RFC"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="rfcCliente" className="block mb-1 text-sm font-medium text-gray-700">
                  Regimen fiscal
                </label>
                <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                <option value="">Selecciona Regimen fiscal</option>
                <option value="opcion1">Opción 1</option>
                <option value="opcion2">Opción 2</option>
                <option value="opcion3">Opción 3</option>
                </select>
              </div> 
            </div>
          )}

          {/* Botón guardar */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className={styles.submitButton}
            >
              Guardar cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCustomers;
