import { useEffect, useState } from "react";
import api from "../services/api";
import { Droplets, Timer, BarChart3 } from "lucide-react";

export default function Riegos() {
  const [riegos, setRiegos]     = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    api
      .get("/riegos")
      .then((r) => {
        setRiegos(Array.isArray(r.data) ? r.data : []);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, []);

  const totalActivaciones = riegos.length;

  const ultimaDuracion =
    riegos.length > 0 && riegos[0].duracion_segundos != null
      ? `${riegos[0].duracion_segundos} s`
      : "—";

  const promedioDuracion =
    riegos.length > 0
      ? `${(riegos.reduce((a, r) => a + (r.duracion_segundos ?? 0), 0) / riegos.length).toFixed(1)} s`
      : "—";

  const METRICAS = [
    { etiqueta: "Estado del sistema", valor: "Activo",           Icono: Droplets,  },
    { etiqueta: "Último riego",       valor: ultimaDuracion,     Icono: Timer,     },
    { etiqueta: "Total de riegos",    valor: totalActivaciones,  Icono: BarChart3, },
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ── Encabezado ── */}
      <header className="vpage-header">
        <div>
          <h1 className="vpage-title">Riego</h1>
          <p className="vpage-subtitle">
            Historial y control del sistema de riego
          </p>
        </div>

        <button
          className="vbtn vbtn-primary"
          type="button"
          disabled
          style={{ opacity: 0.4, cursor: "not-allowed" }}
        >
          <Droplets size={13} />
          Activar riego
        </button>
      </header>

      {/* ── Contenido ── */}
      <div className="vpage-content animate-fade-in">

        {/* Métricas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          {METRICAS.map(({ etiqueta, valor, Icono }) => (
            <div
              key={etiqueta}
              className="vcard animate-fade-in-up"
              style={{ padding: "20px" }}
            >
              <Icono size={15} color="#CCCCCC" style={{ marginBottom: "14px" }} />
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 600,
                  color: "var(--t1)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {valor}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--t3)",
                  marginTop: "4px",
                }}
              >
                {etiqueta}
              </div>
            </div>
          ))}
        </div>

        {/* Promedio — solo si hay más de un riego */}
        {riegos.length > 1 && (
          <div
            style={{
              padding: "12px 16px",
              background: "var(--surface)",
              borderRadius: "10px",
              boxShadow: "var(--shadow-xs)",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Timer size={13} color="var(--t3)" />
            <span style={{ fontSize: "13px", color: "var(--t2)" }}>
              Duración promedio de riego:{" "}
              <strong style={{ color: "var(--t1)", fontWeight: 600 }}>
                {promedioDuracion}
              </strong>
            </span>
          </div>
        )}

        {/* Historial */}
        <div className="vcard">
          <div
            style={{
              padding: "14px 20px",
              borderBottom: "1px solid rgba(0,0,0,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--t1)",
              }}
            >
              Historial de activaciones
            </span>
            <span style={{ fontSize: "12px", color: "var(--t3)" }}>
              {riegos.length} eventos
            </span>
          </div>

          <table className="vtable">
            <thead>
              <tr>
                <th style={{ width: "40px" }}>#</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Duración</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "52px", color: "var(--t4)" }}>
                    Cargando...
                  </td>
                </tr>
              ) : riegos.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "52px", color: "var(--t4)" }}>
                    Sin activaciones registradas
                  </td>
                </tr>
              ) : (
                riegos.map((r, i) => (
                  <tr key={r.id ?? i}>
                    <td style={{ color: "var(--t4)", fontVariantNumeric: "tabular-nums" }}>
                      {i + 1}
                    </td>
                    <td className="vmono" style={{ color: "var(--t3)" }}>
                      {r.fecha_inicio ?? "—"}
                    </td>
                    <td className="vmono" style={{ color: "var(--t3)" }}>
                      {r.fecha_fin ?? "—"}
                    </td>
                    <td>
                      <span
                        style={{
                          fontWeight: 600,
                          fontVariantNumeric: "tabular-nums",
                          color: "var(--t1)",
                        }}
                      >
                        {r.duracion_segundos != null
                          ? `${r.duracion_segundos} s`
                          : "—"}
                      </span>
                    </td>
                    <td>
                      <span className="vpill vpill-success">
                        {r.estado ?? "Completado"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
