import * as queryString from 'query-string';

import { NAVIGATOR_KEY } from './Navigator.utils';
import useNavigator from './useNavigator';

function useQuery(search) {
	const navigator = useNavigator();
	const query = search || queryString.parse(navigator?.location?.search);

	const getKey = (key) => query[key];
	const setKey = (key, value) => (query[key] = value);

	const get = () => getKey(NAVIGATOR_KEY);
	const set = (next) => setKey(NAVIGATOR_KEY, next);
	const has = (next) => query[NAVIGATOR_KEY] === next;
	const is = has;
	const toString = () => queryString.stringify(query);

	return {
		get,
		getKey,
		has,
		is,
		set,
		setKey,
		toString,
	};
}

export default useQuery;
