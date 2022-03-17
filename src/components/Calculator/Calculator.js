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
		console.log(diffArray)
		for (let i = 0; i < diffArray.length; i++) {
			diffArray[i] = Number(diffArray[i]);
		};
		console.log(diffArray)
		let posArray = [];
		let negArray = [];
		diffArray.forEach((el, i) => {el >= 0 ? posArray.push(i) : negArray.push(i)});
		console.log('diffArray', diffArray)
		console.log('posArray', posArray)
		console.log('negArray', negArray)
		posArray.forEach(el => {
			while (diffArray[el] > 0) {
				if (diffArray[el] + diffArray[negArray[0]] > 0) {
					let temp = [...cPRec];
					temp.push('•Transfer $' + Math.abs(diffArray[negArray[0]]) + ' from ' + riskLabels[el] + ' to ' + riskLabels[negArray[0]])
					setCPRec(temp);
					diffArray[el] += diffArray[negArray[0]];
					diffArray[negArray[0]] = 0;
					negArray.shift();
					console.log(1)
				} else if (diffArray[el] + diffArray[negArray[0]] === 0) {
					let temp = [...cPRec];
					temp.push('•Transfer $' + diffArray[el] + ' from ' + riskLabels[el] + ' to ' + riskLabels[negArray[0]]);
					setCPRec(temp);
					diffArray[el] = 0;
					diffArray[negArray[0]] = 0;
					negArray.shift();
					console.log(2)
				} else if (diffArray[el] + diffArray[negArray[0]] < 0) {
					let temp = [...cPRec];
					temp.push('•Transfer $' + diffArray[el] + ' from ' + riskLabels[el] + ' to ' + riskLabels[negArray[0]]);
					setCPRec(temp);
					diffArray[negArray[0]] += diffArray[el];
					diffArray[el] = 0;
					console.log(3)
				}
			}
		});
		console.log(cPRec)
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
									<div key={i}>hi</div>
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