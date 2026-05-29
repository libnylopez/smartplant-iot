import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function HumidityChart({ lecturas }) {

  const data = {
    labels: lecturas.map(
      (item) => item.fecha
    ),

    datasets: [
      {
        label: "Humedad (%)",

        data: lecturas.map(
          (item) => item.humedad
        ),

        borderColor: "#16a34a",

        backgroundColor:
          "rgba(22,163,74,0.2)",

        tension: 0.4,

        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <Line
      data={data}
      options={options}
    />
  );
}

export default HumidityChart;