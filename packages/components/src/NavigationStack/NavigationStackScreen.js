import { TabPanel } from '@wp-g2/a11y';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { mergeRefs } from '@wp-g2/utils';
import React, { useRef } from 'react';

import { View } from '../View';
import { useNavigationStackContext } from './NavigationStack.Context';
import { useCurrentPanelNode } from './NavigationStack.utils';

function NavigationStackScreen(props, forwardedRef) {
	const { children, ...otherProps } = useContextSystem(
		props,
		'NavigationStackScreen',
	);
	const { __isRendered, tab } = useNavigationStackContext();
	const tabRef = useRef();
	const nodeRef = useRef();
	const currentPanelNode = useCurrentPanelNode();
	const isCurrent = currentPanelNode === tabRef.current;

	let opacity = 0;

	if (__isRendered && isCurrent) {
		opacity = 1;
	}

	return (
		<TabPanel
			{...tab}
			{...otherProps}
			ref={mergeRefs([tabRef, forwardedRef])}
			style={{
				display: 'block',
				opacity,
				outline: 'none',
				transition: 'opacity 300ms ease-in-out',
			}}
		>
			<View ref={nodeRef}>{children}</View>
		</TabPanel>
	);
}

export default contextConnect(NavigationStackScreen, 'NavigationStackScreen');
