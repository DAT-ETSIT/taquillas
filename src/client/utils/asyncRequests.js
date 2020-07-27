class RequestError extends Error {
	constructor(statusCode, codeName, message = 'Bad request') {
		super(message);
		this.statusCode = statusCode;
		this.codeName = codeName;
	}
}
/**
 * Error handler specifically designed for AJAX requests made to the backend's
 * REST API.
 */
export const ajaxErrHandler = (res) => {
	// Redirect to the Central Authentication System (CAS) login page if the
	// request was unauthorized.
	if (res.status === 401) {
		window.location.href = `/api/v1/app/login?redirect=${window.location.pathname}`;
		return {};
	}

	// Throw RequestError if something goes wrong with the request
	if (res.status >= 400) {
		return res.json().then((response) => {
			if ('error' in response && 'message' in response) {
				throw new RequestError(res.status, response.error, response.message);
			} else {
				// Log unexpected response.
				console.log(response);
				throw new RequestError(res.status, 'bad_request', 'Error procesando su solicitud');
			}
		});
	}

	// Continue with the promise chain otherwise.
	return res;
};

/**
 * Send a GET request to the desired URL.
 */
export const fetchGet = (url) => fetch(url).then(ajaxErrHandler);

/**
 * Send a DELETE request to the desired URL, with the body as a JSON-encoded
 * content.
 */
export const fetchDelete = (url, body = {}) => fetch(
	url,
	{
		method: 'DELETE',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
		},
	},
).then(ajaxErrHandler);

/**
 * Send a POST request to the desired URL, with the body as a JSON-encoded
 * content.
 */
export const fetchPost = (url, body = {}) => fetch(
	url,
	{
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
		},
	},
).then(ajaxErrHandler);
