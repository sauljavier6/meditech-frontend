import { useCart } from "../../../context/CartContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressForm from "../addressform/AddressForm";
import UserForm from "../userform/UserForm";

export default function ShoppingCart() {
  const { cart, removeFromCart, clearCart, setDeliveryAddress, setUser } = useCart();
  const navigate = useNavigate();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleCheckout = (newAddress:any) => {
    if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zip || !newAddress.country) {
      alert("Direccion incompletas");
      return;
    }
    setDeliveryAddress(newAddress);
    setDisabledSubmit(false);
  };

  const submit = () => {
    navigate("/checkout");
  };

  return (
    <div className="p-4 sm:p-6 w-full max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-6 text-center">🛒 Carrito de compras</h1>

    {cart.length === 0 ? (
      <p className="text-gray-500 text-center">Carrito vacío</p>
    ) : (
      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row sm:items-center bg-white shadow-md p-4 rounded-lg gap-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg mx-auto sm:mx-0"
            />
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">Precio: ${item.price}</p>
              <p className="text-gray-600">Tamaño: #{item.size}</p>
              <div className="flex items-center gap-2 text-gray-600">
                Color:{" "}
                <span
                  className="w-5 h-5 rounded-full border border-gray-300"
                  style={{ backgroundColor: item.color }}
                  title={item.color}
                ></span>
              </div>
              <p className="text-gray-700 font-medium mt-1">
                Cantidad: {item.quantity}
              </p>
            </div>
            <button
              className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition self-start sm:self-auto"
              onClick={() => removeFromCart(item._id, item.size, item.color)}
            >
              ❌ Eliminar
            </button>
          </div>
        ))}

        <UserForm setUser={setUser} />

        {!showAddressForm ? (
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition w-full"
            onClick={() => setShowAddressForm(true)}
          >
            📍 Continuar
          </button>
        ) : (
          <div className="bg-gray-100 p-6 rounded-lg mt-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">📦 Dirección de envío</h3>

            <AddressForm onSubmit={handleCheckout} />

            <div className="flex flex-col sm:flex-row sm:justify-between mt-6 gap-4">
              <button
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition w-full sm:w-auto"
                onClick={submit}
                disabled={disabledSubmit}
              >
                🛍 Checkout
              </button>
              <button
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition w-full sm:w-auto"
                onClick={() => setShowAddressForm(false)}
              >
                🔙 Volver al carrito
              </button>
            </div>
          </div>
        )}

        <button
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition w-full"
          onClick={clearCart}
        >
          🗑 Vaciar carrito
        </button>
      </div>
    )}
  </div>
  );
}
