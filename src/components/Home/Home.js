import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import './Home.css';

function Home() {
	return (
		<>
			<body>
				<div>Please Select A Risk Level For Your Investment Portfolio</div>

				<div>
					<div>
						<div>Low</div>
						<div>High</div>
					</div>
					<div>
						{}
					</div>
					<div>
						<div>Table</div>
						<div>button</div>
					</div>
				</div>

			</body>
		</>
	)
}

export default Home;