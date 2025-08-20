import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { postBatch } from '../../../api/Post/BatchApi/BatchApi';

interface ModalCajasProps { 
  onClose: () => void;
}

const ModalCajas = ({ onClose }: ModalCajasProps) => {
  const [formData, setFormData] = useState({
    operador: getIdUsuario() || '',
    lote: createBatch(),
    fecha: getTodayDate() || '',
  });

  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  function createBatch() {
    const now = new Date();
    const datePart = now.toISOString().split('T')[0].replace(/-/g, '');
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    const idusuario = localStorage.getItem('idusuario')
    return `${datePart}-${idusuario}-${randomPart}`;
  }

  function getIdUsuario() {
    const idusuario = localStorage.getItem('idusuario')
    return idusuario;
  }

    const queryClient = useQueryClient();
    
    const { mutate } = useMutation({
    mutationFn: postBatch,
    onError: (error) => {
        toast.error(`${error.message}`, {
        position: "top-right",
        });
    },
    onSuccess: () => {
        setFormData({
          operador: '',
          lote: '',
          fecha: '',
        });
        onClose();
        toast.success("Lote creado con éxito", {
        position: "top-right",
        progressClassName: "custom-progress",
        });
        queryClient.invalidateQueries({ queryKey: ['batchs'] });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos del lote:', formData);
    mutate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Crear lote</h2>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
            <img src="/icons/close.png" alt="Cerrar" className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
            <input
              type="text"
              name="operador"
              value={formData.operador}
              onChange={handleChange}
              placeholder="Nombre del operador"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="lote"
              value={formData.lote}
              onChange={handleChange}
              placeholder="Lote"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              placeholder="Fecha"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Botón guardar */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition"
            >
              Guardar lote
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCajas;
