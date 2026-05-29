import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import HumidityChart from "../components/HumidityChart";
import api from "../services/api";

function Dashboard() {
  const [lecturas, setLecturas] = useState([]);
  const [humedadActual, setHumedadActual] = useState(0);

  useEffect(() => {
    obtenerLecturas();

    const intervalo = setInterval(() => {
      obtenerLecturas();
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  const obtenerLecturas = async () => {
    try {
      const response = await api.get("/lecturas/");

      setLecturas(response.data);

      if (response.data.length > 0) {
        const ultima = response.data[response.data.length - 1];

        setHumedadActual(
          ultima.humedad || ultima.valor || 0
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">

        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            SmartPlant IoT
          </h1>

          <p className="text-slate-500 mt-2">
            Monitoreo inteligente de humedad y riego automático
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-6">

          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-gray-500 mb-2">
              Humedad Actual
            </h3>

            <p className="text-4xl font-bold text-green-600">
              {humedadActual}%
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-gray-500 mb-2">
              Estado
            </h3>

            <p
              className={`text-3xl font-bold ${
                humedadActual >= 40
                  ? "text-green-600"
                  : humedadActual >= 25
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {
                humedadActual >= 40
                  ? "Óptimo"
                  : humedadActual >= 25
                  ? "Aceptable"
                  : "Seco"
              }
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-gray-500 mb-2">
              MQTT
            </h3>

            <p className="text-3xl font-bold text-green-600">
              Online
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-gray-500 mb-2">
              Actualización
            </h3>

            <p className="text-3xl font-bold text-blue-600">
              5 seg
            </p>
          </div>

        </div>

        {/* Estado de planta */}
        <div className="grid grid-cols-3 gap-6 mt-8">

          <div className="col-span-2 bg-white rounded-xl p-6 shadow">

            <h2 className="text-xl font-semibold mb-6">
              Estado de la Planta
            </h2>

            <div className="flex flex-col items-center justify-center">

              <div className="text-[120px]">
                {
                  humedadActual >= 40
                    ? "🌿"
                    : humedadActual >= 25
                    ? "🪴"
                    : "🥀"
                }
              </div>

              <h3
                className={`text-5xl font-bold mt-4 ${
                  humedadActual >= 40
                    ? "text-green-600"
                    : humedadActual >= 25
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {humedadActual}%
              </h3>

              <p className="text-slate-500 mt-2">
                Humedad Actual
              </p>

            </div>

          </div>

          {/* Alertas */}
          <div className="bg-white rounded-xl p-6 shadow">

            <h2 className="text-xl font-semibold mb-6">
              Alertas
            </h2>

            <div
              className={`border-l-4 p-4 rounded ${
                humedadActual >= 40
                  ? "bg-green-100 border-green-500"
                  : humedadActual >= 25
                  ? "bg-yellow-100 border-yellow-500"
                  : "bg-red-100 border-red-500"
              }`}
            >
              <p className="font-semibold">
                {
                  humedadActual >= 40
                    ? "Planta saludable"
                    : humedadActual >= 25
                    ? "Humedad moderada"
                    : "Riego recomendado"
                }
              </p>

              <p className="text-sm text-gray-600 mt-1">
                Humedad actual: {humedadActual}%
              </p>
            </div>

          </div>

        </div>

        {/* Gráfica */}
        <div className="grid grid-cols-3 gap-6 mt-8">

          <div className="col-span-2 bg-white rounded-xl p-6 shadow h-96">

            <h2 className="text-xl font-semibold mb-6">
              Historial de Humedad
            </h2>

            <div className="h-72">
              <HumidityChart lecturas={lecturas} />
            </div>

          </div>

          {/* Estadísticas */}
          <div className="bg-white rounded-xl p-6 shadow">

            <h2 className="text-xl font-semibold mb-6">
              Registros
            </h2>

            <p className="text-5xl font-bold text-green-600">
              {lecturas.length}
            </p>

            <p className="text-gray-500 mt-2">
              Lecturas almacenadas
            </p>

          </div>

        </div>
                {/* Tabla de Lecturas */}
        <div className="bg-white rounded-xl p-6 shadow mt-8">

          <h2 className="text-xl font-semibold mb-6">
            Lecturas Recientes
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b text-left">

                  <th className="py-3">
                    Fecha
                  </th>

                  <th className="py-3">
                    Humedad
                  </th>

                  <th className="py-3">
                    Estado
                  </th>

                </tr>

              </thead>

              <tbody>

                {lecturas.length > 0 ? (

                  lecturas.map((lectura, index) => (

                    <tr
                      key={index}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="py-4">
                        {lectura.fecha}
                      </td>

                      <td className="py-4 font-semibold">
                        {lectura.humedad}%
                      </td>

                      <td className="py-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            lectura.humedad >= 40
                              ? "bg-green-100 text-green-700"
                              : lectura.humedad >= 25
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {lectura.estado}
                        </span>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="3"
                      className="py-6 text-center text-gray-500"
                    >
                      No hay lecturas disponibles
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>
    </div>
  );
}

export default Dashboard;