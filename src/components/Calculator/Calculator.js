import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from "react-router-dom";

import './Calculator.css';

function Calculator() {
	const riskLabels = ['Bonds', 'Large Cap', 'Mid Cap', 'Foreign', 'Small Cap'];
	const cpTableLabels = ['Current Amount', 'Difference', 'New Amount', 'Recommended Transfers'];
	let location = useLocation();
	const [cPCurrent, setCPCurrent] = useState([null, null, null, null, null]);
	const [cPDiff, setCPDiff] = useState(['', '', '', '', '']);
	const [cPNew, setCPNew] = useState(['', '', '', '', '']);
	const [cPRec, setCPRec] = useState([]);

	const updateCPCurrent = (e, label) => {
		let currentcPInput = [...cPCurrent];
		if (label === 'Bonds') {currentcPInput[0] = Number(e.target.value);} 
			else if (label === 'Large Cap') {currentcPInput[1] = Number(e.target.value);} 
			else if (label === 'Mid Cap') {currentcPInput[2] = Number(e.target.value);} 
			else if (label === 'Foreign') {currentcPInput[3] = Number(e.target.value);} 
			else if (label === 'Small Cap') {currentcPInput[4] = Number(e.target.value);}
		setCPCurrent(currentcPInput);
	}

	const handleRebalance = () => {
		// HANDLE NEW AMOUNT AND DIFFERENCE AMOUNT CALCULATION

		const totalCurrent = cPCurrent.reduce((a, b) => a + b, 0);
		let diffArray = [];
		let newAmountArray = [];
		for (let i = 0; i < riskLabels.length; i++) {
			const newAmount = totalCurrent * location.state[i + 1] / 100;
			const diffAmount = newAmount - cPCurrent[i];
			newAmountArray.push(newAmount.toFixed(2));
			diffArray.push(diffAmount.toFixed(2));
		}
		setCPNew(newAmountArray);
		setCPDiff(diffArray);

		// HANDLE RECOMMENDATION
		for (let i = 0; i < diffArray.length; i++) {diffArray[i] = Number(diffArray[i]);}
		let diffArrayCopy = [...diffArray];
		let posArray = [];
		let negArray = [];
		let finalRec = [];
		diffArrayCopy.forEach((el, i) => {el >= 0 ? posArray.push(i) : negArray.push(i)});
		posArray.forEach(el => {
			while (Number(diffArrayCopy[el].toFixed(2))  > 0) {
				if (diffArrayCopy[el] + diffArrayCopy[negArray[0]] > 0) {
					finalRec.push(`•Transfer $${Math.abs(diffArrayCopy[negArray[0]])} from ${riskLabels[el]} to ${riskLabels[negArray[0]]}.`)
					diffArrayCopy[el] += diffArrayCopy[negArray[0]];
					diffArrayCopy[negArray[0]] = 0;
					negArray.shift();
				} else if (diffArrayCopy[el] + diffArrayCopy[negArray[0]] === 0) {
					finalRec.push(`•Transfer $${diffArrayCopy[el]} from ${riskLabels[el]} to ${riskLabels[negArray[0]]}.`);
					diffArrayCopy[el] = 0;
					diffArrayCopy[negArray[0]] = 0;
					negArray.shift();
				} else if (diffArrayCopy[el] + diffArrayCopy[negArray[0]] < 0) {
					finalRec.push(`•Transfer $${diffArrayCopy[el]} from ${riskLabels[el]} to ${riskLabels[negArray[0]]}.`);
					diffArrayCopy[negArray[0]] += diffArrayCopy[el];
					diffArrayCopy[el] = 0;
				}
			};
		});
		setCPRec(finalRec);
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
				<div className='calCPButton button' 
					onClick={handleRebalance} 
					style={cPCurrent.includes(null) ? {opacity: 0.4} : {opacity: 1}}
				>Rebalance</div>
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
						{riskLabels.map((label, i) => {
							return (
								<div key={i} className='calCPTableRow'>
									<label>{label} $:</label>
									<div className='calCPTableRowInputs'>
										<input 
											className='calCPTableRowCurrent' 
											type='text' 
											onChange={(e) => updateCPCurrent(e, label)}
										></input>
										<input 
											className='calCPTableRowDiff' 
											type='text' 
											value={(cPDiff[i] >= 0 && cPDiff[i] !== '') ? '+' + cPDiff[i] : cPDiff[i]}
											style={(cPDiff[i] >= 0 && cPDiff[i] !== '') ?{color: 'green'} : {color: 'red'}} 
											disabled
										></input>
										<input 
											className='calCPTableRowNew' 
											type='text' 
											value={cPNew[i]} 
											disabled
										></input>
									</div>
								</div>
							)
						})}
					</div>

					<div className='calCPTableRight'>
						<div className='calRecContainer'>
							{cPRec.map((rec, i) => {
								return (
									<div key={i}>{rec}</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Calculator;