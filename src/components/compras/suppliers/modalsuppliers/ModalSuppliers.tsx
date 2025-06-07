import { useState } from 'react';

interface ModalCajasProps { 
  onClose: () => void;
}

const ModalSuppliers = ({ onClose }: ModalCajasProps) => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos del lote:', formData);
    // Aquí podrías enviar los datos a una API o hacer lo necesario
    onClose(); // Cierra el modal después de guardar
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Crear proveedor</h2>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
            <img src="/icons/close.png" alt="Cerrar" className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre del proveedor"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="lote"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Telefono"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="fecha"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Correo"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Botón guardar */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition"
            >
              Guardar Proveedor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalSuppliers;
