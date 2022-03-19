import React, { useState } from 'react';
import { useSelector } from "react-redux";
import './Calculator.css';

function Calculator() {
	const userRiskLevel = Object.values(useSelector(state => state.userRiskLevel));
	const riskLabels = ['Bonds', 'Large Cap', 'Mid Cap', 'Foreign', 'Small Cap'];
	const cpTableLabels = ['Current Amount', 'Difference', 'New Amount', 'Recommended Transfers'];
	const [userInput, setUserInput] = useState([null, null, null, null, null]);
	const [diff, setDiff] = useState(['', '', '', '', '']);
	const [newAmt, setNewAmt] = useState(['', '', '', '', '']);
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
		let posArray = [], negArray = [], finalRec = [];
		diffArrayCopy.forEach((el, i) => {el >= 0 ? posArray.push(i) : negArray.push(i)});
		posArray.forEach(el => {
			while (Number(diffArrayCopy[el].toFixed(2)) > 0.01) {
				if (diffArrayCopy[el] + diffArrayCopy[negArray[0]] > 0) {
					finalRec.push(`•Transfer $${Number(Math.abs(diffArrayCopy[negArray[0]]).toFixed(2))} from ${riskLabels[negArray[0]]} to ${riskLabels[el]}.`)
					diffArrayCopy[el] += diffArrayCopy[negArray[0]];
					diffArrayCopy[negArray[0]] = 0;
					negArray.shift();
				} else if (diffArrayCopy[el] + diffArrayCopy[negArray[0]] === 0) {
					finalRec.push(`•Transfer $${Number(diffArrayCopy[el].toFixed(2))} from ${riskLabels[negArray[0]]} to ${riskLabels[el]}.`);
					diffArrayCopy[el] = 0;
					diffArrayCopy[negArray[0]] = 0;
					negArray.shift();
				} else if (diffArrayCopy[el] + diffArrayCopy[negArray[0]] < 0) {
					finalRec.push(`•Transfer $${Number(diffArrayCopy[el].toFixed(2))} from ${riskLabels[negArray[0]]} to ${riskLabels[el]}.`);
					diffArrayCopy[negArray[0]] += diffArrayCopy[el];
					diffArrayCopy[el] = 0;
				}
			};
		});
		setRecTrans(finalRec);
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
					style={userInput.includes(null) ? {opacity: 0.4} : {opacity: 1}}
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