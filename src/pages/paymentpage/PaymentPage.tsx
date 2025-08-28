// PaymentPage.tsx
import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { payment } from "../../api/Ecommerce/stripeApi/StripeApi";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

function CheckoutFormInner() {
  const { state, getTotal, clearCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    try {
      const amount = Math.round(getTotal() * 100);

      const data = await payment({
        amount,
        items: state.items,
        name: name,
        email: email,
      });

      const cardNumber = elements.getElement(CardNumberElement)!;

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: cardNumber },
      });

      if (result.error) setMessage(result.error.message || "Error en el pago");
      else if (result.paymentIntent?.status === "succeeded") {
        setMessage("✅ Pago exitoso!");
        clearCart();
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error al procesar el pago");
    } finally {
      setLoading(false);
    }
  };

  const elementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#111827",
        "::placeholder": { color: "#9ca3af" },
      },
      invalid: { color: "#ef4444" },
    },
  };

  return (
    <div className="max-w-5xl mx-auto sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white sm:shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Resumen de tu compra</h2>
          <div className="space-y-4">
            {state.items.map((item) => (
              <div
                key={item.ID_Stock}
                className="flex justify-between items-center border-b pb-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`${import.meta.env.VITE_API_URL_IMAGES}${item.Imagen}`}
                    alt={item.Description}
                    className="w-16 h-16 object-cover rounded-lg shadow"
                  />
                  <div>
                    <p className="font-semibold">{item.Description}</p>
                    <p className="text-sm text-gray-500">{item.StockDescription}</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-800">
                  {item.Quantity} x ${item.Saleprice.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-xl mt-6 border-t pt-4">
            <span>Total:</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-white sm:shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Datos de pago</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Nombre</label>
              <input
                type="text"
                value={name}
                placeholder="Nombre completo"
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                placeholder="correo@ejemplo.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Número de tarjeta
              </label>
              <div className="p-3 border rounded-lg bg-gray-50">
                <CardNumberElement options={elementOptions} />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-1">
                  Vencimiento
                </label>
                <div className="p-3 border rounded-lg bg-gray-50">
                  <CardExpiryElement options={elementOptions} />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-1">CVC</label>
                <div className="p-3 border rounded-lg bg-gray-50">
                  <CardCvcElement options={elementOptions} />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!stripe || loading || state.items.length === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all"
            >
              {loading ? "Procesando..." : `Pagar $${getTotal().toFixed(2)}`}
            </button>

            {message && <p className="text-center text-lg mt-3">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutFormInner />
    </Elements>
  );
}
