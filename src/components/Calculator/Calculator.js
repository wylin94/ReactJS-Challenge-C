import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from "react-router-dom";

import './Calculator.css';

function Calculator() {
	let location = useLocation();

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
							<th className='homeRiskTableCol'>Bonds</th>
							<th className='homeRiskTableCol'>Large Cap</th>
							<th className='homeRiskTableCol'>Mid Cap</th>
							<th className='homeRiskTableCol'>Foreign</th>
							<th className='homeRiskTableCol'>Small Cap</th>
						</tr>
						<tr>
							<td>{location.state[1]}%</td>
							<td>{location.state[2]}%</td>
							<td>{location.state[3]}%</td>
							<td>{location.state[4]}%</td>
							<td>{location.state[5]}%</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className='calCPContainer'>
				<div className='calCPLabel'>Please Enter Your Current Portfolio</div>
				<div className='calCPButton button'>Rebalance</div>
			</div>

			<div className='calCPTableContainer'>
				<div className='calCPTableLabel'>
					<label>Current Amount</label>
					<label>Difference</label>
					<label>New Amount</label>
					<label>Recommended Transfers</label>
				</div>
				<div className='calCPTableBody'></div>
			</div>

		</div>
	)
}

export default Calculator;