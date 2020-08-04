import { connect } from '@wp-g2/context';
import React, { useEffect } from 'react';
import { MemoryRouter } from 'react-router-dom';

import useNavigator from './useNavigator';
import useQuery from './useQuery';

function NavigatorRouter({ children, initialPath }) {
	const navigator = useNavigator() || {};
	const query = useQuery();
	const { location } = navigator;

	const getNextPath = () => {
		if (query && initialPath) {
			query.set(initialPath);
			const search = query.toString();
			const next = { ...location, search };

			return next;
		}
		return null;
	};

	// Redirect on load
	useEffect(() => {
		if (query && initialPath) {
			if (navigator.replace) {
				const next = getNextPath();

				navigator.replace(next);
			}
		}
	});

	// No parent router
	if (!location) {
		const initialEntry = initialPath ? [getNextPath()] : undefined;

		return (
			<MemoryRouter initialEntries={initialEntry}>
				{children}
			</MemoryRouter>
		);
	}

	return children;
}

export default connect(NavigatorRouter);
