import initialState from '../store/InitialState';

export function areas( state = initialState, action ) {
	let newState = Object.assign({}, state);

	switch( action.type ) {
		case 'areas':
			newState.areas = action.areas;
			console.log(newState);
			return newState;
		case 'ACTIVE_AREA':
			newState.activeArea = action.areaId;
			return newState;
		default:
			return state;
	}
}