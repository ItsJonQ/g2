import React from 'react';

import HistoryContext from './HistoryContext';
import matchPath from './matchPath';
import RouterContext from './RouterContext';

const useContext = React.useContext;

export function useHistory() {
	return useContext(HistoryContext);
}

export function useLocation() {
	return useContext(RouterContext).location;
}

export function useParams() {
	const match = useContext(RouterContext).match;
	return match ? match.params : {};
}

export function useRouteMatch(path) {
	const location = useLocation();
	const match = useContext(RouterContext).match;
	return path ? matchPath(location.pathname, path) : match;
}
