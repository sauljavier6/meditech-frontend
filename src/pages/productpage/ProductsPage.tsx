
import { useState } from "react";
import ProductsList from "../../components/products/productlist/ProductsList";
import styles from "./ProductsPage.module.scss";
import ModalProduct from "../../components/products/modalproduct/ModalProduct";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateProduct = () => {
    setModalOpen(true);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h1 className={styles.title}>Productos</h1>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-3 py-2 border border-gray-300 rounded-md w-full sm:w-64"
          />

          <button
            onClick={handleCreateProduct}
            className={styles.buttonCrearProducto}
          >
            Crear producto
          </button>

          <button
            onClick={handleCreateProduct}
            className={styles.buttonEditarProducto}
          >
            Editar
          </button>

          <button
            onClick={handleCreateProduct}
            className={styles.buttonEliminarProducto}
          >
            Eliminar
          </button>
        </div>
      </div>

      <ProductsList/>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <ModalProduct onClose={() => setModalOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
