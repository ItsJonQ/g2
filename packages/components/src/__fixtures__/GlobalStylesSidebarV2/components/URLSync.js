import queryString from 'query-string';
import React from 'react';

import { useNavigatorLocation } from '../../../index';

const PARAM = 'gssb';

export const useInitialPath = () => {
	const pathRef = React.useRef();
	try {
		const parsed = queryString.parse(window.location.search);
		const path = parsed[PARAM] || '';

		if (!pathRef.current) {
			pathRef.current = decodeURIComponent(path);
		}
	} catch (err) {
		if (!pathRef.current) {
			pathRef.current = '';
		}
	}

	return pathRef.current;
};

export const URLSync = () => {
	const { pathname } = useNavigatorLocation();
	React.useEffect(() => {
		try {
			const searchParams = new URLSearchParams(window.location.search);
			searchParams.set(PARAM, encodeURIComponent(pathname));
			const newRelativePathQuery =
				window.location.pathname + '?' + searchParams.toString();
			window.history.pushState(null, '', newRelativePathQuery);
		} catch (err) {}
	}, [pathname]);

	return null;
};
