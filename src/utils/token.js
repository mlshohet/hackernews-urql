const AUTH_TOKEN = 'auth-token';

export const getToken = () => {
	return localStorage.getItem(AUTH_TOKEN);
}

export const setToken = token => {
	localStorage.setItem(AUTH_TOKEN, token);
}

export const deleteToken = () => {
	localStorage.removeItem(AUTH_TOKEN);
}