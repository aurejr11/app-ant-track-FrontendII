import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { endPoints } from "../services/api";
import Swal from "sweetalert2";

export default function UsuariosA() {
  const navigate = useNavigate();

  // --- ESTADOS ---
  const [usuarios, setUsuarios] = useState([]); 
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({

      nombre: "", 
      tipoDocumento: "",
      documento: "",
      edad: "",
      genero: "",
      correo: "",
   
      telefono: "",
      direccion: "",
      presupMensual: "",
  });

  // --- EFECTOS ---
  useEffect(() => {
    getUsuarios();
  }, []);

  // --- FUNCIONES LÓGICAS ---

  function getUsuarios() {
    fetch(endPoints.users)
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error("Error al cargar usuarios:", err));
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const limpiarForm = () => {
    setEditando(null);
    setForm({ nombre: "", tipoDocumento: "", documento: "", edad: "", genero: "", correo: "", telefono: "", direccion: "", presupMensual: ""  });
  };

  const cargarEdicion = (user) => {
    setEditando(user);
    setForm({
      nombre: user.nombre,
      tipoDocumento: user.tipoDocumento,
      documento: user.documento,
      edad: user.edad,
      genero: user.genero,
      correo: user.correo,
   
      telefono: user.telefono,
      direccion: user.direccion,
      presupMensual: user.presupMensual,
    });
  };

  // --- HANDLERS (POST, PUT, DELETE) ---

  async function handleCrear(e) {
    e.preventDefault();
    const nueva = {
      ...form,
      presupMensual: parseFloat(form.presupMensual),
    };

    try {
      const res = await fetch(endPoints.usuarios, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nueva),
      });

      if (res.ok) {
        Swal.fire({ icon: "success", title: "Usuario creado" });
        limpiarForm();
        getUsuarios();
      }
    } catch {
      Swal.fire({ icon: "error", title: "Error de conexión" });
    }
  }

  async function handleEditar(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${endPoints.usuarios}/${editando.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          presupMensual: parseFloat(form.presupMensual),
        }),
      });

      if (res.ok) {
        Swal.fire({ icon: "success", title: "Usuario actualizado" });
        limpiarForm();
        getUsuarios();
      }
    } catch {
      Swal.fire({ icon: "error", title: "Error al editar" });
    }
  }

  function toggleEstado(id, accion) {
    const titulo = accion === "activar" ? "¿Activar usuario?" : "¿Desactivar usuario?";
    
    Swal.fire({
      title: titulo,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: accion.charAt(0).toUpperCase() + accion.slice(1),
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`${endPoints.usuarios}/${id}/${accion}`, {
          method: "PUT",
        });
        if (res.ok) {
          Swal.fire("Listo", `Usuario ${accion}ado`, "success");
          getUsuarios();
        }
      }
    });
  }

  // --- RENDERIZADO ---
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
          <button onClick={() => navigate("/admin")} className="border px-4 py-2 rounded-lg">
            ← Volver
          </button>
        </div>

        {/* Formulario */}
        <div className="bg-white p-6 rounded shadow-md mb-8">
          <h3 className="font-semibold mb-4">{editando ? "Editar Usuario" : "Nuevo Usuario"}</h3>
          <form onSubmit={editando ? handleEditar : handleCrear} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="border p-2 rounded" required />
             <input name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange} placeholder="tipoDocumento" className="border p-2 rounded" required /> 
             <input name="documento" type="number" value={form.documento} onChange={handleChange} placeholder="Documento" className="border p-2 rounded" required />
              <input name="edad" type="number" value={form.edad} onChange={handleChange} placeholder="Edad" className="border p-2 rounded" required />
               <input name="genero" value={form.genero} onChange={handleChange} placeholder="Genero" className="border p-2 rounded" required /> 
               <input name="correo" value={form.correo} onChange={handleChange} placeholder="Correo" className="border p-2 rounded" required />
              
                <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Direccion" className="border p-2 rounded" required />
                <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Telefono" className="border p-2 rounded" />
                <input name="presupMensual" type="number" value={form.presupMensual} onChange={handleChange} placeholder="PresupMensual" className="border p-2 rounded" required />
            
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                {editando ? "Actualizar" : "Crear"}
              </button>
              {editando && <button type="button" onClick={limpiarForm} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>}
            </div>
          </form>
        </div>

        {/* Tabla */}
        <div className="bg-white p-6 rounded shadow-md overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Nombre</th>
                <th className="p-2">Presupuesto</th>
                <th className="p-2">Estado</th>
                <th className="p-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id} className="border-b">
                  <td className="p-2">{u.nombre}</td>
                  <td className="p-2">${u.presupMensual}</td>
                  <td className="p-2">{u.estado}</td>
                  <td className="p-2 text-center flex justify-center gap-2">
                    <button onClick={() => cargarEdicion(u)} className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">Editar</button>
                    <button 
                      onClick={() => toggleEstado(u.id, u.estado === "ACTIVO" ? "desactivar" : "activar")}
                      className={`${u.estado === "ACTIVO" ? "bg-red-500" : "bg-green-500"} text-white px-2 py-1 rounded text-xs`}
                    >
                      {u.estado === "ACTIVO" ? "Desactivar" : "Activar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

