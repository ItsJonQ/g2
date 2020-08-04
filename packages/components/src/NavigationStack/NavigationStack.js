import { connect } from '@wp-g2/provider';
import { useUpdateEffect } from '@wp-g2/utils';
import React, { useRef, useState } from 'react';
import { useTabState } from 'reakit/Tab';

import { NavigationStackContext } from './NavigationStack.Context';
import { usePositionPanels } from './NavigationStack.utils';
import NavigationStackList from './NavigationStackList';

function NavigationStackController() {
	usePositionPanels();
	return null;
}

function NavigationStack({
	autoHeight = true,
	children,
	initialHeight = 200,
	loop = false,
}) {
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
		<NavigationStackContext.Provider value={contextProps}>
			<NavigationStackController />
			<NavigationStackList />
			{children}
		</NavigationStackContext.Provider>
	);
}

export default connect(NavigationStack);
