
import { useState } from "react";
import QuotesList from "../../components/sales/quotes/quoteslist/QuotesList";
import styles from "./QuotesPage.module.scss";
import CajasQuotes from "../../components/sales/quotes/cajaquotes/CajaQuotes";

const QuotesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cajaOpen, setCajaOpen] = useState(false);

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateQuote = () => {
    setCajaOpen(true);
  };

  return (
    <div>

    {!cajaOpen && (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h1 className={styles.title}>Cotizaciones</h1>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Buscar cotizaciones..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-3 py-2 border border-gray-300 rounded-md w-full sm:w-64"
          />

          <button
            onClick={handleCreateQuote}
            className={styles.buttonCrearProducto}
          >
            Crear Cotizacion
          </button>

          <button
            onClick={handleCreateQuote}
            className={styles.buttonEditarProducto}
          >
            Editar
          </button>

          <button
            onClick={handleCreateQuote}
            className={styles.buttonEliminarProducto}
          >
            Eliminar
          </button>
        </div>
      </div>

      
        <QuotesList/>
      
    </div>
    )}

    {cajaOpen && (
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setCajaOpen(false)} className="flex items-center gap-2 hover:text-blue-600">
            <img
              src="/icons/flecha.png"
              alt="flecha"
              className="w-5 h-5 transform rotate-180"
            />
            <span className="text-sm">Regresar</span>
          </button>
        </div>
        <CajasQuotes />
      </div>
    )}
  </div>
  );
};

export default QuotesPage;


