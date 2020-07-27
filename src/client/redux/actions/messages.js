export const addMessage = (message) => ({ type: 'ADD_MESSAGE', payload: { message } });
export const removeMessage = (message) => ({ type: 'REMOVE_MESSAGE', payload: { message } });
export const addRequestError = (requestError) => (
	{
		type: 'ADD_MESSAGE',
		payload: {
			message: {
				error: requestError.codeName,
				message: requestError.message,
			},
		},
	}
);
