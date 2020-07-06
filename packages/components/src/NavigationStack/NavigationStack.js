import { connect } from '@g2/provider';
import { useUpdateEffect } from '@g2/utils';
import React, { useRef, useState } from 'react';
import { useTabState } from 'reakit/Tab';

import {
	NavigationStackContext,
	usePositionPanels,
} from './NavigationStack.utils';
import NavigationStackList from './NavigationStackList';

function NavigationStackController() {
	usePositionPanels();
	return null;
}

function NavigationStack({ children, initialHeight = 200, loop = false }) {
	const tab = useTabState({ loop });
	const [__isRendered, setIsRendered] = useState(false);
	const containerRef = useRef();

	useUpdateEffect(() => {
		if (tab.items.length) {
			setIsRendered(true);
		}
	}, [tab]);

	const contextValue = {
		__isRendered,
		containerRef,
		tab,
	};

	return (
		<NavigationStackContext.Provider value={contextValue}>
			<NavigationStackController />
			<NavigationStackList />
			{children}
		</NavigationStackContext.Provider>
	);
}

export default connect(NavigationStack);
