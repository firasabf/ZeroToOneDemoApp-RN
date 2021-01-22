import { EMPLOYEE_SAVE_SUCCESS, HUMIDITY_LEVEL, WATER_LEVEL, UV_RADIATIONS, WIND_DATA, ON_SYSTEM } from '../actions/types';

const INITIAL_STATE = { data: 0, humidityLevel: 0, waterLevel: 0, uvradiations: 0, windData: 0, onSystem: true };

export default (state = INITIAL_STATE, action) => {
	console.log(action, action.payload);

	switch (action.type) {
		case EMPLOYEE_SAVE_SUCCESS: 
			return { ...state, data: action.payload };
		case HUMIDITY_LEVEL:
			return { ...state, humidityLevel: action.payload };
		case WATER_LEVEL: 
			return { ...state, waterLevel: action.payload };
		case UV_RADIATIONS:
			return { ...state, uvradiations: action.payload };
		case WIND_DATA:
			return { ...state, windData: action.payload };
		case ON_SYSTEM:
			return { ...state, OnSystem: action.payload };
		default: 
		return state;
	}
};