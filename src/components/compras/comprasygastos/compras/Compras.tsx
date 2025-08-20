import { useEffect, useState } from "react";
import styles from "./Compra.module.scss";
import { searchProducts } from "../../../../api/Post/SaleApi/SaleApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPayments } from "../../../../api/Post/PaymentApi/PaymentApi";
import ModalSuppliers from "../../suppliers/modalsuppliers/ModalSuppliers";
import { toast } from "react-toastify";
import { postCompra } from "../../../../api/Post/ComprasApi/ComprasApi";

interface Product {
  id: number;
  productId: number;
  name: string;
  quantity: number;
  saleprice: number;
  purchaseprice: number;
  amount?: number;
  variant?: string;
}

interface Payment {
  ID_Payment: number;
  Description: string;
  Monto: number;
  ReferenceNumber: string;
}

  export default function Compras() {
    const [search, setSearch] = useState('');
    const [debounced, setDebounced] = useState(search);
    const [products, setProducts] = useState<Product[]>([]);
    const [idSupplier, setUIdSupplier] = useState<number | null>(null);
    const [selectedPayment, setSelectedPayment] = useState<Payment[]>([]);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [amount, setAmount] = useState("");
    const [reference, setReference] = useState("");


    const [selectedProductsDelete, setSelectedProductsDelete] = useState<number[]>([]);
    const allSelected = products.length > 0 && products.every((p) => selectedProductsDelete.includes(p.id));
    const [modalOpen, setModalOpen] = useState(false);

    const subtotal = products.reduce((sum, p) => sum + p.purchaseprice * p.quantity, 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    const idusuario = localStorage.getItem('idusuario')

    useEffect(() => {
      const timeout = setTimeout(() => setDebounced(search), 300);
      return () => clearTimeout(timeout);
    }, [search]);

    const { data, isLoading } = useQuery({
      queryKey: ['search', debounced],
      queryFn: () => searchProducts(debounced || ''),
      enabled: debounced.length > 0,
    });

    const { data: paymentsData } = useQuery({
      queryKey: ['payments'],
      queryFn: getPayments,
    });

    const queryClient = useQueryClient();

    const { mutate: createSupplier } = useMutation({
      mutationFn: postCompra,
      onError: (error) => {
        toast.error(`${error.message}`, {
        position: "top-right",
        });
        },
      onSuccess: () => {
        setProducts([]);
        setSelectedPayment([])
        setPaymentMethod("");
        setAmount("");
        setReference("");
        toast.success("Stock actualizado", {
        position: "top-right",
        progressClassName: "custom-progress",
        });
        queryClient.invalidateQueries({ queryKey: ['compras'] });
      },
    });

    const handleSaveSale = async () => {
      const compradata = {
        ID_Proveedor: idSupplier!,
        Total: total, 
        Balance_Total: total, 
        ID_Operador: idusuario!,
        items: products,
        Payments: selectedPayment
      }

      createSupplier(compradata)
    };

    const handleCreateCustomer = () => {
      setModalOpen(true);
    };

    const handleAddPayment = () => {
      if (!paymentMethod || !amount) return;

      const selectedPaymentData = paymentsData.data.find(
        (p: Payment) => p.ID_Payment === Number(paymentMethod)
      );

      setSelectedPayment((prev) => [
        ...prev,
        {
          ID_Payment: Number(paymentMethod),
          Description: selectedPaymentData?.Description || "",
          Monto: parseFloat(amount),
          ReferenceNumber: reference || "",
        },
      ]);

      // Limpiar campos
      setPaymentMethod("");
      setAmount("");
      setReference("");
    };

    const handleDeletePayment = (index: number) => {
      setSelectedPayment((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSaveSupplier = (data: number) => {
      if (data) {
       setUIdSupplier(data)
      }
    };

    return (
      <div className="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto">

        <div className="mb-4 relative">
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar producto..."
              className="border rounded px-3 py-2 w-full mr-2"
            />
            <button
              onClick={() => {
                setProducts((prev) =>
                  prev.filter((p) => !selectedProductsDelete.includes(p.id))
                );
                setSelectedProductsDelete([]);
              }}
              className={styles.removeButton}
            >
              Quitar
            </button>
          </div>

          {data?.map((product) => (
            <li
              key={product.ID_Product}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <span>{product.Description} - {product.Code}</span>
              <ul className="pl-4">
                {product.Stock?.map((variant) => (
                  <li
                    key={variant.ID_Stock}
                    onClick={() => {
                      setProducts((prev) => {
                        const exists = prev.find(p => p.id === variant.ID_Stock);
                        if (exists) {
                          return prev.map(p =>
                            p.id === variant.ID_Stock
                              ? { ...p, quantity: p.quantity + 1 }
                              : p
                          );
                        } else {
                          return [
                            ...prev,
                            {
                              id: variant.ID_Stock,
                              productId: product.ID_Product,
                              name: `${product.Description} - ${variant.Description}`,
                              quantity: 1,
                              saleprice: variant.Saleprice,
                              purchaseprice: variant.Purchaseprice,
                              amount: variant.Amount,
                              variant: variant.Description,
                            }
                          ];
                        }
                      });
                      setSearch('');
                    }}

                    className="py-1 pl-4 hover:bg-gray-200 cursor-pointer"
                  >
                    Variante: {variant.Description} - Stock: {variant.Amount}
                  </li>
                ))}
              </ul>
            </li>
          ))}

          {search.length > 0 && !isLoading && data?.length === 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-md z-10 px-4 py-2 text-gray-500">
              No se encontraron productos.
            </div>
          )}
        </div>

        <div className="border rounded p-4 mb-4">
          <h3 className="font-semibold mb-2">Productos en venta</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProductsDelete(products.map((p) => p.id));
                      } else {
                        setSelectedProductsDelete([]);
                      }
                    }}
                  />
                </th>
                <th className="text-left">Producto</th>
                <th>Stock comprado</th>
                <th>Precio venta</th>
                <th>Precio compra</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b">
                  <td>
                  <input
                    type="checkbox"
                    checked={selectedProductsDelete.includes(p.id)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSelectedProductsDelete((prev) =>
                        checked ? [...prev, p.id] : prev.filter((id) => id !== p.id)
                      );
                    }}
                  />
                  </td>
                  <td className="py-1">{p.name}</td>
                  <td className="text-center">
                  <input
                    type="number"
                    value={p.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      setProducts((prev) =>
                        prev.map((item) =>
                          item.id === p.id
                            ? { ...item, quantity: newQuantity }
                            : item
                        )
                      );
                    }}
                    className="w-16 text-center border rounded px-1 py-0.5"
                    required
                  />
                  </td>
                  <td className="text-center">
                   <input
                      type="number"
                      step="any"
                      value={p.saleprice}
                      onChange={(e) => {
                        const newSaleprice = parseFloat(e.target.value) || 0;
                        setProducts((prev) =>
                          prev.map((item) =>
                            item.id === p.id
                              ? { ...item, saleprice: newSaleprice }
                              : item
                          )
                        );
                      }}
                      className="w-16 text-center border rounded px-1 py-0.5"
                      required
                    />
                  </td>
                  <td className="text-center">
                   <input
                      type="number"
                      step="any"
                      value={p.purchaseprice}
                      onChange={(e) => {
                        const newPurchaseprice = parseFloat(e.target.value) || 0;
                        setProducts((prev) =>
                          prev.map((item) =>
                            item.id === p.id
                              ? { ...item, purchaseprice: newPurchaseprice }
                              : item
                          )
                        );
                      }}
                      className="w-16 text-center border rounded px-1 py-0.5"
                      required
                    />
                  </td>
                  <td className="text-center">${(p.purchaseprice * p.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <button onClick={handleCreateCustomer} className={styles.buttonAgregarCliente}>
            + Agregar Proveedor
          </button>

          <div className="text-sm w-full md:w-auto">
            <select
              id="metodoPago"
              name="metodoPago"
              className="border rounded px-3 py-2 w-full md:w-auto"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Método de pago de compra</option>
              {paymentsData?.data?.map((payment: any) => (
                <option key={payment.ID_Payment} value={payment.ID_Payment}>
                  {payment.Description}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm w-full md:w-auto">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>IVA (16%): ${iva.toFixed(2)}</p>
            <p className="font-semibold">Total: ${total.toFixed(2)}</p>
          </div>
        </div>

        {paymentMethod && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700">
                Monto del pago
              </label>
              <input
                type="number"
                id="paymentAmount"
                name="paymentAmount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Ej. 500.00"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
                Número de referencia/Notas
              </label>
              <input
                type="text"
                id="reference"
                name="reference"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Ej. #REF1234"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="col-span-full">
              <button
                type="button"
                onClick={handleAddPayment}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Agregar pago
              </button>
            </div>
          </div>
        )}

        {selectedPayment.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Pagos agregados:</h3>

            <div className="grid grid-cols-4 gap-4 font-semibold text-gray-700 border-b pb-1 mb-2">
              <span>Método</span>
              <span>Monto</span>
              <span>Referencia</span>
              <span>Acción</span>
            </div>

            <div className="space-y-2">
              {selectedPayment.map((p, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 gap-4 bg-gray-50 p-2 rounded border text-sm items-center"
                >
                  <span>{p.Description}</span>
                  <span>${p.Monto.toFixed(2)}</span>
                  <span>{p.ReferenceNumber || "—"}</span>
                  <button
                    onClick={() => handleDeletePayment(i)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex mt-10 gap-4 justify-end">
        <button
          onClick={handleSaveSale}
          disabled={products.length === 0}
          className={`${styles.buttonAgregarCliente} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Completar
        </button>
        </div>

        {modalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <ModalSuppliers onClose={() => setModalOpen(false)} onSave={handleSaveSupplier}/>
          </div>
        )}
      </div>
    );
  };