const AUTH_TOKEN = 'auth-token';

export const getToken = () => {
	console.log("Auth token: ",AUTH_TOKEN);
	const token = localStorage.getItem(AUTH_TOKEN);
	return token;
}

export const setToken = token => {
	localStorage.setItem(AUTH_TOKEN, token);
}

export const deleteToken = () => {
	localStorage.removeItem(AUTH_TOKEN);
}