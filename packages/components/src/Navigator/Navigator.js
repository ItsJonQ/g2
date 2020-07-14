import { connect } from '@wp-g2/provider';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { NavigatorView } from './Navigator.styles';
import { NavigatorContext } from './Navigator.utils';
import NavigatorSwitch from './NavigatorSwitch';

function Navigator({
	animationDuration = 300,
	children,
	forwardedRef,
	initialPath,
	...props
}) {
	const contextValue = {
		animationDuration,
	};
	return (
		<NavigatorContext.Provider value={contextValue}>
			<NavigatorView {...props} ref={forwardedRef}>
				<MemoryRouter
					initialEntries={initialPath ? [initialPath] : undefined}
				>
					<NavigatorSwitch>{children}</NavigatorSwitch>
				</MemoryRouter>
			</NavigatorView>
		</NavigatorContext.Provider>
	);
}

export default connect(Navigator);
