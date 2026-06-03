/*
 * PlantSVG — Ilustración botánica vectorial
 * Verdant · Plataforma Inteligente de Monitoreo de Plantas
 *
 * Tres estados: success / warning / danger
 * Cuatro hojas con formas bezier precisas + venas
 * Animación de balanceo en estado saludable
 */

const CONFIGS = {
  success: {
    tallo:    "#15803D",
    hoja1:    "#14532D",   /* hoja madura — más oscura */
    hoja2:    "#16A34A",
    hoja3:    "#1DAD56",
    apice:    "#22C55E",   /* crecimiento nuevo — más clara */
    vena:     "rgba(8, 40, 16, 0.38)",
    animar:   true,
    /* inclinación de cada hoja en grados */
    incH1:    0,
    incH2:    0,
    incH3:    0,
    opApice:  0.88,
  },
  warning: {
    tallo:    "#3A5E2C",
    hoja1:    "#2E5226",
    hoja2:    "#3E6B32",
    hoja3:    "#4C7A3C",
    apice:    "#568745",
    vena:     "rgba(16, 36, 12, 0.35)",
    animar:   false,
    incH1:    7,
    incH2:   -5,
    incH3:    4,
    opApice:  0.52,
  },
  danger: {
    tallo:    "#484825",
    hoja1:    "#393920",
    hoja2:    "#4C4C28",
    hoja3:    "#5A5A2E",
    apice:    "#525218",
    vena:     "rgba(12, 12, 6, 0.38)",
    animar:   false,
    incH1:    18,
    incH2:   -13,
    incH3:    9,
    opApice:  0.26,
  },
};

/*
 * Geometría de las hojas (viewBox 0 0 200 250):
 *
 * Cada hoja se define con dos curvas bezier cúbicas que
 * parten del punto de unión con el tallo y llegan a la punta.
 * La primera curva traza el borde superior de la hoja;
 * la segunda regresa por el borde inferior.
 * Las venas son líneas del punto de unión a la punta.
 *
 * Hoja 1: unión (100,183) → punta (18,145)  grande, izquierda
 * Hoja 2: unión (100,152) → punta (172,112) mediana, derecha
 * Hoja 3: unión (100,120) → punta (38,95)   pequeña, izquierda
 * Ápice:  unión (100,75)  → punta (112,46)  nueva, casi vertical
 */

export default function PlantSVG({ estado = "success" }) {
  const c = CONFIGS[estado] ?? CONFIGS.success;

  return (
    <svg
      viewBox="0 0 200 250"
      width="100%"
      height="100%"
      aria-hidden="true"
      style={{ display: "block", overflow: "visible" }}
    >
      <defs>
        <style>{`
          @keyframes verdant-balanceo {
            0%, 100% { transform: rotate(-1deg); }
            50%       { transform: rotate(1deg);  }
          }
          .vp-live  {
            transform-origin: 100px 236px;
            animation: verdant-balanceo 5.5s ease-in-out infinite;
          }
          .vp-still {
            transform-origin: 100px 236px;
          }
        `}</style>
      </defs>

      <g className={c.animar ? "vp-live" : "vp-still"}>

        {/* ── Tallo ── */}
        {/*
         * Curva sinuosa natural: alternancia suave izquierda/derecha
         * que simula el crecimiento real de un tallo vegetal.
         */}
        <path
          d={
            "M 100 236 " +
            "C 97 214, 104 198, 100 179 " +
            "C 96 160, 104 145, 100 126 " +
            "C 97 110, 103 96, 100 80 " +
            "C 98 68, 100 58, 100 52"
          }
          stroke={c.tallo}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          style={{ transition: "stroke 0.8s ease" }}
        />

        {/* ── Hoja 1 — grande, izquierda ── */}
        <g
          style={{
            transform:       `rotate(${c.incH1}deg)`,
            transformOrigin: "100px 183px",
            transition:      "transform 0.9s ease",
          }}
        >
          {/*
           * Borde superior: curva hacia arriba-izquierda desde la unión a la punta.
           * Borde inferior: curva de vuelta desde la punta hasta la unión.
           * Juntas crean una hoja elongada con punta en ambos extremos.
           */}
          <path
            d={
              "M 100 183 " +
              "C 74 152, 44 140, 18 145 " +   /* borde superior */
              "C 36 175, 64 188, 100 183 Z"    /* borde inferior */
            }
            style={{ fill: c.hoja1, transition: "fill 0.8s ease" }}
            opacity="0.95"
          />
          {/* Vena central */}
          <line
            x1="100" y1="183" x2="18" y2="145"
            stroke={c.vena}
            strokeWidth="0.65"
          />
        </g>

        {/* ── Hoja 2 — mediana, derecha ── */}
        <g
          style={{
            transform:       `rotate(${c.incH2}deg)`,
            transformOrigin: "100px 152px",
            transition:      "transform 0.9s ease",
          }}
        >
          <path
            d={
              "M 100 152 " +
              "C 114 120, 138 108, 172 112 " +
              "C 160 143, 128 156, 100 152 Z"
            }
            style={{ fill: c.hoja2, transition: "fill 0.8s ease" }}
            opacity="0.90"
          />
          <line
            x1="100" y1="152" x2="172" y2="112"
            stroke={c.vena}
            strokeWidth="0.65"
          />
        </g>

        {/* ── Hoja 3 — pequeña, izquierda alta ── */}
        <g
          style={{
            transform:       `rotate(${c.incH3}deg)`,
            transformOrigin: "100px 120px",
            transition:      "transform 0.9s ease",
          }}
        >
          <path
            d={
              "M 100 120 " +
              "C 83 103, 63 94, 38 95 " +
              "C 55 112, 75 121, 100 120 Z"
            }
            style={{ fill: c.hoja3, transition: "fill 0.8s ease" }}
            opacity="0.85"
          />
          <line
            x1="100" y1="120" x2="38" y2="95"
            stroke={c.vena}
            strokeWidth="0.65"
          />
        </g>

        {/* ── Hoja ápice — crecimiento nuevo ── */}
        {/*
         * La hoja más joven: muy estrecha, casi vertical.
         * En estado crítico se muestra casi invisible.
         */}
        <path
          d={
            "M 100 75 " +
            "C 104 65, 111 51, 112 46 " +
            "C 111 56, 105 74, 100 75 Z"
          }
          style={{
            fill: c.apice,
            opacity: c.opApice,
            transition: "fill 0.8s ease, opacity 0.8s ease",
          }}
        />

        {/* ── Línea de suelo ── */}
        <path
          d="M 76 239 Q 100 236 124 239"
          stroke={c.tallo}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.20"
          style={{ transition: "stroke 0.8s ease" }}
        />

      </g>
    </svg>
  );
}
