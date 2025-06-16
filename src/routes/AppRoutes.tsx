import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/layout/poslayout/AdminLayout';

import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/Dashboard';
import ProductsPage from '../pages/productpage/ProductsPage';

import ProtectedRoute from "./ProtectedRoute";
import SalesPage from '../pages/salespage/SalesPage';
import QuotesPage from '../pages/quotespage/QuotesPage';
import CustomersPage from '../pages/customerspage/CustomersPage';
import CajasPage from '../pages/cajaspage/CajasPage';
import ComprasPage from '../pages/compraspage/ComprasPage';
import SuppliersPage from '../pages/supplierspage/SuppliersPage';
import FacturasPage from '../pages/facturaspage/FacturasPage';
import HomePage from '../pages/ecommercepages/homepage/Homepage';
import EcommerceLayout from '../components/layout/ecommercelayout/EcommerceLayout';

import EProductsPage from '../pages/ecommercepages/productpage/ProductPage';
import CartPage from '../pages/ecommercepages/cartpage/CartPage';
import ProductDetails from '../pages/ecommercepages/productdetails/ProductDetails';

const AppRoutes = () => {

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<EcommerceLayout />}>
        <Route index element={<HomePage />} />
        <Route path="productos" element={<EProductsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="carrito" element={<CartPage />} /> 
        <Route path="detalles/:id" element={<ProductDetails />} /> 
      </Route>


      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/pos" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="productos" element={<ProductsPage />} />
          <Route path="ventas" element={<SalesPage />} />
          <Route path="cotizaciones" element={<QuotesPage />} />
          <Route path="clientes" element={<CustomersPage />} />
          <Route path="cajas" element={<CajasPage />} />
          <Route path="compras" element={<ComprasPage />} />
          <Route path="proveedores" element={<SuppliersPage />} />
          <Route path="facturas" element={<FacturasPage />} />
        </Route>
      </Route>

      {/* Redirección */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;
