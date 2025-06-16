  import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
  import { useCart } from "../../../context/CartContext";
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

interface Product {
  ID_Product: string;
  Descripcion: string;
  Categoria: Categoria;
  Codigo: string;
  Stock: Stock[];
  Imagen: string;
}

  export default function Page() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedSize, setSelectedSize] = useState<Stock | null>(null);
    const [mainImage, setMainImage] = useState<string>("");
    const { addToCart, getProductQuantity } = useCart();
    const quantity = product && selectedSize
  ? getProductQuantity(product.ID_Product)
  : 0;
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (!id) return;

      fetch(`/api/products/productdetails/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          if (data.image) {
            setMainImage(data.image);
          }
        })
        .catch((error) => console.error("Error al obtener producto:", error));
    }, [id]);

    const handleAddToCart = () => {
      if (product && selectedSize) {
        addToCart(
          product);
      }
    };

    if (!product) {
      return <p className="text-center mt-10">Loading products...</p>;
    }

    if (!isClient) return null;

    const outOfStock = !selectedSize;

    return (
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Galería de Imágenes */}
          <div className="flex flex-col">
            <img
              src={mainImage}
              alt={product.Descripcion}
              width={600}
              height={600}
              className="rounded-lg w-full object-cover border"
            />

            {/* Miniaturas */}
            <div className="flex gap-4 mt-4">
              {[product.Imagen, product.Imagen].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Miniatura ${index}`}
                  width={100}
                  height={100}
                  className={`rounded-lg border cursor-pointer hover:opacity-80 ${
                    img === mainImage ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Info del producto */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.Descripcion}</h1>
              
              <div className="mt-4">
                <p className="text-gray-600 mb-2">{"Products.selectSize"}</p>
                <div className="flex flex-wrap gap-2">
                  {product.Stock.map((item) => (
                    <button
                      key={item.Descripcion}
                      onClick={() => setSelectedSize(item)}
                      className={`flex items-center gap-2 px-4 py-2 rounded border transition ${
                        selectedSize?.Descripcion === item.Descripcion
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                      } ${item.Cantidad === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={item.Cantidad === 0}
                    >
                      {/* Texto con talla y Cantidad */}
                      {item.Descripcion} ({item.Cantidad})
                    </button>
                  ))}
                </div>
              </div>

              {quantity > 0 && (
                <p className="text-sm text-blue-500 mt-2">
                  {"Products.inCart"}: {quantity}
                </p>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className={`mt-6 px-6 py-3 rounded-lg transition w-fit ${
                outOfStock
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              disabled={outOfStock}
            >
              {outOfStock ? "outOfStock" : "addToCart"} 🛒
            </button>
          </div>
        </div>
      </div>
    );
  }
