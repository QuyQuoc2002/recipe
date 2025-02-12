import { useEffect, useRef } from "react";

import Chart from "chart.js/auto";

const ChartComponent = ({
  type,
  data,
  options,
  className = null,
  style = null,
}) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: type,
      data: data,
      options: options,
    });

    return () => {
      myChart.destroy();
    };
  }, [type, data, options]);
  return <canvas className={className} style={style} ref={chartRef}></canvas>;
};

export default ChartComponent;
