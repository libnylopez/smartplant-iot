import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Clock,
  Droplets,
  Bell,
  Leaf,
} from "lucide-react";

const NAV = [
  { to: "/",          icon: LayoutGrid, label: "Resumen",  end: true  },
  { to: "/historial", icon: Clock,      label: "Historial", end: false },
  { to: "/riegos",    icon: Droplets,   label: "Riego",    end: false },
  { to: "/alertas",   icon: Bell,       label: "Alertas",  end: false },
];

/* ── Colores del sidebar oscuro ── */
const C = {
  bg:          "#111111",
  border:      "rgba(255,255,255,0.08)",
  navInactive: "#888888",
  navActive:   "#16A34A",
  navActiveBg: "rgba(22, 163, 74, 0.12)",
  label:       "rgba(255,255,255,0.22)",
  dotOn:       "#16A34A",
  metaText:    "#555555",
  metaSub:     "#383838",
  brand:       "#FFFFFF",
  brandSub:    "#444444",
};

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "210px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        background: C.bg,
        borderRight: `1px solid ${C.border}`,
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}
    >
      {/* ── Marca ── */}
      <div style={{ padding: "22px 18px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <div
            style={{
              width: "26px",
              height: "26px",
              background: "#16A34A",
              borderRadius: "7px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Leaf size={13} color="#fff" strokeWidth={2.5} />
          </div>
          <div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: C.brand,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Verdant
            </div>
            <div
              style={{
                fontSize: "10px",
                color: C.brandSub,
                lineHeight: 1.4,
              }}
            >
              Monitoreo de plantas
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          height: "1px",
          background: C.border,
          margin: "0 16px",
        }}
      />

      {/* ── Navegación ── */}
      <nav style={{ flex: 1, padding: "10px 8px" }}>
        <div
          style={{
            fontSize: "10px",
            fontWeight: 600,
            color: C.label,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            padding: "8px 10px 6px",
          }}
        >
          Secciones
        </div>

        {NAV.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 10px",
              borderRadius: "8px",
              marginBottom: "1px",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: isActive ? 600 : 400,
              color: isActive ? C.navActive : C.navInactive,
              background: isActive ? C.navActiveBg : "transparent",
              transition: "all 0.12s",
            })}
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={14}
                  strokeWidth={isActive ? 2.5 : 2}
                  style={{ flexShrink: 0 }}
                />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Estado del dispositivo ── */}
      <div style={{ padding: "12px 18px 20px" }}>
        <div
          style={{
            height: "1px",
            background: C.border,
            marginBottom: "14px",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "6px",
          }}
        >
          <div
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: C.dotOn,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "11px",
              color: C.navActive,
              fontWeight: 600,
            }}
          >
            En línea
          </span>
        </div>

        <div style={{ fontSize: "11px", color: C.metaText }}>
          Raspberry Pi 4
        </div>
        <div style={{ fontSize: "11px", color: C.metaSub, marginTop: "2px" }}>
          Actualiza cada 5 s
        </div>
      </div>
    </aside>
  );
}
