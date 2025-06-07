
import { useState } from "react";
import styles from "./SuppliersPage.module.scss";
import SuppliersList from "../../components/compras/suppliers/supplierslist/SuppliersList";
import ModalSuppliers from "../../components/compras/suppliers/modalsuppliers/ModalSuppliers";

const SuppliersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateProveedor = () => {
    setModalOpen(true);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h1 className={styles.title}>Proveedores</h1>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Buscar proveedor..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-3 py-2 border border-gray-300 rounded-md w-full sm:w-64"
          />

          <button
            onClick={handleCreateProveedor}
            className={styles.buttonCrearProducto}
          >
            Registrar proveedor
          </button>

          <button
            onClick={handleCreateProveedor}
            className={styles.buttonEditarProducto}
          >
            Editar
          </button>

          <button
            onClick={handleCreateProveedor}
            className={styles.buttonEliminarProducto}
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Pasamos el término de búsqueda al componente de la lista */}
      <SuppliersList />

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <ModalSuppliers onClose={() => setModalOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default SuppliersPage;
