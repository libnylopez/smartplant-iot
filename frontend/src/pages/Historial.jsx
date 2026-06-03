import { useEffect, useState } from "react";
import api from "../services/api";
import { Search, Download } from "lucide-react";

function obtenerEstado(h) {
  if (h >= 40) return { etiqueta: "Óptimo",    variante: "success" };
  if (h >= 25) return { etiqueta: "Aceptable",  variante: "warning" };
  return            { etiqueta: "Seco",        variante: "danger"  };
}

export default function Historial() {
  const [lecturas, setLecturas] = useState([]);
  const [busqueda, setBusqueda]  = useState("");
  const [cargando, setCargando]  = useState(true);

  useEffect(() => {
    api
      .get("/lecturas")
      .then((r) => {
        setLecturas(Array.isArray(r.data) ? r.data : []);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, []);

  const filtradas = lecturas.filter((l) => {
    if (!busqueda) return true;
    const q = busqueda.toLowerCase();
    return (
      String(l.humedad_porcentaje).includes(q) ||
      (l.fecha_registro ?? "").toLowerCase().includes(q) ||
      (l.estado_sensor  ?? "").toLowerCase().includes(q)
    );
  });

  const visibles = [...filtradas].reverse();

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ── Encabezado ── */}
      <header className="vpage-header">
        <div>
          <h1 className="vpage-title">Historial</h1>
          <p className="vpage-subtitle">
            Registro de todas las lecturas del sensor
          </p>
        </div>

        <button className="vbtn vbtn-secondary" type="button">
          <Download size={13} />
          Exportar
        </button>
      </header>

      {/* ── Contenido ── */}
      <div className="vpage-content animate-fade-in">

        {/* Búsqueda */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <div style={{ position: "relative", flex: 1, maxWidth: "340px" }}>
            <Search
              size={13}
              color="var(--t4)"
              style={{
                position: "absolute",
                left: "11px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            />
            <input
              className="vinput"
              style={{ paddingLeft: "32px" }}
              placeholder="Buscar lecturas..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <span style={{ fontSize: "12px", color: "var(--t3)" }}>
            {filtradas.length} de {lecturas.length} registros
          </span>
        </div>

        {/* Tabla */}
        <div className="vcard">
          <table className="vtable">
            <thead>
              <tr>
                <th style={{ width: "52px" }}>#</th>
                <th>Fecha y hora</th>
                <th>Humedad</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "52px", color: "var(--t4)" }}>
                    Cargando datos...
                  </td>
                </tr>
              ) : visibles.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "52px", color: "var(--t4)" }}>
                    {busqueda ? "Sin resultados" : "Sin lecturas disponibles"}
                  </td>
                </tr>
              ) : (
                visibles.map((fila, i) => {
                  const e = obtenerEstado(fila.humedad_porcentaje);
                  return (
                    <tr key={fila.id ?? i}>
                      <td style={{ color: "var(--t4)", fontVariantNumeric: "tabular-nums" }}>
                        {visibles.length - i}
                      </td>
                      <td className="vmono" style={{ color: "var(--t3)" }}>
                        {fila.fecha_registro ?? "—"}
                      </td>
                      <td>
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: "14px",
                            letterSpacing: "-0.02em",
                            fontVariantNumeric: "tabular-nums",
                            color: "var(--t1)",
                          }}
                        >
                          {fila.humedad_porcentaje?.toFixed(1) ?? "—"}%
                        </span>
                      </td>
                      <td>
                        <span className={`vpill vpill-${e.variante}`}>
                          {e.etiqueta}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
