import React, { useState, useEffect } from "react";
import { endPoints } from "../services/api";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { clearSession, getUser } from "../helpers/local-storage";

export default function DashboardPage() {

  const navigate = useNavigate();

  // local storage para recibir usuario
  let activeUser = getUser("user");

  //para revisar que si 
  console.log(activeUser.nombre);

  //el DTO recobe estos parametros, el userID lo sacamos del localStorage

  const [gasto, setGasto] = useState({
    descripcion: "",
    valor: "",
    categoriaId: "",
    metodoPagoId: "",
    comercioId: "",
    usuarioId: activeUser.id,
  });

  // array para guasrada los gastos, categorias, comercios, metodos de pago
  const [gastos, setGastos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [comercios, setComercios] = useState([]);
  const [metodoPagos, setMetodoPagos] = useState([]);

  //PARA LISTAR GASTOS recibe un parametro id para listar al usuario activo
  function getGastos(id) {
    fetch(`${endPoints.gastosByID}/${id}`) //traemos los gastos del uasuario id
      .then((res) => res.json())
      .then((data) => {
        console.table(data); //verificar si llega la data
        setGastos(data)})
      .catch((error) => console.log("Error al cargar gastos:", error.message));
  }

  //PARA LISTAR coemrcios
  function getComercios() {
    fetch(`${endPoints.comercios}`) //traemos los gastos del uasuario id
      .then((res) => res.json())
      .then((data) => {
        console.log("comercios",data); //verificar si llega la data
        setComercios(data)})
      .catch((error) => console.log("Error al cargar gastos:", error.message));
  }

  //PARA LISTAR categorias
  function getCategorias() {
    fetch(`${endPoints.categorias}`) //traemos los gastos del uasuario id
      .then((res) => res.json())
      .then((data) => {
        console.log("categorias",data); //verificar si llega la data
        setCategorias(data)})
      .catch((error) => console.log("Error al cargar gastos:", error.message));
  }

  //PARA LISTAR metod de pago
  function getMetodoPagos() {
    fetch(`${endPoints.metodoPago}`) //traemos los gastos del uasuario id
      .then((res) => res.json())
      .then((data) => {
        console.log("metodopago",data); //verificar si llega la data
        setMetodoPagos(data)})
      .catch((error) => console.log("Error al cargar gastos:", error.message));
  }

  useEffect(() => {

    const idUser = activeUser.id;

    //revisar que si llega el id
    console.log(idUser)

    //usamos la funcion fecth que recibe id cmo parametro
    getGastos(idUser);
    getCategorias();
    getComercios();
    getMetodoPagos();
  }, []);

  // FUNCION LOGOUT
  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Volverás a la página principal",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Salir",
      cancelButtonText: "Quedarme"
    }).then((result) => {
      if (result.isConfirmed) {
        clearSession('user');
        navigate('/');
      }
    });
  };

  //ESTA FUNCION NSO CAMPURA TODOS LOS DATOS Y LOS SETTEA DIRECTAMENTE 

 const handleChange = (e) => {   
    setGasto({ ...gasto, [e.target.name]: e.target.value });
  }; //todos los datos ya quedan para usar el gasto

 //aca enviamos todo 

const handleSubmit = async (e) => {
    e.preventDefault();

    const gastoParaEnviar = {
      ...gasto,
      valor: parseFloat(gasto.valor),
      categoriaId: parseInt(gasto.categoriaId),
      metodoPagoId: parseInt(gasto.metodoPagoId),
      comercioId: parseInt(gasto.comercioId),
      usuarioId: activeUser.id,
      
    };

    try {
      const response = await fetch(endPoints.gastos, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gastoParaEnviar),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Gasto registrado!",
          text: "Tu gasto fue guardado correctamente.",
          confirmButtonColor: "#2563eb",
        });
        setGasto({ descripcion: "", valor: "", categoriaId: "", metodPagoId:"",
          comercioId:"" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo registrar el gasto.",
          confirmButtonColor: "#2563eb",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Sin conexión",
        text: "No se pudo conectar con el servidor.",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-2xl font-bold mb-6">Panel de gastos</h2>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Bienvenido, {activeUser.nombre || 'Usuario'}
        </h2>
        <span className="text-gray-500 text-sm">{activeUser.correo}</span>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
        title="Cerrar sesión"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span className="hidden sm:inline">Salir</span>
      </button>

      {/* Formulario */}
      <div className="bg-white p-6 rounded shadow-md max-w-md mb-8 mt-6">
        <h3 className="text-lg font-semibold mb-4">Registrar nuevo gasto</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Monto</label>
            <input
              type="number"
              name="valor"
              value={gasto.valor}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Concepto</label>
            <input
              type="text"
              name="descripcion"
              value={gasto.descripcion}
              onChange={handleChange}
              placeholder="Ej: café, transporte..."
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 mb-1">Categoría</label>
            <select
              name="categoriaId"
              value={gasto.categoriaId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            >
              <option value="">Selecciona una categoría</option>

             {/* esta debe tarer lo que este en categorias pordriamos traer la categorias
             de la api */}

             {categorias.map((item)=>( 
                <option key={item.id} value={item.id}>
                {item.nombre}
              </option>))}
              
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 mb-1">Comercio</label>
            <select
              name="comercioId"
              value={gasto.comercioId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            >
              <option value="">Selecciona un comercios registrado</option>

             {/* esta debe tarer lo que este en categorias pordriamos traer la categorias
             de la api */}
              {comercios.map((item)=>( 
                <option key={item.id} value={item.id}>
                {item.nombreComercio}
              </option>))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 mb-1">Metodo pago</label>
            <select
              name="metodoPagoId"
              value={gasto.metodoPagoId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            >
              <option value="">Selecciona un metod de pago</option>

             {/* esta debe tarer lo que este en categorias pordriamos traer la categorias
             de la api */}
              {metodoPagos.map((item)=>( 
                <option key={item.id} value={item.id}>
                {item.formaPago}
              </option>))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Registrar gasto
          </button>
        </form>
      </div>

      {/* Historial */}
      <div className="bg-white p-6 rounded shadow-md max-w-md">
        <h3 className="text-lg font-semibold mb-4">Historial de gastos</h3>
        {gastos.length === 0 ? (
          <p className="text-gray-400">No hay gastos registrados aún.</p>
        ) : (
          <ul>
            {gastos.map((g) => (
              <li key={g.id} className="border-b py-2 flex justify-between">
                <span>{g.descripcion}</span>
                <span>{g.categoria.nombre}</span>
                <span>{g.metodoPago.descripcion}</span>
                <span>{g.comercio.nombreComercio}</span>
                <span className="font-semibold">${g.valor}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ NUEVO — botón flotante para ir a estadísticas */}
      <button
        onClick={() => navigate("/estadisticas")}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all z-50"
        title="Ver estadísticas en gráficas"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Ver estadísticas
      </button>

    </div>
  );
}