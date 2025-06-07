const LoginPage = () => {
  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form>
        <input type="email" placeholder="Correo" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
