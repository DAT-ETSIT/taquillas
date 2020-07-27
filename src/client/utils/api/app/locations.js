import { fetchGet } from '../../asyncRequests';
import setLocations from '../../../redux/actions/locations';
import store from '../../../redux/store';

const { dispatch } = store;

const getLocations = () => fetchGet('/api/v1/app/locations')
	.then((r) => r.json())
	.then((locations) => dispatch(setLocations(locations)));

export default getLocations;
