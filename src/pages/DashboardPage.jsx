import React, { useState } from "react";

export default function DashboardPage() {
  const [gasto, setGasto] = useState({
    monto: "",
    concepto: "",
    categoria: "",
  });

  const handleChange = (e) => {
    setGasto({ ...gasto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nuevo gasto:", gasto);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h2 className="text-2xl font-bold mb-6">Panel de gastos</h2>
      <div className="bg-white p-6 rounded shadow-md max-w-md">
        <img src="/antt.png"alt="AntTrack logo" className="w-20 mx-auto mb-4 invert"/>
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
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
          >
            Registrar gasto
          </button>
        </form>
      </div>
    </div>
  );
}