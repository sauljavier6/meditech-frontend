import React from "react";

interface ModalCajasProps { 
  openCaja: (id:number) => void;
}

const CajasList = ({ openCaja }: ModalCajasProps) => {
  const products = [
    { id: 1, name: "Producto A", categoria: "a", codigo: "2121212323", price: 100 },
    { id: 2, name: "Producto B", categoria: "b", codigo: "2121212323", price: 200 },
  ];

  const handleRowClick = (id:number) => {
    openCaja(id);
  };

  return (
    <div className="overflow-x-auto border rounded-md shadow-sm">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="px-5 py-2"><input type="checkbox" /></th>
            <th className="px-5 py-2">Lote</th>
            <th className="px-5 py-2">Fecha</th>
            <th className="px-10 py-2">Creado por</th>
            <th className="px-10 py-2">Saldo Total</th>
            <th className="px-5 py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id} className="border-t" onClick={() => handleRowClick(prod.id)}>
              <td className="px-5 py-2"><input type="checkbox" onClick={(e) => e.stopPropagation()} /></td>
              <td className="px-5 py-2">{prod.id}</td>
              <td className="px-5 py-2">{prod.name}</td>
              <td className="px-10 py-2">{prod.categoria}</td>
              <td className="px-10 py-2">{prod.codigo}</td>
              <td className="px-5 py-2">${prod.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CajasList;
