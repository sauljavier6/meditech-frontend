// src/components/FacturaForm.tsx
import { useState } from 'react';
import style from './FacturasForm.module.scss';

interface FacturaFormProps {
  dataFactura?: any;
}

const FacturaForm = ({dataFactura}:FacturaFormProps) => {

  const [items, setItems] = useState([
    { description: "Paracetamol 500gr", quantity: 2, unit_price: 50 },
    { description: "XL3 500gr", quantity: 1, unit_price: 40 },
  ]);


  return (
    <form className="max-w-xl mx-auto bg-white p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Generar Factura</h2>

      <label className="block mb-2">RFC</label>
      <input type="text" className="border px-2 py-1 w-full mb-4" required />

      <label className="block mb-2">Razón Social</label>
      <input type="text" className="border px-2 py-1 w-full mb-4" required />

      <label className="block mb-2">Uso CFDI</label>
      <select className="border px-2 py-1 w-full mb-4">
        <option value="G03">G03 - Gastos en general</option>
        <option value="P01">P01 - Por definir</option>
        <option value="D01">D01 - Honorarios médicos</option>
      </select>

      <label className="block mb-2">Forma de Pago</label>
      <select className="border px-2 py-1 w-full mb-4">
        <option value="03">03 - Transferencia</option>
        <option value="01">01 - Efectivo</option>
        <option value="04">04 - Tarjeta de crédito</option>
      </select>

      <h3 className="font-semibold mb-2">Conceptos (Productos/Servicios)</h3>
      {items.map((item, index) => (
        <div key={index} className="mb-2 flex gap-2">
          <input
            type="text"
            placeholder="Descripción"
            value={item.description}
            className="border px-2 py-1 w-full"
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={item.quantity}
            className="border px-2 py-1 w-24"
          />
          <input
            type="number"
            placeholder="Precio"
            value={item.unit_price}
            className="border px-2 py-1 w-24"
          />
        </div>
      ))}


      <button type="submit" className={style.btngenerarfactura}>
        Generar Factura
      </button>
    </form>
  );
};

export default FacturaForm;
