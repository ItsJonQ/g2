import React, { useEffect } from 'react';

import { useNavigatorHistory } from './Navigator.hooks';
import { MemoryRouter } from './Router';

function NavigatorRouter({ children, initialPath }) {
	const history = useNavigatorHistory();
	// Would only exist if nested within another <Navigator />
	const location = history?.location;

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

export default React.memo(NavigatorRouter);
