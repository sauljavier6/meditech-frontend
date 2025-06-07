
import { useState } from "react";
import styles from "./CajasPage.module.scss";
import CajasList from "../../components/cajas/cajaslist/CajasList";
import ModalCajas from "../../components/cajas/modalcajas/ModalCajas";
import Cajas from "../../components/cajas/cajas/Cajas";
import DetallesCaja from "../../components/cajas/detallescajas/DetallesCajas";
import SalesByBatchList from "../../components/cajas/salesbybatchlist/SalesByBatchList";

const CajasPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [openCajas, setOpenCajas] = useState(false);
  const [openCajasDetalles, setOpenCajasDetalles] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateCajas = () => {
    setModalOpen(true);
  };

  const handleOpenCaja = () => {
    setOpenCajas(true);
  };

  return (
    <div>
    {!openCajas && (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h1 className={styles.title}>Cajas</h1>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Buscar lote..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-3 py-2 border border-gray-300 rounded-md w-full sm:w-64"
          />

          <button
            onClick={handleCreateCajas}
            className={styles.buttonCrearProducto}
          >
            Crear Lote
          </button>

          <button
            onClick={handleCreateCajas}
            className={styles.buttonEditarProducto}
          >
            Editar
          </button>

          <button
            onClick={handleCreateCajas}
            className={styles.buttonEliminarProducto}
          >
            Eliminar
          </button>
        </div>
      </div>

      
        <CajasList openCaja={handleOpenCaja}/>
      

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <ModalCajas onClose={() => setModalOpen(false)} />
        </div>
      )}
    </div>
    )}
    {openCajas && (
    <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
      {/* Encabezado con ícono de regreso */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setOpenCajas(false)} className="flex items-center gap-2 hover:text-blue-600">
          <img
            src="/icons/flecha.png"
            alt="flecha"
            className="w-5 h-5 transform rotate-180"
          />
          <span className="text-sm">Regresar</span>
        </button>
        <h2
          onClick={() => setOpenCajasDetalles(!openCajasDetalles)}
          className="text-lg font-semibold text-gray-800 cursor-pointer"
        >
          <div className="flex items-center gap-2">
          <img 
            src="/icons/flecha.png" 
            alt="icono detalles" 
            className="w-5 h-5"
          />
          {openCajasDetalles ? <span className="text-sm">Caja</span> : <span className="text-sm">Detalles</span>}
          </div>
        </h2>
      </div>

      {!openCajasDetalles && (
        <Cajas /> 
      )}

      {openCajasDetalles && (
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/2">
          <DetallesCaja 
            efectivo={3500}
            tarjetas={2000}
            cheques={1500}
            ventas={7000}
            salidas={500} 
          />
        </div>

        <div className="md:w-full">
          <SalesByBatchList /> 
        </div>
      </div>
      )}
    </div>
    )}
    </div>
  ); 
};

export default CajasPage;