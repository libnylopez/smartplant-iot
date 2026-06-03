import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Alertas() {

  const [alertas, setAlertas] = useState([]);

  useEffect(() => {

    cargarAlertas();

  }, []);

  const cargarAlertas = async () => {

    try {

      const response = await api.get("/lecturas");

      const datos = response.data;

      const alertasGeneradas = datos.map((lectura) => {

        let tipo = "Información";
        let mensaje = "Nivel de humedad óptimo";

        if (lectura.humedad_porcentaje < 25) {

          tipo = "Crítica";
          mensaje = "Humedad muy baja detectada";

        } else if (lectura.humedad_porcentaje < 40) {

          tipo = "Advertencia";
          mensaje = "Nivel de humedad por debajo del óptimo";

        }

        return {
          tipo,
          mensaje,
          fecha: lectura.fecha_registro,
          humedad: lectura.humedad_porcentaje,
        };

      });

      setAlertas(alertasGeneradas);

    } catch (error) {

      console.error(error);

    }

  };

  const criticas = alertas.filter(
    (a) => a.tipo === "Crítica"
  ).length;

  const advertencias = alertas.filter(
    (a) => a.tipo === "Advertencia"
  ).length;

  const informativas = alertas.filter(
    (a) => a.tipo === "Información"
  ).length;

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1 p-8">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-slate-800">
            Centro de Alertas
          </h1>

          <p className="text-slate-500 mt-2">
            Eventos y notificaciones del sistema SmartPlant IoT
          </p>

        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">

          <div className="bg-red-100 border-l-4 border-red-500 p-6 rounded-xl">

            <h3 className="font-semibold text-red-700">
              Alertas Críticas
            </h3>

            <p className="text-4xl font-bold text-red-600 mt-2">
              {criticas}
            </p>

          </div>

          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-xl">

            <h3 className="font-semibold text-yellow-700">
              Advertencias
            </h3>

            <p className="text-4xl font-bold text-yellow-600 mt-2">
              {advertencias}
            </p>

          </div>

          <div className="bg-green-100 border-l-4 border-green-500 p-6 rounded-xl">

            <h3 className="font-semibold text-green-700">
              Eventos del Sistema
            </h3>

            <p className="text-4xl font-bold text-green-600 mt-2">
              {informativas}
            </p>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Historial de Alertas
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-4">
                  Tipo
                </th>

                <th className="text-left py-4">
                  Evento
                </th>

                <th className="text-left py-4">
                  Humedad
                </th>

                <th className="text-left py-4">
                  Fecha
                </th>

              </tr>

            </thead>

            <tbody>

              {alertas.map((alerta, index) => (

                <tr
                  key={index}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        alerta.tipo === "Crítica"
                          ? "bg-red-100 text-red-700"
                          : alerta.tipo === "Advertencia"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {alerta.tipo}
                    </span>

                  </td>

                  <td className="py-4">
                    {alerta.mensaje}
                  </td>

                  <td className="py-4">
                    {alerta.humedad}%
                  </td>

                  <td className="py-4">
                    {alerta.fecha}
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

export default Alertas;