import { Outlet } from "react-router-dom";
import styles from "./EcomerceLayout.module.scss"; // Assuming you have some styles defined

const EcommerceLayout = () => {

  return (
    <div>     
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-2 lg:px-5 lg:pl-3 bg-blue-800">
          <div className="flex items-center justify-between px-4">
            <ul className="flex gap-x-4" role="none">
              <li>
                <a href="#" className={styles.menuitem} role="menuitem">Nosotros</a>
              </li>
              <li>
                <a href="#" className={styles.menuitem} role="menuitem">Facturación</a>
              </li>
            </ul>
            <ul className="flex" role="none">
              <li>
                <a href="#" className={styles.menuitem} role="menuitem"><img src="/public/icons/llamar.png" alt="telefono" className="w-[25px] h-auto filter invert" /></a>
              </li>
              <li>
                <a href="#" className={styles.menuitem} role="menuitem"><img src="/public/icons/facebook.png" alt="facebook" className="w-[25px] h-auto filter invert" /></a>
              </li>
              <li>
                <a href="#" className={styles.menuitem} role="menuitem"><img src="/public/icons/instagram.png" alt="instagram" className="w-[25px] h-auto filter invert" /></a>
              </li>
              <li>
                <a href="#" className={styles.menuitem} role="menuitem"><img src="/public/icons/whatsapp.png" alt="whatsapp" className="w-[25px] h-auto filter invert" /></a>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-3 py-2 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between px-15">
            <div className="flex items-center justify-start rtl:justify-end">
              <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                  <span className="sr-only">Open sidebar</span>
                  <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                  </svg>
              </button>
                <a href="/">
                  <img
                    src="/medicare.png"
                    alt="Logo Medicare"
                    className="h-12 me-3 rounded-3xl"
                  />
                </a>
            </div>
            <div className="flex items-center">
              <ul className="flex gap-6 text-blue-800 text-lg font-medium">
                <li className="hover:text-gray-500 transition-colors cursor-pointer">
                  <a href="/productos" className={styles.linkreset}>Servicios</a>
                </li>
                <li className="hover:text-gray-500 transition-colors cursor-pointer">
                  <a href="/productos" className={styles.linkreset}>Productos</a>
                </li>
                <li className="hover:text-gray-500 transition-colors cursor-pointer">Ofertas</li>
                <li className="hover:text-gray-500 transition-colors cursor-pointer">Cotizaciones</li>
              </ul>
            </div>


            <div className="flex items-center">
                <div className="flex items-center ms-3">
                  <a href="/productos" className={styles.linkreset}><img src="/public/icons/lupa.png" alt="lupa" className="w-6 h-6"/></a>
                </div>
                <div className="flex items-center ms-3">
                  <a href="/carrito" className={styles.linkreset}><img src="/public/icons/carrito-de-compras.png" alt="carrito" className="w-6 h-6"/></a>
                  
                </div>
                <div className="flex items-center ms-3">
                  <div>
                    <button type="button" className={`flex text-sm ${styles.linkreset}`} aria-expanded="false" data-dropdown-toggle="dropdown-user">
                      <span className="sr-only">Open user menu</span>
                      <img className="w-7 h-7 rounded-full mt-2" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"/>
                    </button>
                  </div>
                  <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                    <div className="px-4 py-3" role="none">
                      <p className="text-sm text-gray-900 dark:text-white" role="none">
                        Neil Sims
                      </p>
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                        neil.sims@flowbite.com
                      </p>
                    </div>
                    <ul className="py-1" role="none">
                      <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>


          </div>
        </div>
      </nav>
      <Outlet />
      <footer className="bg-blue-800 text-white">
        <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">

          <div className="flex-1 text-center">
            <img
              src="/medicare.png"
              alt="logo"
              className="w-44 h-20 rounded-[40px] mx-auto mb-4"
            />
            <p className="text-sm text-justify max-w-md mx-auto">
              Medicare es una empresa especializada en la comercialización de productos y servicios orientados al cuidado integral de la salud, comprometida con el bienestar y la calidad de vida de sus clientes.
            </p>
          </div>


          <div className="flex gap-4">
            <div>
            <h3 className="text-lg font-semibold mb-4">Nuestra Ubicación</h3>
            <div className="text-sm space-y-2">
              <p>
                <span className="font-semibold">Dirección:</span> Torre Reforma, Paseo de la Reforma 483, Cuauhtémoc, 06500 Ciudad de México, CDMX, México
              </p>
              <p>
                <span className="font-semibold">Teléfono:</span> +52 55 1234 5678
              </p>
              <p>
                <span className="font-semibold">Correo electrónico:</span> <a href="mailto:contacto@medicare.mx" className="underline hover:text-blue-300">contacto@medicare.mx</a>
              </p>
            </div>
            </div>
            <div className="w-full h-44 rounded-lg overflow-hidden shadow-md">
              <iframe
                title="Mapa de ubicación"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.451355688957!2d-99.16318468468205!3d19.39299378689979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff49c4b3f7b7%3A0xdea44d2e56f11398!2sTorre%20Reforma!5e0!3m2!1ses!2smx!4v1615580387286!5m2!1ses!2smx"
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                className="border-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="bg-blue-900 text-center py-4 text-sm">
          <p>&copy; 2025 Medicare. Todos los derechos reservados.</p>
          <p>Powered by <span className="font-semibold">SWS Souls Web Solutions</span>.</p>
        </div>
      </footer>

    </div>
  );
};

export default EcommerceLayout;