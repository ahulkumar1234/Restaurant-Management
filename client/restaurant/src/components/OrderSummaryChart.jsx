import "../components/Charts/chart.css"
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

const OrderSummaryDonut = ({ served, dineIn, takeaway }) => {

  const data = {
    datasets: [
      {
        data: [takeaway, served, dineIn],
        backgroundColor: [
          "#5B5B5B",   // takeaway
          "#828282",   // served
          "#2C2C2C"    // dine in
        ],
        borderWidth: 0,
        spacing: 4
      }
    ]
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: { display: false }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="donut-chart">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default OrderSummaryDonut;