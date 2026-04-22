//servidor levantado en otra temrinal dento de la app-ant-track

const URL_BASE = "http://localhost:3001/";

export let endPoints = {

  users: URL_BASE + "users/",
  gastos: URL_BASE + "gastos/",

  

  /*
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
  },*/
};