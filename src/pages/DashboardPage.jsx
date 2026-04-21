import React, { useState, useEffect } from "react";
import { ENDPOINTS } from "../services/api";
import Swal from "sweetalert2";

export default function DashboardPage() {
  const [gasto, setGasto] = useState({
    id: "",
    userId: "",
    monto: "",
    concepto: "",
    categoria: "",
  });

  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    fetch(ENDPOINTS.gastos.listar)
      .then((res) => res.json())
      .then((data) => setGastos(data))
      .catch((error) => console.log("Error al cargar gastos:", error.message));
  }, []);

  const handleChange = (e) => {
    setGasto({ ...gasto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(ENDPOINTS.gastos.crear, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gasto),
      });
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Gasto registrado!",
          text: "Tu gasto fue guardado correctamente.",
          confirmButtonColor: "#2563eb",
        });
        setGasto({ monto: "", concepto: "", categoria: "" });
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

      <div className="bg-white p-6 rounded shadow-md max-w-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Registrar nuevo gasto</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Monto</label>
            <input
              type="number"
              name="monto"
              value={gasto.monto}
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
              name="concepto"
              value={gasto.concepto}
              onChange={handleChange}
              placeholder="Ej: café, transporte..."
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 mb-1">Categoría</label>
            <select
              name="categoria"
              value={gasto.categoria}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="alimentacion">Alimentación</option>
              <option value="transporte">Transporte</option>
              <option value="entretenimiento">Entretenimiento</option>
              <option value="salud">Salud</option>
              <option value="otros">Otros</option>
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

      <div className="bg-white p-6 rounded shadow-md max-w-md">
        <h3 className="text-lg font-semibold mb-4">Historial de gastos</h3>
        {gastos.length === 0 ? (
          <p className="text-gray-400">No hay gastos registrados aún.</p>
        ) : (
          <ul>
            {gastos.map((g, index) => (
              <li key={index} className="border-b py-2 flex justify-between">
                <span>{g.concepto}</span>
                <span className="font-semibold">${g.monto}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}