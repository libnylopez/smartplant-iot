import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

export default function HumidityChart({ lecturas = [] }) {
  const labels = lecturas.map((item) => {
    const ts = item.fecha_registro;
    if (!ts) return "";
    const parte = ts.includes("T") ? ts.split("T")[1] : ts.split(" ")[1];
    return parte ? parte.slice(0, 5) : "";
  });

  const valores = lecturas.map((item) => item.humedad_porcentaje ?? 0);

  const datos = {
    labels,
    datasets: [
      {
        data: valores,
        borderColor: "#16A34A",
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: "#16A34A",
        pointHoverBorderColor: "#FFFFFF",
        pointHoverBorderWidth: 2,
        tension: 0.4,
        fill: true,
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { chartArea } = chart;
          if (!chartArea) return "transparent";
          const gradient = chart.ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "rgba(22, 163, 74, 0.08)");
          gradient.addColorStop(1, "rgba(22, 163, 74, 0)");
          return gradient;
        },
      },
    ],
  };

  const opciones = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    animation: { duration: 500, easing: "easeInOutQuart" },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111111",
        titleColor: "#999999",
        bodyColor: "#FFFFFF",
        borderColor: "rgba(0,0,0,0.1)",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        titleFont: { size: 11, family: "Inter" },
        bodyFont: { size: 14, weight: "600", family: "Inter" },
        callbacks: {
          title: (items) => items[0].label,
          label: (item) => `${Number(item.raw).toFixed(1)}%`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(0,0,0,0.04)", drawBorder: false },
        ticks: {
          color: "#CCCCCC",
          font: { size: 10, family: "Inter" },
          maxTicksLimit: 8,
          maxRotation: 0,
        },
        border: { display: false },
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: "rgba(0,0,0,0.04)", drawBorder: false },
        ticks: {
          color: "#CCCCCC",
          font: { size: 10, family: "Inter" },
          callback: (v) => `${v}%`,
          maxTicksLimit: 5,
        },
        border: { display: false },
      },
    },
  };

  return <Line data={datos} options={opciones} />;
}
