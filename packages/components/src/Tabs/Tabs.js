import { connect } from '@wp-g2/provider';
import { useResizeAware } from '@wp-g2/utils';
import React, { useRef } from 'react';
import { useTabState } from 'reakit/Tab';

import { TabsContext } from './Tabs.Context';

function Tabs({ children, selectedId }) {
	const tab = useTabState({ selectedId });
	const listRef = useRef();
	const [resizeListener, sizes] = useResizeAware();

	const contextValue = { listRef, resizeListener, sizes, tab };

	return (
		<TabsContext.Provider value={contextValue}>
			{children}
		</TabsContext.Provider>
	);
}

export default connect(Tabs);
