const LOAD = 'riskLevel/LOAD'

const load = riskLevel => ({
	type: LOAD,
	riskLevel
});

export const setUserRiskLevel = (riskLevel) => (dispatch) => {
	dispatch(load(riskLevel));
	return riskLevel;
}

const setUserRiskLevelReducer = (state = 0, action) => {
	switch (action.type) {
		case LOAD:
			return action.riskLevel;
		default:
			return state;
	}
}

export default setUserRiskLevelReducer;