import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItem = (path, icon, text) => (
    <li>
      <Link
        to={path}
        className={`block p-3 rounded-lg transition-all duration-200 ${
          location.pathname === path
            ? "bg-green-100 text-green-700 font-semibold shadow-sm"
            : "hover:bg-slate-100 text-slate-700"
        }`}
      >
        {icon} {text}
      </Link>
    </li>
  );

  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen relative">

      {/* Logo */}
      <div className="p-6 border-b">

        <h1 className="text-3xl font-bold text-green-600">
          🌱 SmartPlant
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Sistema IoT de Monitoreo
        </p>

      </div>

      {/* Menú */}
      <nav className="p-6">

        <ul className="space-y-3">

          {menuItem("/", "📊", "Dashboard")}

          {menuItem("/historial", "📈", "Historial")}

          {menuItem("/riegos", "🚿", "Riegos")}

          {menuItem("/alertas", "🚨", "Alertas")}

          {menuItem("/configuracion", "⚙️", "Configuración")}

        </ul>

      </nav>

      {/* Estado del sistema */}
      <div className="absolute bottom-8 left-6 right-6">

        <div className="bg-green-50 border border-green-100 p-4 rounded-xl">

          <p className="text-sm text-gray-500">
            Dispositivo Principal
          </p>

          <p className="font-semibold text-green-600 mt-1">
            Raspberry Pi 4
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>

            <span className="text-sm text-green-600">
              Conectado
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            Última actualización:
            <br />
            hace 5 segundos
          </p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;