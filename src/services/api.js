const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const ENDPOINTS = {
  auth: {
    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/auth/register`,
  },
  gastos: {
    listar: `${BASE_URL}/gastos`,
    crear: `${BASE_URL}/gastos`,
    eliminar: (id) => `${BASE_URL}/gastos/${id}`,
  },
  categorias: {
    listar: `${BASE_URL}/categorias`,
  },
  comercios: {
    listar: `${BASE_URL}/comercios`,
  },
  mediosPago: {
    listar: `${BASE_URL}/medios-pago`,
  },
};