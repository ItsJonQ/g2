import { useTabState } from '@wp-g2/a11y';
import { useResizeAware } from '@wp-g2/utils';
import React, { useRef } from 'react';

import { TabsContext } from './Tabs.Context';

function Tabs({ children, selectedId }) {
	const tab = useTabState({ selectedId });
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
