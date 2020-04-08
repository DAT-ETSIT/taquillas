export const PONG = 'PONG';

export function receivePong() {
	return { type: PONG, payload: {} };
}
