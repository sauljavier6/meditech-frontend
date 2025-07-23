
import { useState } from "react";
import Login from "../../components/auth/login/Login";
import Register from "../../components/auth/register/Register";

const SuppliersPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div>
    {/* Pasamos el término de búsqueda al componente de la lista */}
    {isRegistering ? (
    <Register onBack={() => setIsRegistering(false)} />
    ) : (
    <Login onRegister={() => setIsRegistering(true)} />
    )}
    </div>
  );
};

export default SuppliersPage;