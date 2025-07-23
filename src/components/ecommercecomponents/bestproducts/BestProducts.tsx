import { useEffect, useState } from "react";
import ProductCard from "../productcard/ProductCard";
import { getProducts } from "../../../api/productsApi/ProductsApi";

interface ProductProps {
  ID_Product: number;
  Description: string;
  Code: string;
  Imagen: string;
  ID_Category: number;
  Category?: {
    ID_Category: number;
    Description: string;
  };
  ID_Stock: number;
  Stock?: {
    ID_Stock: number;
    Description: string;
    Amount: number;
    Saleprice: number;
    Purchaseprice: number;
  };
}



const BestProducts = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getProducts();
        console.log('data:', data)
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);



  if (isLoading) {
    return <h2 className="text-2xl text-center p-10">Cargando las mejores ofertas...</h2>;
  }

  return (
    <div className="w-full bg-gray-100 p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Las mejores ofertas</h2>
        <p className="text-gray-600 text-center">¿Buscas calidad al mejor precio? Descubre nuestras ofertas exclusivas y ahorra en grande</p>
        <p className="text-gray-600 text-center mb-6">con nuestra amplia gama de productos</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.ID_Product} className="relative">
            <img
              src="/icons/oferta.svg"
              alt="Oferta"
              className="absolute top-0 left-0 w-16 animate-bounce z-10"
            />
            <ProductCard product={product} />
          </div>
        ))}
        </div>
    </div>

    
  );
};

export default BestProducts;