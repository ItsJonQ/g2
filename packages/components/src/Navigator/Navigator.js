import { connect } from '@wp-g2/context';
import React from 'react';

import { NavigatorContext } from './Navigator.Context';
import NavigatorRouter from './NavigatorRouter';

function Navigator({
	animationDuration = 300,
	children,
	forwardedRef,
	initialPath,
}) {
	const contextProps = {
		animationDuration,
	};
	return (
		<NavigatorContext.Provider value={contextProps}>
			<NavigatorRouter initialPath={initialPath}>
				{children}
			</NavigatorRouter>
		</NavigatorContext.Provider>
	);
}

export default connect(Navigator, 'Navigator');
