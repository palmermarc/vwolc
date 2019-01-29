import initialState from '../store/InitialState';

export function user(state = initialState, action) {

	let newState = Object.assign({}, state);

	switch (action.type) {
		case 'LOGOUT':
			newState.isLoggedIn = false;
			newState.id = null;
			newState.username = null;
			newState.email = null;
			newState.role = null;
			newState.token = null;
			sessionStorage.clear();
			return newState;
		case 'LOGIN_HAS_ERRORS':
			newState.isLoggedIn = false;
			newState.loginHasErrors = true;
			newState.loginError = action.loginError;
			return newState;
		case 'LOGIN':
			newState.isLoggedIn = true;
			newState.loginHasErrors = false;
			newState.id = action.userId;
			newState.username = action.username;
			newState.role = action.role;
			newState.email = action.email;
			newState.token = action.token;
			return newState;
		default:
			return state;
	}
}