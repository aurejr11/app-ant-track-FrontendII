//servidor levantado en otra temrinal dento de la app-ant-track

const URL_BASE = "http://18.188.98.240:8080/anttrackapi/v1";

export let endPoints = {

  users: URL_BASE + "/usuarios",
  gastos: URL_BASE + "/gastos",
  gastosByID: URL_BASE + "/gastos/usuarios",
  comercios: URL_BASE + "/comercios",
  categorias: URL_BASE + "/categorias",
  metodoPago: URL_BASE + "/metodopagos",
  

 
  auth: {
    login: URL_BASE +"/auth/login",
    register: URL_BASE +"/auth/register",
  },
   /*
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