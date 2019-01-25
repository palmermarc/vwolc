import initialState from '../store/InitialState';

export function user(state = initialState, action) {

	let newState = Object.assign({}, state);

	switch (action.type) {
		case 'LOGOUT':
			newState.isLoggedIn = false;
			newState.userId = null;
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
			newState.userId = user.userId;
			newState.username = user.username;
			newState.role = user.role;
			newState.email = user.email;
			newState.token = user.token;
			return newState;
		default:
			return state;
	}
}