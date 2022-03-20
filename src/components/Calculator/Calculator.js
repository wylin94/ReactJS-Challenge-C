import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './Calculator.css';

function Calculator() {
	const userRiskLevel = Object.values(useSelector(state => state.userRiskLevel));
	const riskLabels = ['Bonds', 'Large Cap', 'Mid Cap', 'Foreign', 'Small Cap'];
	const cpTableLabels = ['Current Amount', 'Difference', 'New Amount', 'Recommended Transfers'];
	const [userInput, setUserInput] = useState(new Array(5));
	const [diff, setDiff] = useState(new Array(5).fill(''));
	const [newAmt, setNewAmt] = useState(new Array(5).fill(''));
	const [recTrans, setRecTrans] = useState([]);
	const [inputError, setInputError] = useState(false);

	const updateUserInput = (e, label) => {
		let curUserInput = [...userInput];
		if (label === 'Bonds') {curUserInput[0] = Number(e.target.value);} 
			else if (label === 'Large Cap') {curUserInput[1] = Number(e.target.value);} 
			else if (label === 'Mid Cap') {curUserInput[2] = Number(e.target.value);} 
			else if (label === 'Foreign') {curUserInput[3] = Number(e.target.value);} 
			else if (label === 'Small Cap') {curUserInput[4] = Number(e.target.value);}
		setUserInput(curUserInput);
	}

	const handleRebalance = () => {
		// HANDLE NO RISK SELECTED
		if (userRiskLevel[0] === 0) return;
		if (userInput.includes(undefined)) return;

		// HANDLE INPUT ERROR
		for (let i = 0; i < userInput.length; i++) {
			if (isNaN(userInput[i]) || (userInput[i].toString().split('').includes('.') && userInput[i].toString().split('.')[1].length > 2)) {
				setRecTrans(['Please use only positive digits or zero when entering current amounts. Please enter all inputs correctly.']);
				setInputError(true);
				return;
			}
		}
		
		// HANDLE NEW AMOUNT AND DIFFERENCE CALCULATION
		setInputError(false);
		const totalCurrent = userInput.reduce((a, b) => a + b, 0);
		let diffArray = [];
		let newAmtArray = [];
		for (let i = 0; i < riskLabels.length; i++) {
			const newAmount = totalCurrent * userRiskLevel[i + 1] / 100;
			const diffAmount = newAmount - userInput[i];
			newAmtArray.push(Number(newAmount.toFixed(2)));
			diffArray.push(Number(diffAmount.toFixed(2)));
		}
		setNewAmt(newAmtArray);
		setDiff(diffArray);

		// HANDLE RECOMMENDATION
		for (let i = 0; i < diffArray.length; i++) {diffArray[i] = Number(diffArray[i]);}
		let diffArrayCopy = [...diffArray];
		let posIdx = [], negIdx = [], rec = [];
		diffArrayCopy.forEach((el, i) => {
			if (el > 0) {posIdx.push(i)}
				else if (el < 0) {negIdx.push(i)}
		});

		while (posIdx.length || negIdx.length) {
			// When there is a exact postive and negative amount
			let hash = {};
			posIdx.forEach(el => hash[diffArrayCopy[el]] = el);
			for (let i = 0; i < negIdx.length; i++) {
				const item = negIdx[i];
				if (hash[diffArrayCopy[item] * -1]) {
					rec.push(`• Transfer $${(Number(diffArrayCopy[item]) * -1).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} from ${riskLabels[negIdx[i]]} to ${riskLabels[hash[diffArrayCopy[item] * -1]]}`);
					let hashIndex = diffArrayCopy[item] * -1;
					diffArrayCopy[hash[diffArrayCopy[item] * -1]] = null;
					diffArrayCopy[item] = null;
					posIdx.splice(posIdx.indexOf(hash[diffArrayCopy[item] * -1]), 1);
					negIdx.splice(i, 1);
					delete hash[hashIndex];
					i -= 1;
				} 
			}
			if (posIdx.length === 0 && negIdx.length === 0) break;

			// When there is no exact postive and negative amount
			posIdx = posIdx.sort((a, b) => diffArrayCopy[a] - diffArrayCopy[b]);
			negIdx = negIdx.sort((a, b) => diffArrayCopy[b] - diffArrayCopy[a]);
			let largestNum = diffArrayCopy[posIdx[posIdx.length - 1]];
			let smallestNum = diffArrayCopy[negIdx[negIdx.length - 1]];
			if (largestNum + smallestNum > 0) {
				rec.push(`• Transfer $${Number(smallestNum * -1).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} from ${riskLabels[negIdx[negIdx.length - 1]]} to ${riskLabels[posIdx[posIdx.length - 1]]}`);
				diffArrayCopy[posIdx[posIdx.length - 1]] += smallestNum;
				if (diffArrayCopy[posIdx[posIdx.length - 1]] < 0.011) {
					diffArrayCopy[posIdx[posIdx.length - 1]] = null;
					posIdx.pop();
				}
				diffArrayCopy[negIdx[negIdx.length - 1]] = null;
				negIdx.pop();
			} else {
				rec.push(`• Transfer $${Number(largestNum).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} from ${riskLabels[negIdx[negIdx.length - 1]]} to ${riskLabels[posIdx[posIdx.length - 1]]}`);
				diffArrayCopy[negIdx[negIdx.length - 1]] += largestNum;
				if (diffArrayCopy[negIdx[negIdx.length - 1]] > -0.011) {
					diffArrayCopy[negIdx[negIdx.length - 1]] = null;
					negIdx.pop();
				}
				diffArrayCopy[posIdx[posIdx.length - 1]] = null;
				posIdx.pop();
			}
		}
		setRecTrans(rec);
	}

	return (
		<div className='calWrapper'>
			<div className='calLabel'>Personalized Portfolio</div>
			<div className='calRiskLevelLabelContainer'>
				<div className='calRiskLevelLabel'>Risk Level {userRiskLevel[0]}</div>
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
									<td key={label}>{userRiskLevel[i + 1]}%</td>
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
					style={userInput.includes(undefined) ? {opacity: 0.4, cursor: 'default'} : {opacity: 1}}
				>Rebalance</div>
			</div>
			<div className='calCPTableContainer'>
				<div className='calCPTableLabel'>
					{cpTableLabels.map(label => {
						return (
							<label key={label}>{label}</label>)
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
											onChange={(e) => updateUserInput(e, label)}
										></input>
										<input 
											className='calCPTableRowDiff' 
											type='text' 
											value={(diff[i] >= 0 && diff[i] !== '') ? `+${diff[i]}` : diff[i]}
											style={(diff[i] >= 0 && diff[i] !== '') ? {color: 'green'} : {color: 'red'}} 
											disabled
										></input>
										<input 
											className='calCPTableRowNew' 
											type='text' 
											value={newAmt[i]} 
											disabled
										></input>
									</div>
								</div>
							)
						})}
					</div>
					<div className='calCPTableRight'>
						<div className='calRecContainer' style={(inputError) ? {color: 'red'} : {color: 'black'}}>
							{recTrans.map((rec, i) => {
								return (
									<div key={i} className='calRec'>{rec}</div>
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