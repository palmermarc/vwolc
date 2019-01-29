import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
import OLC from '../core/OLC';

const history = createHistory();

function authLogout() {
	return {
		type: 'LOGOUT'
	};
};

function authLogin(user) {
	return {
		type: 'LOGIN',
		isLoggedIn: true,
		userId: user.id,
		role: user.role,
		username: user.username,
		email: user.email,
		token: user.token
	}
};

export function authHasErrors(error) {
	return {
		type: 'LOGIN_HAS_ERRORS',
		loginError: error
	}
}

export function authenticateUser(username, password){
	let loginData = {
		email: username,
		password: password
	};

	return (dispatch) => {
		return axios.post('//api.thedeathofcaine.com/users/authenticate', loginData ).then((response) => {
			localStorage.setItem('marcoPromoToken', response.data.token);
			localStorage.setItem('id', response.data.id);
			localStorage.setItem('username', response.data.username);
			localStorage.setItem('email', response.data.email);
			dispatch(authLogin(response.data));
			history.push('/areas/');
		}).catch((e) => {
			//let response = JSON.parse(e.response.request.response);
			dispatch(authHasErrors("Error: Wrong Username/Password"));
		});
	}
}

export function userLogOut() {
	return (dispatch) => {
		dispatch(authLogout());
	}
}

export function checkToken() {
	return function (dispatch) {
		OLC.get('/users/validate', {}, function (response) {
			if( response.data.status === 'success' ) {
				console.log("We should be logged in now...");
				localStorage.setItem('id', response.data.id);
				localStorage.setItem('username', response.data.username);
				localStorage.setItem('email', response.data.email);
				localStorage.setItem('role', response.data.role);
				dispatch(authLogin(response.data));
			} else {
				dispatch(authHasErrors(response.data.message));
				dispatch(userLogOut());
				history.push('/login/');
			}
		},function(e) {
			dispatch(authHasErrors(e.response.data.message));
			dispatch(userLogOut());
			history.push('/login/');
		});
	};

}