import { Doughnut } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
// import "chartjs-plugin-doughnutlabel";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import './DonutChart.css';

Chart.register(ArcElement);
Chart.register(ChartDataLabels);

function DonutChart({donutProps}) {
	let labels = donutProps ? ['Bonds', 'Large Cap', 'Mid Cap', 'Foreign', 'Small Cap'] : ['Select Level', 'Select Level', 'Select Level', 'Select Level', 'Select Level'];
	donutProps = donutProps ? donutProps : [1, 1, 1, 1, 1, 1];

	const data = {
		labels: labels,
		datasets: [{
			data: donutProps.slice(1),
			backgroundColor: [
				'rgb(31, 119, 180)',
				'rgb(171, 199, 232)',
				'rgb(255, 127, 14)',
				'rgb(255, 187, 120)',
				'rgb(44, 160, 44)'
			],
			hoverBackgroundColor: [
				'rgb(64, 132, 180)',
				'rgb(184, 205, 232)',
				'rgb(255, 141, 41)',
				'rgb(255, 199, 144)',
				'rgb(80, 170, 80)'
			],
			// hoverBackgroundColor: chartColors
			// hoverOffset: 40
		}]
	};

	const options = {
		legend: {display: false, position: "right"},
		elements: {arc: {borderWidth: 0}},
    plugins: {
      datalabels: {
        display: true,
        formatter: (val, ctx) => {
          return val ? ctx.chart.data.labels[ctx.dataIndex] : '';
        },
				color: 'white',
				textStrokeColor: 'black',
				textStrokeWidth: 1.3,
				font: {size: 18},
      },
			doughnutlabel: {
        labels: [{
          text: '550',
          font: {size: 20, weight: 'bold'}
        }, {
          text: 'total'
        }]
      }
    },
	};

	return(
		<div className='donutChartSize'> 
			<Doughnut data={data} options={options} />
		</div>
	)
}

export default DonutChart;