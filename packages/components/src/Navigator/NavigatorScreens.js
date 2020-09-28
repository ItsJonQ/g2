import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { NavigatorView } from './Navigator.styles';
import NavigatorSwitch from './NavigatorSwitch';

function NavigatorScreens(props, forwardedRef) {
	const { children, ...otherProps } = useContextSystem(
		props,
		'NavigatorScreens',
	);

	return (
		<NavigatorView {...otherProps} ref={forwardedRef}>
			<NavigatorSwitch>{children}</NavigatorSwitch>
		</NavigatorView>
	);
}

export default contextConnect(NavigatorScreens, 'NavigatorScreens');
