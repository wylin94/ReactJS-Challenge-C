import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import DonutChart from '../DonutChart';
import { setUserRiskLevel } from '../../store/userRiskLevel';
import './Home.css';

function Home() {
	const dispatch = useDispatch();

	const risks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const riskTableLabels = ['Risk', 'Bonds %', 'Large Cap %', 'Mid Cap %', 'Foreign %', 'Small Cap %'];
	const riskTableData = [
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
	const donutProps = selectedRisk ? Object.values(riskTableData[selectedRisk - 1]) : null;
	const calProps = selectedRisk ? Object.values(riskTableData[selectedRisk - 1]) : null;

	const handleRiskClick =(risk) => {
		setSelectedRisk(risk);
		dispatch(setUserRiskLevel(risk));
	};

	const handleChartDonutClick = () => {
		if (showChart === true) {
			setShowChart(false);
			setShowDonut(true);
		} else {
			setShowChart(true);
			setShowDonut(false);
		}
	};

	return (
		<div className='homeWrapper'>

			<div className='homeLabelContainer'>
				<div className='homeLabel'>Please Select A Risk Level For Your Investment Portfolio</div>
				<div className='homeLowHighLabelContainer'>
					<div className='homeLowHightLabel'>Low</div>
					<div className='homeLowHightLabel'>High</div>
				</div>
			</div>

			<div className='homeRiskSelectorContainer'>
				<div className='homeRiskSelectorUl'>
					{risks.map((risk, i) => {
						return (
							<div className={selectedRisk ? 'homeRiskSelectorLiNoHover' : 'homeRiskSelectorLi'} 
								key={risk} 
								style={selectedRisk - 1 === i ? {backgroundColor:'#e6ff3f'} : []}
								onClick={() => handleRiskClick(risk)}
							>{risk}</div>
						)
					})}
				</div>
				{!selectedRisk && <div className='homeRiskSelectorButtonOff button'>Continue</div>}
				{selectedRisk && <NavLink to={{pathname: '/calculator', state: calProps}} exact={true} className='homeRiskSelectorButtonLink'>
					<div className='button'>Continue</div>
				</NavLink>}
			</div>

			<div className='homeRiskTableDonutContainer'>
				{showChart && <div className='homeRiskTableContainer'>
					<table className='homeRiskTable'>
						<tbody>
							<tr>
								{riskTableLabels.map(label => {
									return (
										<th key={label} className={label === 'Risk' ? 'homeRiskTableColRisk' : 'homeRiskTableCol'}>{label}</th>
									)
								})}
							</tr>
							{riskTableData.map(row => {
								return (
									<tr key={row.risk} id={selectedRisk ? (row.risk === selectedRisk ? 'highlightRowNoHover' : '') : 'highlightRow'}>
										<td>{row.risk}</td>
										<td>{row.bonds}</td>
										<td>{row.large}</td>
										<td>{row.mid}</td>
										<td>{row.foreign}</td>
										<td>{row.small}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>}

				{showDonut && <div className='homeRiskDonutContainer'>
					<div className='donutCenterText'>INVESTMENT PORTFOLIO</div>
					<DonutChart donutProps={donutProps}/>
				</div>}
				
				<img 
					className='chartDonutLogo' 
					src={'../images/' + (showChart ? 'donutlogo.png' : 'chartlogo.jpeg')}  
					alt={(showChart ? 'Donut Logo' : 'Chart Logo')} 
					onClick={handleChartDonutClick}
				></img>
			</div>

		</div>
	)
}

export default Home;