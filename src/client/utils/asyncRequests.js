/**
 * Error handler specifically designed for AJAX requests made to the backend's
 * REST API.
 */
export function ajaxErrHandler(res) {
	// Redirect to the Central Authentication System (CAS) login page if the
	// request was unauthorized.
	if (res.status === 401) {
		return res.json()
			.then((errDetails) => {
				// Compose the backend URL that should handle the redirect after
				// a successful login (/login?redirect={window.location.href}).
				const callbackUrl = new URL('/login', errDetails.serviceBase);
				callbackUrl.searchParams.set('redirect', window.location.href);

				// Insert the callback URL as the service.
				const ssoRedirectUrl = new URL(errDetails.ssoUrl);
				ssoRedirectUrl.searchParams.set('service', callbackUrl.href);
				window.location.href = ssoRedirectUrl.href;
				return null;
			});
	}

	// Redirect to the generic error view on 404s and 500s.
	if (res.status === 404 || res.status === 500) {
		window.location.href = `/${res.status}`;
		return null;
	}

	// Continue with the promise chain otherwise.
	return res;
}

/**
 * Send a GET request to the desired URL.
 */
export function fetchGet(url) {
	return fetch(url)
		.then(ajaxErrHandler);
}

/**
 * Send a DELETE request to the desired URL, with the body as a JSON-encoded
 * content.
 */
export function fetchDelete(url, body) {
	return fetch(url, {
		method: 'DELETE',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(ajaxErrHandler);
}

/**
 * Send a POST request to the desired URL, with the body as a JSON-encoded
 * content.
 */
export function fetchPost(url, body) {
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(ajaxErrHandler);
}
