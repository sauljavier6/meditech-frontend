import React from "react";

const salesList = () => {
  const products = [
    { id: 1, name: "Producto A", categoria: "a", codigo: "2121212323", price: 100 },
    { id: 2, name: "Producto B", categoria: "b", codigo: "2121212323", price: 200 },
  ];

  return (
    <div className="overflow-x-auto border rounded-md shadow-sm">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="px-2 py-2"><input type="checkbox" /></th>
            <th className="px-2 py-2">Venta</th>
            <th className="px-2 py-2">Fecha</th>
            <th className="px-2 py-2">Cliente</th>
            <th className="px-2 py-2">Pago</th>
            <th className="px-2 py-2">Total</th>
            <th className="px-2 py-2">Deuda</th>
            <th className="px-2 py-2">Productos</th>
            <th className="px-2 py-2">Cajero</th>
            <th className="px-2 py-2">Canal</th>
            <th className="px-2 py-2">Factura</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id} className="border-t">
              <td className="px-2 py-2"><input type="checkbox" /></td>
              <td className="px-2 py-2">{prod.id}</td>
              <td className="px-2 py-2">{prod.name}</td>
              <td className="px-2 py-2">{prod.categoria}</td>
              <td className="px-2 py-2">{prod.codigo}</td>
              <td className="px-2 py-2">${prod.price}</td>
              <td className="px-2 py-2">img</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default salesList;
