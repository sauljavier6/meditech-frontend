import React from 'react';

interface DetalleLoteProps {
  efectivo: number;
  tarjetas: number;
  cheques: number;
  ventas: number;
  salidas: number;
}

const DetallesCaja = ({ efectivo, tarjetas, cheques, ventas, salidas }: DetalleLoteProps) => {
  const totalIngresos = efectivo + tarjetas + cheques;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Detalle del Lote</h2>

      <div className="space-y-3">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-600">💵 Efectivo</span>
          <span className="font-semibold">${efectivo.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-600">💳 Tarjetas</span>
          <span className="font-semibold">${tarjetas.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-600">📝 Cheques</span>
          <span className="font-semibold">${cheques.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center border-b pb-2 mt-4">
          <span className="text-gray-800 font-medium">📈 Ventas</span>
          <span className="text-green-600 font-semibold">${ventas.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-800 font-medium">📉 Salidas</span>
          <span className="text-red-600 font-semibold">-${salidas.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center mt-4 pt-2 border-t">
          <span className="text-gray-900 font-bold">💰 Total Ingresos</span>
          <span className="text-blue-600 font-bold">${totalIngresos.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default DetallesCaja;
