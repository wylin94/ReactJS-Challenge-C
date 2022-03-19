const LOAD = 'riskLevel/LOAD'

const load = riskLevel => ({
	type: LOAD,
	riskLevel
});

export const setUserRiskLevel = (riskLevel) => (dispatch) => {
	dispatch(load(riskLevel));
	return riskLevel;
}

const setUserRiskLevelReducer = (state = {risk: 0, bonds: 0, large: 0, mid: 0, foreign: 0, small: 0}, action) => {
	switch (action.type) {
		case LOAD:
			return action.riskLevel;
		default:
			return state;
	}
}

export default setUserRiskLevelReducer;