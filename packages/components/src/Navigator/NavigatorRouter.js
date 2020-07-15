import { connect } from '@wp-g2/provider';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

function NavigatorRouter({ children, initialPath, ...props }) {
	return (
		<MemoryRouter
			initialEntries={initialPath ? [initialPath] : undefined}
			{...props}
		>
			{children}
		</MemoryRouter>
	);
}

export default connect(NavigatorRouter);
