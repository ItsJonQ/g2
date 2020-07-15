import { connect } from '@wp-g2/provider';
import React from 'react';

import { MemoryRouter } from './Router';

function NavigatorRouter({ children, initialPath }) {
	return (
		<MemoryRouter initialEntries={initialPath ? [initialPath] : undefined}>
			{children}
		</MemoryRouter>
	);
}

export default connect(NavigatorRouter);
