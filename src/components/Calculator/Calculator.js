import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from "react-router-dom";

import './Calculator.css';

function Calculator() {
	const riskLabels = ['Bonds', 'Large Cap', 'Mid Cap', 'Foreign', 'Small Cap'];
	const cpTableLabels = ['Current Amount', 'Difference', 'New Amount', 'Recommended Transfers'];
	let location = useLocation();
	const [cPInput, setCPInput] = useState([null, null, null, null, null]);
	// const cPInputReady = cPInput.includes(null) ? false : true;
	// console.log(cPInputReady)

	const updateCPInput = (e, label) => {
		let currentcPInput = [...cPInput];
		if (label === 'Bonds') {currentcPInput[0] = Number(e.target.value);} 
			else if (label === 'Large Cap') {currentcPInput[1] = Number(e.target.value);} 
			else if (label === 'Mid Cap') {currentcPInput[2] = Number(e.target.value);} 
			else if (label === 'Foreign') {currentcPInput[3] = Number(e.target.value);} 
			else if (label === 'Small Cap') {currentcPInput[4] = Number(e.target.value);}
		setCPInput(currentcPInput); 
		console.log(cPInput)
	}

	const handleRebalance = () => {
		console.log('rebalance clicked')
	}

	return (
		<div className='calWrapper'>
			<div className='calLabel'>Personalized Portfolio</div>

			<div className='calRiskLevelLabelContainer'>
				<div className='calRiskLevelLabel'>Risk Level {location.state[0]}</div>
			</div>

			<div className='homeRiskTableContainer'>
				<table className='homeRiskTable'>
					<tbody>
						<tr>
							{riskLabels.map(label => {
								return (
									<th key={label} className='homeRiskTableCol'>{label}</th>
								)
							})}
						</tr>
						<tr>
							{riskLabels.map((label, i) => {
								return (
									<td key={label}>{location.state[i + 1]}%</td>
								)
							})}
						</tr>
					</tbody>
				</table>
			</div>

			<div className='calCPContainer'>
				<div className='calCPLabel'>Please Enter Your Current Portfolio</div>
				<div className='calCPButton button' onClick={handleRebalance} style={cPInput.includes(null)?{opacity: 0.4}:{opacity: 1}}>Rebalance</div>
			</div>

			<div className='calCPTableContainer'>
				<div className='calCPTableLabel'>
					{cpTableLabels.map(label => {
						return (
							<label key={label}>{label}</label>
						)
					})}
				</div>

				<div className='calCPTableBody'>
					<div className='calCPTableLeft'>
						{riskLabels.map(label => {
							return (
								<div key={label} className='calCPTableRow'>
									<label>{label} $:</label>
									<div className='calCPTableRowInputs'>
										<input className='calCPTableRowCurrent' type='text' onChange={(e) => updateCPInput(e, label)}></input>
										<input className='calCPTableRowDiff' type='text' disabled></input>
										<input className='calCPTableRowNew' type='text' disabled></input>
									</div>
								</div>
							)
						})}
					</div>

					<div className='calCPTableRight'>
						<input disabled></input>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Calculator;