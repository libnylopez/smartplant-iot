import Sidebar from "../components/Sidebar";

function Historial() {

  const datosDemo = [
    {
      fecha: "2026-05-25",
      humedad: 42,
      estado: "Óptimo",
    },
    {
      fecha: "2026-05-26",
      humedad: 38,
      estado: "Óptimo",
    },
    {
      fecha: "2026-05-27",
      humedad: 31,
      estado: "Aceptable",
    },
    {
      fecha: "2026-05-28",
      humedad: 24,
      estado: "Seco",
    },
    {
      fecha: "2026-05-29",
      humedad: 47,
      estado: "Óptimo",
    },
  ];

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
                  Fecha
                </th>

                <th className="text-left py-4">
                  Humedad
                </th>

                <th className="text-left py-4">
                  Estado
                </th>

              </tr>

            </thead>

            <tbody>

              {datosDemo.map((item, index) => (

                <tr
                  key={index}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="py-4">
                    {item.fecha}
                  </td>

                  <td className="py-4 font-semibold">
                    {item.humedad}%
                  </td>

                  <td className="py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.humedad >= 40
                          ? "bg-green-100 text-green-700"
                          : item.humedad >= 25
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.estado}
                    </span>

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