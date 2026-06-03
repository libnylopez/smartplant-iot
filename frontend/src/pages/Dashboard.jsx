import { useEffect, useState } from "react";
import api from "../services/api";
import PlantSVG from "../components/PlantSVG";
import HumidityChart from "../components/HumidityChart";
import { Droplet, Activity, Wifi, RefreshCw } from "lucide-react";

/* ── Helpers ── */

function obtenerEstado(h) {
  if (h === null || h === undefined)
    return { etiqueta: "Sin datos", variante: "neutral", color: "#999999" };
  if (h >= 40)
    return { etiqueta: "Óptimo",    variante: "success", color: "#16A34A" };
  if (h >= 25)
    return { etiqueta: "Aceptable", variante: "warning", color: "#92400E" };
  return   { etiqueta: "Seco",      variante: "danger",  color: "#991B1B" };
}

function formatearHora(d) {
  return d.toLocaleTimeString("es-GT", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  });
}

/* ── KPI Card ── */

function KPICard({ icono: Icono, etiqueta, valor, sub, delay }) {
  return (
    <div
      className="vcard-lift animate-fade-in-up"
      style={{ padding: "20px", animationDelay: delay }}
    >
      <Icono size={15} color="#CCCCCC" style={{ marginBottom: "14px" }} />
      <div
        style={{
          fontSize: "26px",
          fontWeight: 600,
          color: "var(--t1)",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {valor}
      </div>
      <div style={{ fontSize: "12px", color: "var(--t3)", marginTop: "4px" }}>
        {etiqueta}
      </div>
      {sub && (
        <div style={{ fontSize: "11px", color: "var(--t4)", marginTop: "2px" }}>
          {sub}
        </div>
      )}
    </div>
  );
}

/* ── Página ── */

export default function Dashboard() {
  const [lecturas, setLecturas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [ahora, setAhora]       = useState(new Date());

  useEffect(() => {
    const cargar = () =>
      api.get("/lecturas/")
        .then((r) => {
          setLecturas(Array.isArray(r.data) ? r.data : []);
          setCargando(false);
        })
        .catch(() => setCargando(false));

    cargar();
    const intervalo = setInterval(cargar, 5000);
    const reloj    = setInterval(() => setAhora(new Date()), 1000);
    return () => { clearInterval(intervalo); clearInterval(reloj); };
  }, []);

  const ultima    = lecturas[lecturas.length - 1] ?? null;
  const humedad   = ultima?.humedad_porcentaje ?? null;
  const estado    = obtenerEstado(humedad);
  const recientes = [...lecturas].reverse().slice(0, 10);

  /* barra de progreso */
  const pct = Math.min(Math.max(humedad ?? 0, 0), 100);
  const barColor =
    estado.variante === "success" ? "#16A34A" :
    estado.variante === "warning" ? "#D97706" : "#DC2626";

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* ── Encabezado ── */}
      <header className="vpage-header">
        <div>
          <h1 className="vpage-title">Resumen</h1>
          <p className="vpage-subtitle">Monitoreo en tiempo real</p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            color: "var(--t3)",
          }}
        >
          <span style={{
            display: "inline-block",
            width: "5px", height: "5px",
            borderRadius: "50%",
            background: "#16A34A",
          }} />
          <span style={{ color: "var(--t2)", fontWeight: 500 }}>En línea</span>
          <span style={{ color: "var(--t4)" }}>·</span>
          <span style={{ fontVariantNumeric: "tabular-nums" }}>
            {formatearHora(ahora)}
          </span>
        </div>
      </header>

      {/* ── Contenido ── */}
      <div className="vpage-content animate-fade-in">

        {/* ════════════════════════════════════════════
            HERO — Estado de la planta
            ════════════════════════════════════════════ */}
        <div
          className="vcard"
          style={{
            padding: "36px 40px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "48px",
            minHeight: "260px",
          }}
        >
          {/* Ilustración botánica */}
          <div
            style={{
              width: "160px",
              height: "200px",
              flexShrink: 0,
            }}
          >
            <PlantSVG estado={estado.variante} />
          </div>

          {/* Separador vertical */}
          <div
            style={{
              width: "1px",
              alignSelf: "stretch",
              background: "rgba(0,0,0,0.06)",
              flexShrink: 0,
              marginBlock: "8px",
            }}
          />

          {/* Datos */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "12px",
                color: "var(--t3)",
                fontWeight: 500,
                letterSpacing: "0.02em",
                marginBottom: "8px",
              }}
            >
              Humedad actual
            </div>

            {/* Número principal */}
            <div
              style={{
                fontSize: "68px",
                fontWeight: 700,
                color: "var(--t1)",
                letterSpacing: "-0.05em",
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
                marginBottom: "6px",
                transition: "color 0.5s ease",
              }}
            >
              {humedad !== null ? `${humedad.toFixed(1)}%` : "—"}
            </div>

            <div
              style={{
                fontSize: "13px",
                color: "var(--t3)",
                marginBottom: "22px",
              }}
            >
              Humedad del suelo
            </div>

            {/* Barra de progreso */}
            <div
              style={{
                width: "100%",
                maxWidth: "320px",
                height: "3px",
                background: "rgba(0,0,0,0.08)",
                borderRadius: "2px",
                marginBottom: "18px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: "100%",
                  background: barColor,
                  borderRadius: "2px",
                  transition: "width 1.2s ease, background 0.6s ease",
                }}
              />
            </div>

            <span className={`vpill vpill-${estado.variante}`}>
              {estado.etiqueta}
            </span>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            KPIs de soporte
            ════════════════════════════════════════════ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <KPICard
            icono={Droplet}
            etiqueta="Humedad actual"
            valor={humedad !== null ? `${humedad.toFixed(1)}%` : "—"}
            sub="Sensor de suelo"
            delay="0ms"
          />
          <KPICard
            icono={Activity}
            etiqueta="Estado de la planta"
            valor={humedad !== null ? estado.etiqueta : "—"}
            sub="Umbral óptimo ≥ 40%"
            delay="55ms"
          />
          <KPICard
            icono={Wifi}
            etiqueta="Conexión"
            valor="Activa"
            sub="Broker MQTT"
            delay="110ms"
          />
          <KPICard
            icono={RefreshCw}
            etiqueta="Actualización"
            valor="5 s"
            sub={`${lecturas.length} lecturas totales`}
            delay="165ms"
          />
        </div>

        {/* ════════════════════════════════════════════
            Gráfica de tendencia
            ════════════════════════════════════════════ */}
        <div
          className="vcard"
          style={{ padding: "20px", marginBottom: "16px" }}
        >
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--t1)",
              }}
            >
              Tendencia de humedad
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--t3)",
                marginTop: "2px",
              }}
            >
              Últimas {lecturas.length} lecturas · intervalo de 5 s
            </div>
          </div>

          <div style={{ height: "210px" }}>
            {cargando ? (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--t4)",
                  fontSize: "13px",
                }}
              >
                Cargando...
              </div>
            ) : (
              <HumidityChart lecturas={lecturas} />
            )}
          </div>
        </div>

        {/* ════════════════════════════════════════════
            Lecturas recientes
            ════════════════════════════════════════════ */}
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
              Lecturas recientes
            </span>
            <span style={{ fontSize: "12px", color: "var(--t3)" }}>
              {lecturas.length} registros
            </span>
          </div>

          <table className="vtable">
            <thead>
              <tr>
                <th>Fecha y hora</th>
                <th>Humedad</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr>
                  <td
                    colSpan={3}
                    style={{
                      textAlign: "center",
                      padding: "36px",
                      color: "var(--t4)",
                    }}
                  >
                    Cargando datos...
                  </td>
                </tr>
              ) : recientes.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    style={{
                      textAlign: "center",
                      padding: "36px",
                      color: "var(--t4)",
                    }}
                  >
                    Sin lecturas disponibles
                  </td>
                </tr>
              ) : (
                recientes.map((fila, i) => {
                  const e = obtenerEstado(fila.humedad_porcentaje);
                  return (
                    <tr key={i}>
                      <td className="vmono" style={{ color: "var(--t3)" }}>
                        {fila.fecha_registro ?? "—"}
                      </td>
                      <td
                        style={{
                          fontVariantNumeric: "tabular-nums",
                          fontWeight: 600,
                          fontSize: "14px",
                          color: "var(--t1)",
                        }}
                      >
                        {fila.humedad_porcentaje?.toFixed(1) ?? "—"}%
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
