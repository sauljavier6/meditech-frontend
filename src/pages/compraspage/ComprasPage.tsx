
import { useState } from "react";
import styles from "./ComprasPage.module.scss";
import ComprasList from "../../components/compras/comprasygastos/compraslist/ComprasList";
import ComprasForm from "../../components/compras/comprasygastos/compras/ComprasForm";

const ComprasPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [formOpen, setFormOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateCompra = () => {
    setFormOpen(true);
  };

  return (
    <div>
    {!formOpen && (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h1 className={styles.title}>Compras</h1>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Buscar compra..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-3 py-2 border border-gray-300 rounded-md w-full sm:w-64"
          />

          <button
            onClick={handleCreateCompra}
            className={styles.buttonCrearProducto}
          >
            Registrar compra
          </button>

          <button
            onClick={handleCreateCompra}
            className={styles.buttonEditarProducto}
          >
            Editar
          </button>

          <button
            onClick={handleCreateCompra}
            className={styles.buttonEliminarProducto}
          >
            Eliminar
          </button>
        </div>
      </div>

      
      <ComprasList />
    </div>
     )}

    {formOpen && (
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setFormOpen(false)} className="flex items-center gap-2 hover:text-blue-600">
            <img
              src="/icons/flecha.png"
              alt="flecha"
              className="w-5 h-5 transform rotate-180"
            />
            <span className="text-sm">Regresar</span>
          </button>
        </div>
        <ComprasForm/>
      </div>
    )}
    </div>
  );
};

export default ComprasPage;
