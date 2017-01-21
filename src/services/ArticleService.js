import config from '../configs/config.json';

module.exports = {
	addArticle(article) {
		const sendData = {
			method: 'POST', 
			credentials: 'include',
	        body: article//JSON.stringify(article)
		};

		return new Promise((resolve, reject) => {
			fetch(`${config.apiUrl}articles`, sendData)
			.then((response) => {
				resolve();
			})
			.catch((error) => {
				reject(error);
			});
		});
	}
};