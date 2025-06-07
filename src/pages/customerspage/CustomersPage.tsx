
import { useState } from "react";
import styles from "./CustomersPage.module.scss";
import CustomersList from "../../components/sales/customers/customerslist/CustomersList";
import ModalCustomers from "../../components/sales/customers/modalcustomers/ModalCustomers";

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateCustomer = () => {
    setModalOpen(true);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h1 className={styles.title}>Clientes</h1>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-3 py-2 border border-gray-300 rounded-md w-full sm:w-64"
          />

          <button
            onClick={handleCreateCustomer}
            className={styles.buttonCrearProducto}
          >
            Crear Cliente
          </button>

          <button
            onClick={handleCreateCustomer}
            className={styles.buttonEditarProducto}
          >
            Editar
          </button>

          <button
            onClick={handleCreateCustomer}
            className={styles.buttonEliminarProducto}
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Pasamos el término de búsqueda al componente de la lista */}
      <CustomersList/>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <ModalCustomers onClose={() => setModalOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
