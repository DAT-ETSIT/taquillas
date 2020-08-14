import { fetchGet } from '../asyncRequests';
import setLocations from '../../redux/actions/locations';
import store from '../../redux/store';

const { dispatch } = store;

const getAvailableLocations = () => fetchGet('/api/v1/locations/available')
	.then((r) => r.json())
	.then((locations) => dispatch(setLocations(locations)));

export default getAvailableLocations;
