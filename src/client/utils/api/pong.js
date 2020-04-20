import { fetchGet } from '../asyncRequests';
import { receivePong } from '../../redux/actions/pong';

import store from '../../redux/store';

const { dispatch } = store;

const doPing = () => fetchGet('/api/v1/ping')
	.then((r) => r.json())
	.then(() => dispatch(receivePong()));

export default doPing;
