
import { useState } from "react";
import SalesList from "../../components/sales/saleslist/SalesList";
import styles from "./SalesPage.module.scss";
import CajasPays from "../../components/sales/cajaspays/CajasPays";

const VentasPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [isIDSale, setIsIDSale] = useState<number[]>([]);
  const [resetChecks, setResetChecks] = useState(false);

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
        {!openModal && (
        <h1 className={styles.title}>Ventas</h1>
        )}
        <div className="flex flex-col sm:flex-row gap-2">
        {!openModal && (
          <>
            <input
              type="text"
              placeholder="Buscar venta..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-3 py-2 border border-gray-300 rounded-md w-full sm:w-64"
            />
            <button
              onClick={() => setOpenModal(true)}
              disabled={isIDSale.length !== 1}
              className={`px-4 py-2 rounded font-semibold text-white transition-colors duration-200 
                ${isIDSale.length !== 1
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                  : styles.buttonEditarProducto}
              `}
            >
              Registrar Pago
            </button>

            <button
              onClick={handleCreateSale}
              disabled={isIDSale.length !== 1}
              className={`px-4 py-2 rounded font-semibold text-white transition-colors duration-200 
                ${isIDSale.length !== 1
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                  : styles.buttonEliminarProducto}
              `}
            >
              Devolver
            </button>
          </>
        )}
        {openModal && (
                  <button onClick={() => setOpenModal(false)} className="flex items-center gap-2 hover:text-blue-600">
          <img
            src="/icons/flecha.png"
            alt="flecha"
            className="w-5 h-5 transform rotate-180"
          />
          <span className="text-sm">Regresar</span>
        </button>
        )} 
        </div>
      </div>

      {/* Pasamos el término de búsqueda al componente de la lista */}
      {!openModal &&
        <SalesList onSelected={(id) => setIsIDSale(id)} resetChecks={resetChecks}
      onResetComplete={() => setResetChecks(false)}/>
      }
      {openModal &&
      <CajasPays ID_Sale={isIDSale[0]}/>
      }
    </div>
  );
}; 

export default VentasPage;
