import React from "react";

const ComprasList = () => {
  const products = [
    { id: 1, name: "Producto A", categoria: "a", codigo: "2121212323", price: 100 },
    { id: 2, name: "Producto B", categoria: "b", codigo: "2121212323", price: 200 },
  ];

  return (
    <div className="overflow-x-auto border rounded-md shadow-sm">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-2"><input type="checkbox" /></th>
            <th className="px-4 py-2">Compra</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Tipo</th>
            <th className="px-4 py-2">Registrado Por</th>
            <th className="px-4 py-2">Proveedor</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Balance</th>

          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id} className="border-t">
              <td className="px-4 py-2"><input type="checkbox" /></td>
              <td className="px-4 py-2">{prod.id}</td>
              <td className="px-4 py-2">{prod.name}</td>
              <td className="px-4 py-2">{prod.categoria}</td>
              <td className="px-4 py-2">{prod.codigo}</td>
              <td className="px-4 py-2">${prod.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComprasList;
