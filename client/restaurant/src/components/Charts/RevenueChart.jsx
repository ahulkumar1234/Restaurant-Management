import "./revenueChart.css";

const RevenueChart = ({ data }) => {

  const width = 350;
  const height = 200;
  const padding = 40;

  const max = Math.max(...data, 1);

  const stepX = (width - padding * 2) / (data.length - 1);

  const points = data.map((value, index) => {
    const x = padding + index * stepX;
    const y =
      height -
      padding -
      (value / max) * (height - padding * 2);

    return { x, y };
  });

  const path = points.reduce((acc, point, i, arr) => {

    if (i === 0) return `M ${point.x} ${point.y}`;

    const prev = arr[i - 1];

    const cx = (prev.x + point.x) / 2;

    return `${acc} 
      C ${cx} ${prev.y},
        ${cx} ${point.y},
        ${point.x} ${point.y}`;

  }, "");

  return (
    <div className="revenue-chart">

      <svg width={width} height={height}>


        {points.map((p, i) => (
          <rect
            key={i}
            x={p.x - 12}
            y={padding}
            width="24"
            height={height - padding * 2}
            rx="6"
            fill="#F0F0F0"
          />
        ))}


        <path
          d={path}
          fill="none"
          stroke="#1E1E1E"
          strokeWidth="3"
        />

      </svg>


      <div className="week-labels">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>

    </div>
  );
};

export default RevenueChart;