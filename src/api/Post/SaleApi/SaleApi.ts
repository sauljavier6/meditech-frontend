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


export const searchProducts = async (query: string) => {
  console.log('query',query)
  const res = await fetch(`${import.meta.env.VITE_API_URL}/sale/search?q=${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  if (!res.ok) throw new Error('Error al buscar productos');
  return await res.json();
};

export const postSale = async (saleData:SaleData) => {
  console.log('entro a la api del front', saleData)
  const res = await fetch(`${import.meta.env.VITE_API_URL}/sale`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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
  nombre: string;
  telefono: string;
  correo: string;
  razonSocial?: string;
  codigoPostal?: string;
  rfc?: string;
  regimenFiscal?: string;
}

export const postCustomerSale = async (customersSaleData:CustomerFormData) => {
  console.log('entro a la api del front')
  const res = await fetch(`${import.meta.env.VITE_API_URL}/sale/customer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(customersSaleData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al crear cliente');
  }

  return await res.json();
};