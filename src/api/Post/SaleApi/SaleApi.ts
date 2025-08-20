const token = localStorage.getItem('token')

interface SaleItem {
  productId: number;
  stockId: number;
  quantity: number;
  price: number;
  subtotal: number;
}

interface PaymentSale {
  ID_Payment: number;
  Description: string;
  Monto: number;
  ReferenceNumber: string;
}

interface SaleData {
  ID_User: number;
  Total: number;
  Balance_Total: number;
  ID_State: number;
  Payment: PaymentSale[];
  ID_Operador: number;
  Lote: string;
  items: SaleItem[];
}


interface PaymentSaleData {
  ID_Sale: number;
  Payment: PaymentSale[];
}

export const postPaymentSale = async (saleData:PaymentSaleData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/sale/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(saleData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al crear pago');
  }

  return await res.json();
};

export const searchProducts = async (query: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/sale/search?q=${query}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error('Error al buscar productos');
  return await res.json();
};

export const postSale = async (saleData:SaleData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/sale`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(saleData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al crear venta');
  }

  return await res.json();
};

interface CustomerFormData {
  ID_User?: number | undefined;
  Name: string;
  Phone: string;
  Email: string;
  RazonSocial?: string;
  CodigoPostal?: string;
  Rfc?: string;
  RegimenFiscal?: string;
}

interface CustomerSaleData extends CustomerFormData {
  ID_Sale: number;
}

export const postCustomerSale = async (customersSaleData:CustomerFormData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/sale/customer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(customersSaleData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al crear cliente');
  }

  return await res.json();
};

export const getSale = async ({ page = 1, limit = 10 }) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/sale?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al obtener venta');
  }

  return await res.json();
};

export const putCustomerSale = async (updatedData: CustomerSaleData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/sale/customer`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al actualizar cliente');
  }

  return await res.json();
};

export const postCustomerWithSale = async (customersSaleData:CustomerSaleData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/sale/customerwithsale`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(customersSaleData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al crear cliente');
  }

  return await res.json();
};

export const getSaleById = async (ID_Sale: number) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/sale/sale/${ID_Sale}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al obtener venta");
  }

  const result = await res.json();
  return result.data;
};
