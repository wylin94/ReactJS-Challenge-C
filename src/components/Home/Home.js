import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import './Home.css';

function Home() {
	const risks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const riskTable = [
		{risk: 1, bonds: 80, large: 20, mid: 0, foreign: 0, small: 0},
		{risk: 2, bonds: 70, large: 15, mid: 15, foreign: 0, small: 0},
		{risk: 3, bonds: 60, large: 15, mid: 15, foreign: 10, small: 0},
		{risk: 4, bonds: 50, large: 20, mid: 20, foreign: 10, small: 0},
		{risk: 5, bonds: 40, large: 20, mid: 20, foreign: 20, small: 0},
		{risk: 6, bonds: 35, large: 25, mid: 5, foreign: 30, small: 5},
		{risk: 7, bonds: 20, large: 25, mid: 25, foreign: 25, small: 5},
		{risk: 8, bonds: 10, large: 20, mid: 40, foreign: 20, small: 10},
		{risk: 9, bonds: 5, large: 15, mid: 40, foreign: 25, small: 15},
		{risk: 10, bonds: 0, large: 5, mid: 25, foreign: 30, small: 40},
	];

	const [selectedRisk, setSelectedRisk] = useState();
	const [showChart, setShowChart] = useState(true);
	const [showDonut, setShowDonut] = useState(false);

	const handleRiskClick =(risk) => {
		setSelectedRisk(risk);
	};

	const hadleChartDonutClick = () => {
		if (showChart === true) {
			setShowChart(false);
			setShowDonut(true);
		} else {
			setShowChart(true);
			setShowDonut(false);
		}
	};

	return (
		<body className='homeWrapper'>

			<div className='homeLabelContainer'>
				<div className='homeLabel'>Please Select A Risk Level For Your Investment Portfolio</div>
				<div className='homeLowHighLabelContainer'>
					<div className='homeLowHightLabel'>Low</div>
					<div className='homeLowHightLabel'>High</div>
				</div>
			</div>

			<div className='homeRiskSelectorContainer'>
				<div className='homeRiskSelectorUl'>
					{risks.map(risk => {
						return (
							<div className='homeRiskSelectorLi' 
								key={risk} 
								id={risk === selectedRisk ? 'highlightRisk' : ''}
								onClick={() => handleRiskClick(risk)}
							>{risk}</div>
						)
					})}
				</div>
				{!selectedRisk && <div className='homeRiskSelectorButtonOff'>Continue</div>}
				{selectedRisk && <NavLink to='/calculator' exact={true} className='homeRiskSelectorButtonLink'>
					<div className='homeRiskSelectorButtonOn'>Continue</div>
				</NavLink>}
			</div>

			<div className='homeRiskTableDonutContainer'>
				{showChart && <div className='homeRiskTableContainer'>
					<table className='homeRiskTable'>
						<tr>
							<th className='homeRiskTableColRisk'>Risk</th>
							<th className='homeRiskTableCol'>Bonds %</th>
							<th className='homeRiskTableCol'>Large Cap %</th>
							<th className='homeRiskTableCol'>Mid Cap %</th>
							<th className='homeRiskTableCol'>Foreign %</th>
							<th className='homeRiskTableCol'>Small Cap %</th>
						</tr>
						{riskTable.map(row => {
							return (
								<tr id={row.risk === selectedRisk ? 'highlightRow' : ''}>
									<td>{row.risk}</td>
									<td>{row.bonds}</td>
									<td>{row.large}</td>
									<td>{row.mid}</td>
									<td>{row.foreign}</td>
									<td>{row.small}</td>
								</tr>
							)
						})}
					</table>
				</div>}

				{showDonut && <div className='homeRiskDonutContainer'>
					Donut Chart
				</div>}
				
				<img 
					className='chartDonutLogo' 
					src={'../images/' + (showChart ? 'donutlogo.png' : 'chartlogo.jpeg')}  
					alt={(showChart ? 'Donut Logo' : 'Chart Logo')} 
					onClick={hadleChartDonutClick}
				></img>
			</div>

		</body>
	)
}

export default Home;