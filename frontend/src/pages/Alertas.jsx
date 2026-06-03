import { useEffect, useState } from "react";
import api from "../services/api";
import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";

function clasificarAlerta(humedad) {
  if (humedad < 25)
    return {
      nivel: "critica",
      etiqueta: "Crítica",
      variante: "danger",
      Icono: AlertCircle,
      mensaje: `Suelo muy seco (${humedad.toFixed(1)}%) — Se requiere riego inmediato`,
    };
  if (humedad < 40)
    return {
      nivel: "advertencia",
      etiqueta: "Advertencia",
      variante: "warning",
      Icono: AlertTriangle,
      mensaje: `Humedad baja (${humedad.toFixed(1)}%) — Se recomienda regar pronto`,
    };
  return {
    nivel: "normal",
    etiqueta: "Normal",
    variante: "success",
    Icono: CheckCircle2,
    mensaje: `Humedad adecuada (${humedad.toFixed(1)}%) — La planta está bien`,
  };
}

const RESUMEN = [
  { clave: "critica",     etiqueta: "Alertas críticas",  Icono: AlertCircle,  variante: "danger",  colorTexto: "#991B1B" },
  { clave: "advertencia", etiqueta: "Advertencias",       Icono: AlertTriangle, variante: "warning", colorTexto: "#92400E" },
  { clave: "normal",      etiqueta: "Lecturas normales",  Icono: CheckCircle2, variante: "success", colorTexto: "#16A34A" },
];

export default function Alertas() {
  const [alertas, setAlertas]   = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    api
      .get("/lecturas")
      .then((r) => {
        const datos = Array.isArray(r.data) ? r.data : [];
        setAlertas(
          datos.map((l) => ({
            ...clasificarAlerta(l.humedad_porcentaje),
            humedad: l.humedad_porcentaje,
            fecha:   l.fecha_registro,
          }))
        );
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, []);

  const conteos = {
    critica:     alertas.filter((a) => a.nivel === "critica").length,
    advertencia: alertas.filter((a) => a.nivel === "advertencia").length,
    normal:      alertas.filter((a) => a.nivel === "normal").length,
  };

  const invertidas = [...alertas].reverse();

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ── Encabezado ── */}
      <header className="vpage-header">
        <div>
          <h1 className="vpage-title">Alertas</h1>
          <p className="vpage-subtitle">
            Eventos generados por el sensor de humedad
          </p>
        </div>

        <span style={{ fontSize: "12px", color: "var(--t3)" }}>
          {alertas.length} eventos totales
        </span>
      </header>

      {/* ── Contenido ── */}
      <div className="vpage-content animate-fade-in">

        {/* Tarjetas de resumen */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          {RESUMEN.map(({ clave, etiqueta, Icono, colorTexto }) => (
            <div
              key={clave}
              className="vcard animate-fade-in-up"
              style={{ padding: "20px" }}
            >
              <Icono size={15} color="#CCCCCC" style={{ marginBottom: "14px" }} />
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                  color: colorTexto,
                  lineHeight: 1,
                }}
              >
                {conteos[clave]}
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

        {/* Tabla de eventos */}
        <div className="vcard">
          <div
            style={{
              padding: "14px 20px",
              borderBottom: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--t1)",
              }}
            >
              Registro de eventos
            </span>
          </div>

          <table className="vtable">
            <thead>
              <tr>
                <th style={{ width: "110px" }}>Nivel</th>
                <th>Mensaje</th>
                <th style={{ width: "80px" }}>Humedad</th>
                <th style={{ width: "160px" }}>Fecha y hora</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "52px", color: "var(--t4)" }}>
                    Cargando...
                  </td>
                </tr>
              ) : invertidas.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "52px", color: "var(--t4)" }}>
                    Sin alertas registradas
                  </td>
                </tr>
              ) : (
                invertidas.map((a, i) => {
                  const { Icono } = a;
                  return (
                    <tr key={i}>
                      <td>
                        <span className={`vpill vpill-${a.variante}`}>
                          <Icono size={10} />
                          {a.etiqueta}
                        </span>
                      </td>
                      <td style={{ fontSize: "12px" }}>
                        {a.mensaje}
                      </td>
                      <td>
                        <span
                          style={{
                            fontWeight: 600,
                            fontVariantNumeric: "tabular-nums",
                            fontSize: "13px",
                            color: "var(--t1)",
                          }}
                        >
                          {a.humedad?.toFixed(1) ?? "—"}%
                        </span>
                      </td>
                      <td className="vmono" style={{ color: "var(--t3)" }}>
                        {a.fecha ?? "—"}
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
