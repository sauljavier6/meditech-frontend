// Interface para el envío desde frontend
interface StockInput {
  Description: string;
  Amount: number;
  Saleprice: number;
  Purchaseprice: number;
  State?: boolean;
}

interface ProductInput {
  Description: string;
  ID_Category: number;
  Code: string;
  Imagen: string;
  State?: boolean;
  StockData: StockInput[];
}

const token = localStorage.getItem('token')

export const getProducts = async (page = 1, limit = 10) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/product?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Error al obtener productos');
  return await res.json(); // Retorna: { data, pagination, message }
};


export const postProduct = async (productData: ProductInput) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al crear producto');
  }

  return await res.json();
};


export const deleteMultipleProducts = async (ids: number[]) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/product`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ids }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al eliminar productos');
  }

  return await res.json();
};


export const getProductById = async (id: number) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('No se pudo obtener el producto');
  }

  return await res.json();
};

export const updateProduct = async (productData: ProductInput) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/product`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al actualizar el producto');
  }

  return await res.json();
};



export const searchProducts = async (query: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/product/search?q=${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  if (!res.ok) throw new Error('Error al buscar productos');
  return await res.json();
};

