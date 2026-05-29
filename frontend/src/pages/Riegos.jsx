import Sidebar from "../components/Sidebar";

function Riegos() {

  const historialRiego = [
    {
      fecha: "2026-05-25",
      hora: "08:30",
      duracion: "10 seg"
    },
    {
      fecha: "2026-05-26",
      hora: "09:15",
      duracion: "12 seg"
    },
    {
      fecha: "2026-05-27",
      hora: "07:50",
      duracion: "8 seg"
    }
  ];

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
              15 seg
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-gray-500">
              Total Activaciones
            </h3>

            <p className="text-4xl font-bold text-green-600 mt-4">
              24
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
                  Fecha
                </th>

                <th className="text-left py-3">
                  Hora
                </th>

                <th className="text-left py-3">
                  Duración
                </th>

              </tr>

            </thead>

            <tbody>

              {historialRiego.map((item, index) => (

                <tr
                  key={index}
                  className="border-b"
                >

                  <td className="py-4">
                    {item.fecha}
                  </td>

                  <td className="py-4">
                    {item.hora}
                  </td>

                  <td className="py-4">
                    {item.duracion}
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