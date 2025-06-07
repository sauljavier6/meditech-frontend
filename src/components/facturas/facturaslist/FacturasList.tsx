import React from "react";

interface Factura {
  id: number;
  fecha: string;
  cliente: string;
  total: number;
  correo: string;
  estado: string;
}

interface FacturasListProps {
  onClick: (item: Factura) => void;
}

const FacturasList = ({ onClick }: FacturasListProps) => {
  const facturas: Factura[] = [
    { id: 1, fecha: "2024-05-26", cliente: "Juan Pérez", total: 1500, correo: "juan@example.com", estado: "Emitida" },
    { id: 2, fecha: "2024-05-27", cliente: "María López", total: 2500, correo: "maria@example.com", estado: "Cancelada" },
  ];

  return (
    <div className="overflow-x-auto border rounded-md shadow-sm">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="px-2 py-2">#Orden</th>
            <th className="px-2 py-2">Fecha</th>
            <th className="px-2 py-2">Cliente</th>
            <th className="px-2 py-2">Total</th>
            <th className="px-2 py-2">Correo</th>
            <th className="px-2 py-2">Estado</th>
            <th className="px-2 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {facturas.map((factura) => (
            <tr key={factura.id} className="border-t hover:bg-gray-50 cursor-pointer">
              <td className="px-2 py-2">{factura.id}</td>
              <td className="px-2 py-2">{factura.fecha}</td>
              <td className="px-2 py-2">{factura.cliente}</td>
              <td className="px-2 py-2">${factura.total}</td>
              <td className="px-2 py-2">{factura.correo}</td>
              <td className="px-2 py-2">{factura.estado}</td>
              <td className="px-2 py-2">
              <button
                onClick={() => onClick(factura)}
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                <img src="/icons/expediente.png" alt="Facturar" className="w-4 h-4" />
                Facturar
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacturasList;
