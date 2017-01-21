import config from '../configs/config.json';

module.exports = {
	login(username, password) {
		const sendData = {
				method: 'POST',
				credentials: 'include',
		        headers: new Headers({
		          'Accept': 'application/json',
		          'Content-Type': 'application/json'
		        }),
		        body: JSON.stringify({ username: username, password: password})
			};

		return fetch(`${config.apiUrl}login`, sendData);
	},

	logout() {
		const sendData = {
			method: 'POST',
			credentials: 'include'
		};

		fetch(`${config.apiUrl}logout`, sendData)
			.then((response) => {
				if(response.status === 200) {
					delete localStorage.token;
				} else {
					throw new Error();
				}
			}).catch((error) => {
				console.log(error);
			});
	},

	register(username, password) {
		const sendData = {
				method: 'POST',
				credentials: 'include',
		        headers: new Headers({
		          'Accept': 'application/json',
		          'Content-Type': 'application/json'
		        }),
		        body: JSON.stringify({ username: username, password: password})
			};

		return new Promise((resolve, reject) => {
			fetch(`${config.apiUrl}users/create`, sendData)
				.then((response) => {
					if(response.status === 201) {
						resolve();
					} else {
						throw new Error();
					}
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	loggedIn() {
		return fetch(`${config.apiUrl}loggedIn`, {
			credentials: 'include'
		})
			.then((response) => response.json())
			.catch((error) => {
				return error;
			});
	}
};