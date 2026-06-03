import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Riegos() {

  const [riegos, setRiegos] = useState([]);

  useEffect(() => {

    obtenerRiegos();

  }, []);

  const obtenerRiegos = async () => {

    try {

      const response = await api.get("/riegos");

      setRiegos(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1 p-8">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-slate-800">
            Sistema de Riego
          </h1>

          <p className="text-slate-500 mt-2">
            Gestión y monitoreo del riego automático
          </p>

        </div>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-gray-500">
              Estado
            </h3>

            <p className="text-4xl font-bold text-green-600 mt-4">
              ACTIVO
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-gray-500">
              Último Riego
            </h3>

            <p className="text-4xl font-bold text-blue-600 mt-4">
              {riegos.length > 0
                ? `${riegos[0].duracion_segundos} seg`
                : "--"}
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-gray-500">
              Total Activaciones
            </h3>

            <p className="text-4xl font-bold text-green-600 mt-4">
              {riegos.length}
            </p>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-8 mt-8">

          <h2 className="text-2xl font-semibold mb-6">
            Control Manual
          </h2>

          <button
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold"
          >
            🚿 Activar Riego
          </button>

        </div>

        <div className="bg-white rounded-xl shadow p-6 mt-8">

          <h2 className="text-2xl font-semibold mb-6">
            Historial de Activaciones
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Fecha Inicio
                </th>

                <th className="text-left py-3">
                  Fecha Fin
                </th>

                <th className="text-left py-3">
                  Duración
                </th>

                <th className="text-left py-3">
                  Estado
                </th>

              </tr>

            </thead>

            <tbody>

              {riegos.map((riego) => (

                <tr
                  key={riego.id}
                  className="border-b"
                >

                  <td className="py-4">
                    {riego.fecha_inicio}
                  </td>

                  <td className="py-4">
                    {riego.fecha_fin}
                  </td>

                  <td className="py-4">
                    {riego.duracion_segundos} seg
                  </td>

                  <td className="py-4">
                    {riego.estado}
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

export default Riegos;