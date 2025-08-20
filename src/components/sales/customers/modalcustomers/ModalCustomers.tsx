import { useEffect, useState } from "react";
import styles from "./ModalCustomers.module.scss";
import { getCustomerByID_User, getCustomerSale } from "../../../../api/Post/clientesApi/ClientesApi";

interface CustomerFormData {
  ID_User?: number | undefined;
  Name: string;
  Phone: string;
  Email: string;
  RazonSocial?: string;
  CodigoPostal?: string;
  Rfc?: string;
  RegimenFiscal?: string;
}

interface ModalCustomersProps {
  onClose: () => void;
  onSave: (data: CustomerFormData) => void;
  onEdit?: number;
}

const ModalCustomers = ({ onClose, onSave, onEdit }: ModalCustomersProps) => {
  const [activeTab, setActiveTab] = useState<"personal" | "facturacion">("personal");
  const [user, setUser] = useState<CustomerFormData>({
    ID_User: undefined,
    Name: "",
    Phone: "",
    Email: "",
    RazonSocial: "",
    CodigoPostal: "",
    Rfc: "",
    RegimenFiscal: ""
  });

  useEffect(() => {
    const fetchCustomer = async (id: number) => {
      try {
        const customerData = await getCustomerByID_User(id);
        console.log("customerData", customerData);
          setUser((prev) => ({
            ...prev,
            ID_User: customerData.data.ID_User,
            Name: customerData.data.Name || "",
            Phone: customerData.data.Phone?.Description || "",
            Email: customerData.data.Email?.Description || "",
            RazonSocial: customerData.data.Facturacion?.RazonSocial || "",
            CodigoPostal: customerData.data.Facturacion?.CodigoPostal || "",
            Rfc: customerData.data.Facturacion?.Rfc || "",
            RegimenFiscal: customerData.data.Facturacion?.RegimenFiscal || "",
          }));
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };

    if (onEdit !== undefined) {
      fetchCustomer(onEdit);
    }
  }, [onEdit]);


  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const email = user?.Email?.trim();

        if (!email) {
          resetUser(email);
          return;
        }

        const customerData = await getCustomerSale(email);
        const data = customerData?.data;

        if (data) {
          setUser(prev => ({
            ...prev,
            ID_User: data.ID_User,
            Name: data.Name || "",
            Phone: data.Phone?.Description || "",
            Email: data.Email?.Description || email,
            RazonSocial: data.Facturacion?.RazonSocial || "",
            CodigoPostal: data.Facturacion?.CodigoPostal || "",
            Rfc: data.Facturacion?.Rfc || "",
            RegimenFiscal: data.Facturacion?.RegimenFiscal || "",
          }));
        } else {
          resetUser(email);
        }

      } catch (error) {
        console.error("Error fetching customer data:", error);
        resetUser(user?.Email?.trim());
      }
    };

    const resetUser = (email = "") => {
      setUser(prev => ({
        ...prev,
        ID_User: undefined,
        Name: "",
        Phone: "",
        Email: email,
        RazonSocial: "",
        CodigoPostal: "",
        Rfc: "",
        RegimenFiscal: ""
      }));
    };

    fetchCustomer();
  }, [user?.Email]);




  const isPersonalDataComplete = user.Name.trim() !== "" && user.Phone.trim() !== "" && user.Email.trim() !== "";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Crear Cliente</h2>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
            <img src="/icons/close.png" alt="Cerrar" className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs (Switch) */}
        <div className="flex justify-center gap-0 mb-6 bg-gray-200 p-0 rounded-[50px]">
          <button
            type="button"
            onClick={() => setActiveTab("personal")}
            className={`px-4 py-2 rounded ${
              activeTab === "personal"
                ? styles.tabActive
                : styles.tabinActive
            }`}
          >
            Datos personales
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("facturacion")}
            className={`px-4 py-2 rounded ${
              activeTab === "facturacion"
                ? styles.tabActive
                : styles.tabinActive
            }`}
          >
            Datos de facturación
          </button>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSave(user);
          onClose();
        }}>

          {activeTab === "personal" && (
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Correo
                </label>
                <input
                  id="Email"
                  type="email"
                  value={user.Email}
                  onChange={(event) => setUser(prev => ({ ...prev, Email: event.target.value }))}
                  placeholder="Correo"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Nombre del cliente
                </label>
                <input
                  id="Name"
                  type="text"
                  value={user.Name}
                  onChange={(event) =>
                    setUser((prev) => ({ ...prev, Name: event.target.value }))
                  }
                  placeholder="Nombre del cliente"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  id="Phone"
                  type="tel"
                  value={user.Phone}
                  onChange={(event) => {
                    const soloNumeros = event.target.value.replace(/\D/g, '');
                    if (soloNumeros.length <= 10) {
                      setUser((prev) => ({ ...prev, Phone: soloNumeros }));
                    }
                  }}
                  placeholder="Teléfono"
                  required
                  minLength={10}
                  maxLength={10}
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  title="Debe contener exactamente 10 dígitos numéricos"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          )}

          {activeTab === "facturacion" && (
            <div className="grid grid-cols-1 gap-4">
               <div>
                <label htmlFor="rfcCliente" className="block mb-1 text-sm font-medium text-gray-700">
                  Razon social
                </label>
                <input
                  id="razonsocialCliente"
                  type="text"
                  value={user.RazonSocial}
                  onChange={(event) => setUser(prev => ({ ...prev,RazonSocial: event.target.value }))}
                  placeholder="Razon social"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="rfcCliente" className="block mb-1 text-sm font-medium text-gray-700">
                  Codigo postal
                </label>
                <input
                  id="codigopostalCliente"
                  type="text"
                  value={user.CodigoPostal}
                  onChange={(event) => setUser(prev => ({ ...prev, CodigoPostal: event.target.value }))}
                  placeholder="Codigo postal"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div> 
              <div>
                <label htmlFor="rfcCliente" className="block mb-1 text-sm font-medium text-gray-700">
                  RFC
                </label>
                <input
                  id="rfcCliente"
                  type="text"
                  value={user.Rfc}
                  onChange={(event) => setUser(prev => ({ ...prev, Rfc: event.target.value }))}
                  placeholder="RFC"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="regimenFiscal" className="block mb-1 text-sm font-medium text-gray-700">
                  Régimen fiscal
                </label>
                <select
                  id="cfdi"
                  value={user?.RegimenFiscal || ""}
                  onChange={(e) => setUser((prev) => ({ ...prev, RegimenFiscal: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Selecciona uso del CFDI</option>
                  <option value="G01">G01 - Adquisición de mercancías</option>
                  <option value="G02">G02 - Devoluciones, descuentos o bonificaciones</option>
                  <option value="G03">G03 - Gastos en general</option>
                  <option value="I01">I01 - Construcciones</option>
                  <option value="I02">I02 - Mobiliario y equipo de oficina por inversiones</option>
                  <option value="I03">I03 - Equipo de transporte</option>
                  <option value="I04">I04 - Equipo de cómputo y accesorios</option>
                  <option value="I05">I05 - Dados, troqueles, moldes, matrices y herramental</option>
                  <option value="I06">I06 - Comunicaciones telefónicas</option>
                  <option value="I07">I07 - Comunicaciones satelitales</option>
                  <option value="I08">I08 - Otra maquinaria y equipo</option>
                  <option value="D01">D01 - Honorarios médicos, dentales y gastos hospitalarios</option>
                  <option value="D02">D02 - Gastos médicos por incapacidad o discapacidad</option>
                  <option value="D03">D03 - Gastos funerales</option>
                  <option value="D04">D04 - Donativos</option>
                  <option value="D05">D05 - Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación)</option>
                  <option value="D06">D06 - Aportaciones voluntarias al SAR</option>
                  <option value="D07">D07 - Primas por seguros de gastos médicos</option>
                  <option value="D08">D08 - Gastos de transportación escolar obligatoria</option>
                  <option value="D09">D09 - Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones</option>
                  <option value="D10">D10 - Pagos por servicios educativos (colegiaturas)</option>
                  <option value="P01">P01 - Por definir</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className={`${styles.submitButton} ${!isPersonalDataComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!isPersonalDataComplete}
            >
              Guardar cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCustomers;
