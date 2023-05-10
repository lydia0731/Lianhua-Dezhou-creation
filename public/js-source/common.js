function callApi(url, method, body) {
	console.log('[callApi]', url, method, body);

	return new Promise((resolve, reject) => {
		$.ajax({
			type: method,
			url: url,
			data: body,
            dataType: 'json',
			success: (response) => {
				console.log('[callApi success]', response);
				resolve(response);
			},
			error: (error) => {
				console.log('[callApi fail]', error);
				reject(error);
			},
			finally: () => {
				closemymask();
			}
		});	
	})	
}
