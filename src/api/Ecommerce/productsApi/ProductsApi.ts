const token = localStorage.getItem('token')

export const getProductsCatalogoBanner = async ({ page = 1, limit = 10 }) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/ecommerce/products?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!res.ok) throw new Error('Error al obtener productos');
  return await res.json();
};

export const getProductsBestProduct = async ({ page = 1, limit = 10 }) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/ecommerce/products?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!res.ok) throw new Error('Error al obtener productos');
  return await res.json();
};

export const getProductById = async (id: number) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/ecommerce/products/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });

  if (!res.ok) {
    throw new Error('No se pudo obtener el producto');
  }

  return await res.json();
};