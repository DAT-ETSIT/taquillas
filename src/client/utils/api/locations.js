import {
	fetchGet, fetchPost,
	fetchDelete, fetchPut,
} from '../asyncRequests';
import setLocations from '../../redux/actions/locations';
import store from '../../redux/store';

const { dispatch } = store;

export const getAvailableLocations = () => fetchGet('/api/v1/locations/available')
	.then((r) => r.json())
	.then((locations) => dispatch(setLocations(locations)));

export const getAllLocations = () => fetchGet('/api/v1/locations')
	.then((r) => r.json());

export const createLocation = (newLocation) => fetchPost('/api/v1/locations', newLocation)
	.then((r) => r.json());

export const updateLocation = (newLocation, oldLocation) => {
	const url = `/api/v1/locations/${oldLocation.id}`;
	return fetchPut(url, newLocation)
		.then((r) => r.json())
		.then((location) => location);
};

export const removeLocation = (location) => {
	const url = `/api/v1/locations/${location.id}`;
	return fetchDelete(url, {})
		.then((r) => r.json());
};
