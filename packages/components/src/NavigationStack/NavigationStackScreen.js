import { TabPanel } from '@wp-g2/a11y';
import { connect } from '@wp-g2/provider';
import { mergeRefs } from '@wp-g2/utils';
import React, { useRef } from 'react';

import { View } from '../View';
import { useNavigationStackContext } from './NavigationStack.Context';
import { useCurrentPanelNode } from './NavigationStack.utils';

function NavigationStackScreen({ children, forwardedRef, ...props }) {
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
			{...props}
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

export default connect(NavigationStackScreen);
