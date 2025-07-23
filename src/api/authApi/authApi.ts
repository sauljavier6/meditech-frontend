interface User {  
    name: string;
    email: string;
    password: string;
    imagen: File | null;
}

type LoginCredentials = Pick<User, 'email' | 'password'>;

export const loginUser = async (data:LoginCredentials) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al iniciar sesión');
  return await res.json();
};

export const registerUser = async (userData: User) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error('Error al registrar usuario');
  return await res.json();
};
