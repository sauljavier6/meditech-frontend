import React from "react";

const ProductsList = () => {
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
            <th className="px-2 py-2">ID</th>
            <th className="px-2 py-2">Nombre</th>
            <th className="px-2 py-2">Categoria</th>
            <th className="px-2 py-2">Codigo</th>
            <th className="px-2 py-2">Precio</th>
            <th className="px-2 py-2">Imagen</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
