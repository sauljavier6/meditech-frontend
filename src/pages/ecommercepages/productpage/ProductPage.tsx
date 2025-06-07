import CatalogoProducts from "../../../components/ecommercecomponents/catalogoproducts/CatalogoProducts";
import Sidebar from "../../../components/ecommercecomponents/sidebar/SideBar";


function ProductsPage() {
  return (
  <div className="flex pt-[150px] min-h-screen">
    <aside className="w-1/2 pl-10">
      <Sidebar />
    </aside>

    <div>
      <CatalogoProducts />
    </div>
  </div>
  );
}


export default ProductsPage;
