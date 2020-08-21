import { connect } from '@wp-g2/context';
import React, { useEffect } from 'react';

import { MemoryRouter } from './Router';

function NavigatorRouter({ children, initialPath }) {
	const { location } = navigator;
	// Redirect on load
	useEffect(() => {});

	// No parent router
	if (!location) {
		const initialEntry = initialPath ? [initialPath] : undefined;

		return (
			<MemoryRouter initialEntries={initialEntry}>
				{children}
			</MemoryRouter>
		);
	}

	return children;
}

export default connect(NavigatorRouter, 'NavigatorRouter');
