import { useResizeAware } from '@wp-g2/utils';
import React, { useRef } from 'react';
import { useTabState } from 'reakit';

import { TabsContext } from './Tabs.Context';

function Tabs(props) {
	const { children, ...otherProps } = props;
	const tab = useTabState(otherProps);
	const listRef = useRef();
	const [resizeListener, sizes] = useResizeAware();

	const contextProps = { listRef, resizeListener, sizes, tab };

	return (
		<TabsContext.Provider value={contextProps}>
			{children}
		</TabsContext.Provider>
	);
}

export default React.memo(Tabs);
