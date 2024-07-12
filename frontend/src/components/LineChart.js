import React from 'react';
import Chart from 'react-apexcharts';

const LineChart = () => {
  const state = {
    series: [
      {
        name: 'Sales',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      }
    ],
    options: {
      chart: {
        height: 210, // Reduzi a altura do gráfico para 250px
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      }
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Sales Details</h5>
      </div>
      <div className="card-body">
        <Chart options={state.options} series={state.series} type="line" height={state.options.chart.height} />
      </div>
    </div>
  );
};

export default LineChart;
