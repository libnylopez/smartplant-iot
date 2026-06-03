import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Historial() {

  const [lecturas, setLecturas] = useState([]);

  useEffect(() => {

    obtenerLecturas();

  }, []);

  const obtenerLecturas = async () => {

    try {

      const response = await api.get("/lecturas");

      setLecturas(response.data);

    } catch (error) {

      console.error("Error obteniendo lecturas:", error);

    }

  };

  return (

    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1 p-8">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-slate-800">
            Historial de Lecturas
          </h1>

          <p className="text-slate-500 mt-2">
            Registro histórico de humedad del sistema SmartPlant IoT
          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex justify-between items-center mb-6">

            <input
              type="text"
              placeholder="Buscar..."
              className="border rounded-lg px-4 py-2 w-72"
            />

            <button
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
            >
              Exportar CSV
            </button>

          </div>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-4">
                  ID
                </th>

                <th className="text-left py-4">
                  Humedad
                </th>

                <th className="text-left py-4">
                  Estado
                </th>

                <th className="text-left py-4">
                  Fecha
                </th>

              </tr>

            </thead>

            <tbody>

              {lecturas.map((lectura) => (

                <tr
                  key={lectura.id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="py-4">
                    {lectura.id}
                  </td>

                  <td className="py-4 font-semibold">
                    {lectura.humedad_porcentaje}%
                  </td>

                  <td className="py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        lectura.humedad_porcentaje >= 40
                          ? "bg-green-100 text-green-700"
                          : lectura.humedad_porcentaje >= 25
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {lectura.estado_sensor}
                    </span>

                  </td>

                  <td className="py-4">
                    {lectura.fecha_registro || "Sin fecha"}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>

    </div>

  );
}

export default Historial;