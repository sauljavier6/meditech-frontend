
import { useState } from "react";
import styles from "./FacturasPage.module.scss";
import FacturasList from "../../components/facturas/facturaslist/FacturasList";
import FacturaForm from "../../components/facturas/facturasform/FacturasForm";

const FacturasPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFacturasForm, setOpenFacturasForm] = useState(false);
  const [dataFactura, setDataFactura] = useState<any | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateFactura = (factura: any) => {
    setOpenFacturasForm(true); 
    setDataFactura(factura); // Guardamos los datos de la factura seleccionada 
  }

  return (
    <div>
    {!openFacturasForm && (
    <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
            <h1 className={styles.title}>Solicitude de facturas</h1>

            <div className="flex flex-col sm:flex-row gap-2">
            <input
                type="text"
                placeholder="Buscar factura..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="px-3 py-2 border border-gray-300 rounded-md w-full sm:w-64"
            />

            </div>
        </div>

        <FacturasList onClick={handleCreateFactura}/>
    </div>
    )} 

    {openFacturasForm && (
    <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-4">
            <button onClick={() => setOpenFacturasForm(false)} className="flex items-center gap-2 hover:text-blue-600">
            <img
                src="/icons/flecha.png"
                alt="flecha"
                className="w-5 h-5 transform rotate-180"
            />
            <span className="text-sm">Regresar</span>
            </button>
        </div>


        <FacturaForm dataFactura={dataFactura}/> 
        
    </div>
    )}
    </div>
  );
};

export default FacturasPage;
