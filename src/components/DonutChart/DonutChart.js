import { Doughnut } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'

import './DonutChart.css';

Chart.register(ArcElement);

function DonutChart(donutProps) {
	console.log('from donut chart', donutProps)
	const options = {
		// legend: {
		// 	display: false,
		// 	position: "right"
		// },
		elements: {
			arc: {borderWidth: 0}
		}
	};

	const data = {
		labels: ['Red', 'Blue', 'Yellow'],
		datasets: [{
			// label: 'My First Dataset',
			data: [300, 50, 100],
			backgroundColor: [
				'rgb(255, 99, 132)',
				'rgb(54, 162, 235)',
				'rgb(255, 205, 86)'
			],
			// hoverBackgroundColor: chartColors
			hoverOffset: 40
		}]
	};

	return(
		<Doughnut data={data} options={options} />
	)
}

export default DonutChart;