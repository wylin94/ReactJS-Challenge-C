import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import './Home.css';

function Home() {
	return (
		<>
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
						{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(risk => {
							return (
								<div className='homeRiskSelectorLi' key={risk}>{risk}</div>
							)
						})}
					</div>
					<div className='homeRiskSelectorButton'>Continue</div>
				</div>

				<div>
					<div>Table</div>
					<div>button</div>
				</div>

			</body>
		</>
	)
}

export default Home;