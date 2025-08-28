export const payment = async (datos: unknown) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/stripe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ datos }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al crear pago");
  }

  return data;
};
