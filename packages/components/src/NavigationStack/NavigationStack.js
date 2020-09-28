import { useTabState } from '@wp-g2/a11y';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { useUpdateEffect } from '@wp-g2/utils';
import React, { useRef, useState } from 'react';

import { NavigationStackContext } from './NavigationStack.Context';
import { usePositionPanels } from './NavigationStack.utils';
import NavigationStackList from './NavigationStackList';

function NavigationStackController() {
	usePositionPanels();
	return null;
}

function NavigationStack(props, forwardedRef) {
	const {
		autoHeight = true,
		children,
		initialHeight = 200,
		loop = false,
	} = useContextSystem(props, 'NavigatorStack');

	const tab = useTabState({ loop });
	const [__isRendered, setIsRendered] = useState(false);
	const containerRef = useRef();

	useUpdateEffect(() => {
		if (tab.items.length) {
			setIsRendered(true);
		}
	}, [tab]);

	const contextProps = {
		__isRendered,
		autoHeight,
		containerRef,
		initialHeight,
		tab,
	};

	return (
		<NavigationStackContext.Provider
			ref={forwardedRef}
			value={contextProps}
		>
			<NavigationStackController />
			<NavigationStackList />
			{children}
		</NavigationStackContext.Provider>
	);
}

export default contextConnect(NavigationStack, 'NavigationStack');
