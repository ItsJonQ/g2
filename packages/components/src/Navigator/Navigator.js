import { connect } from '@wp-g2/provider';
import React from 'react';

import { NavigatorView } from './Navigator.styles';
import { NavigatorContext } from './Navigator.utils';
import NavigatorRouter from './NavigatorRouter';
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
				<NavigatorRouter initialPath={initialPath}>
					<NavigatorSwitch>{children}</NavigatorSwitch>
				</NavigatorRouter>
			</NavigatorView>
		</NavigatorContext.Provider>
	);
}

export default connect(Navigator);
