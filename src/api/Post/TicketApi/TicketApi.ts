const token = localStorage.getItem('token')

export const getTicket = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/ticket`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al obtener ticket');
  }

  return await res.json();
};

export const sendTicket = async (id: number) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/ticket/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al enviar ticket');
  }

  return await res.json();
};
