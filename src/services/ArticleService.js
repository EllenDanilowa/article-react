import config from '../configs/config.json';

module.exports = {
	addArticle(article) {
		const sendData = {
			method: 'POST', 
			credentials: 'include',
	        body: article
		};

		return fetch(`${config.apiUrl}articles`, sendData);
	}
};