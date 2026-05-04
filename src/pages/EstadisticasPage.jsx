import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer, Legend,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#dc2626", "#d97706", "#7c3aed", "#0891b2"];

export default function EstadisticasPage() {
  const navigate = useNavigate();
  const [statsCategorias, setStatsCategorias] = useState([]);
  const [statsMetodos,    setStatsMetodos]    = useState([]);
  const [statsMeses,      setStatsMeses]      = useState([]);
  const [totalGastado,    setTotalGastado]    = useState(0);
  const [loading,         setLoading]         = useState(true);

  useEffect(() => {

    // DATOS quemados — para probar sin Spring
    //descomento el bloque de fetch de abajo cuando este listo el back
    const categorias = [
      { name: "Alimentación",    value: 165000 },
      { name: "Transporte",      value: 107000 },
      { name: "Entretenimiento", value: 87000  },
      { name: "Salud",           value: 68000  },
      { name: "Otros",           value: 58000  },
    ];

    const metodos = [
      { name: "Tarjeta",  value: 219000 },
      { name: "Efectivo", value: 146000 },
      { name: "Nequi",    value: 121000 },
    ];

    const meses = [
      { name: "Enero",   total: 65000  },
      { name: "Febrero", total: 82000  },
      { name: "Marzo",   total: 110000 },
      { name: "Abril",   total: 95000  },
      { name: "Mayo",    total: 135000 },
    ];

    setStatsCategorias(categorias);
    setStatsMetodos(metodos);
    setStatsMeses(meses);
    setTotalGastado(categorias.reduce((acc, c) => acc + c.value, 0));
    setLoading(false);

    // ─────────────────────────────────────────────────
    // DATOS REALES — descomentar cuando Spring esté listo
    // ─────────────────────────────────────────────────
    // const cargar = async () => {
    //   try {
    //     const [gastosRes, catRes, metRes, mesRes] = await Promise.all([
    //       fetch(endPoints.gastos),
    //       fetch(endPoints.statsCategorias),
    //       fetch(endPoints.statsMetodosPago),
    //       fetch(endPoints.statsMeses),
    //     ]);
    //     const gastos = await gastosRes.json();
    //     setTotalGastado(gastos.reduce((acc, g) => acc + g.valor, 0));
    //     const cats = await catRes.json();
    //     setStatsCategorias(cats.map(c => ({ name: c.categoria, value: c.total })));
    //     const mets = await metRes.json();
    //     setStatsMetodos(mets.map(m => ({ name: m.metodoPago, value: m.total })));
    //     const meses = await mesRes.json();
    //     setStatsMeses(meses.map(m => ({ name: m.mes, total: m.total })));
    //   } catch (err) {
    //     console.error("Error cargando estadísticas:", err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // cargar();

  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Estadísticas</h2>
          <p className="text-gray-500 mt-1">Vista gráfica de tus gastos</p>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Volver al panel
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400 text-lg">Cargando estadísticas...</p>
        </div>
      ) : (
        <>
          {/* Tarjetas resumen */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-500">
              <p className="text-gray-500 text-sm">Total gastado</p>
              <p className="text-2xl font-bold text-blue-600">
                ${totalGastado.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500">
              <p className="text-gray-500 text-sm">Categorías</p>
              <p className="text-2xl font-bold text-green-600">
                {statsCategorias.length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-5 border-l-4 border-purple-500">
              <p className="text-gray-500 text-sm">Métodos de pago</p>
              <p className="text-2xl font-bold text-purple-600">
                {statsMetodos.length}
              </p>
            </div>
          </div>

          {/* Barras: gastos por mes */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Gastos por mes
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statsMeses}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(v) => [`$${v.toLocaleString()}`, "Total"]}
                />
                <Bar
                  dataKey="total"
                  name="Total"
                  fill="#2563eb"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tortas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Por categoría */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Por categoría
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={statsCategorias}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {statsCategorias.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Por método de pago */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Por método de pago
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={statsMetodos}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {statsMetodos.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>
        </>
      )}
    </div>
  );
}