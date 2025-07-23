

export const getCategory = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/category`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al obtener los estados');
  }

  return await res.json();
};
