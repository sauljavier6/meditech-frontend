// src/context/CartContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

// Tipos
interface Categoria {
  ID_Categoria: number;
  Descripcion: string;
}

interface Stock {
  ID_Stock: number;
  Descripcion: string;
  Cantidad: number;
  PrecioVenta: number;
  PrecioCompra: number;
}

interface CartItem {
  ID_Product: string;
  Descripcion: string;
  Categoria: Categoria;
  Codigo: string;
  Stock: Stock;
  Imagen: string;
}

interface CartContextProps {
  cart: CartItem[];


  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getProductQuantity: (id: string) => number;
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
}

// Creamos el contexto
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Proveedor
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");

  // Cargar desde localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedAddress = localStorage.getItem("deliveryAddress");

    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedAddress) setDeliveryAddress(storedAddress);
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("deliveryAddress", deliveryAddress);
  }, [deliveryAddress]);


  // Funciones
  const addToCart = (product: CartItem) => {
    setCart((prev) => {
      return [...prev, { ...product, Cantidad: 1 }];
    });
  };





  const removeFromCart = (ID_Product: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.ID_Product === ID_Product
            ? item.Stock.Cantidad > 1
              ? { ...item, Cantidad: item.Stock.Cantidad - 1 }
              : null
            : item
        )
        .filter((item): item is CartItem => item !== null)
    );
  };




  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };




  const getProductQuantity = (ID_Product: string) => {
    const item = cart.find(
      (item) => item.ID_Product === ID_Product
    );
    return item ? item.Stock.Cantidad : 0;
  };



  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getProductQuantity,
        deliveryAddress,
        setDeliveryAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};



// Hook para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};
