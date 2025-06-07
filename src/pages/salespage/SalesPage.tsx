
import { useState } from "react";
import SalesList from "../../components/sales/saleslist/SalesList";
import styles from "./SalesPage.module.scss";

const VentasPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateSale = () => {
    // Aquí puedes abrir un modal o navegar a un formulario
    console.log('Crear producto');
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h1 className={styles.title}>Ventas</h1>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Buscar venta..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-3 py-2 border border-gray-300 rounded-md w-full sm:w-64"
          />

          <button
            onClick={handleCreateSale}
            className={styles.buttonEditarProducto}
          >
            Editar
          </button>

          <button
            onClick={handleCreateSale}
            className={styles.buttonEliminarProducto}
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Pasamos el término de búsqueda al componente de la lista */}
      <SalesList/>
    </div>
  );
}; 

export default VentasPage;
