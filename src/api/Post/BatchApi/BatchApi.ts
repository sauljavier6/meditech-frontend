const token = localStorage.getItem('token');

export const getBatch = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/batch`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al obtener los estados');
  }

  return await res.json();
};


interface BatchData {
  operador: string;
  lote: string;
  fecha: string;
}

export const postBatch = async (data: BatchData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/batch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al crear el lote');
  }

  return await res.json();
};

