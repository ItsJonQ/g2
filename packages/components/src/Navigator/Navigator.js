import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { NavigatorContext } from './Navigator.Context';
import NavigatorRouter from './NavigatorRouter';

function Navigator(props, forwardedRef) {
	const { animationDuration = 300, children, initialPath } = useContextSystem(
		props,
		'Navigator',
	);

	const contextProps = {
		animationDuration,
	};

	return (
		<NavigatorContext.Provider ref={forwardedRef} value={contextProps}>
			<NavigatorRouter initialPath={initialPath}>
				{children}
			</NavigatorRouter>
		</NavigatorContext.Provider>
	);
}

export default contextConnect(Navigator, 'Navigator');
