import { fetchPost } from '../../asyncRequests';
import { getSession } from './session';

const createUser = (newUser) => fetchPost('/api/v1/app/user', newUser)
	.then((r) => r.json())
	.then(() => getSession());

export default createUser;
