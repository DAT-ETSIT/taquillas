import { fetchGet, fetchDelete } from '../asyncRequests';
import setSession from '../../redux/actions/session';
import store from '../../redux/store';

const { dispatch } = store;

export const getSession = () => fetchGet('/api/v1/session')
	.then((r) => r.json())
	.then((session) => dispatch(setSession(session)));

export const logOut = () => fetchDelete('/api/v1/session')
	.then((r) => r.json())
	.then((session) => dispatch(setSession(session)));
