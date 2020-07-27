import { fetchPost } from '../../asyncRequests';

const requestLocker = (locationId, lockerId) => {
	const requestLockerUrl = `/api/v1/app/request/locker/${lockerId}`;
	const requestAnyUrl = `/api/v1/app/request/any/${locationId}`;
	const url = lockerId >= 0 ? requestLockerUrl : requestAnyUrl;
	return fetchPost(url)
		.then((r) => r.json());
};

export default requestLocker;
