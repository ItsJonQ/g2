import React, { useEffect, useState } from 'react';

import { useTabsContext } from './Tabs.Context';
import * as styles from './Tabs.styles';

const { TabIndicatorView } = styles;

function TabIndicator() {
	const { listRef: containerRef, sizes, tab } = useTabsContext();
	const [left, setLeft] = useState(0);
	const [width, setWidth] = useState(0);
	const [canAnimate, setCanAnimate] = useState(false);
	const containerWidth = sizes?.width;

	useEffect(() => {
		const containerNode = containerRef?.current;
		if (!containerNode) return;

		/**
		 * Workaround for Reakit
		 */

		const { items, selectedId } = tab;
		const currentItem = items.find((item) => item.id === selectedId);
		const targetNode = currentItem?.ref?.current;
		if (!targetNode) return;

		const { x: parentX } = containerNode.getBoundingClientRect();
		const { width: offsetWidth, x } = targetNode.getBoundingClientRect();
		const offsetLeft = x - parentX;

		setLeft(offsetLeft);
		setWidth(offsetWidth);

		if (!canAnimate) {
			requestAnimationFrame(() => {
				if (offsetWidth) {
					setCanAnimate(true);
				}
			});
		}
	}, [canAnimate, containerRef, containerWidth, tab]);

	const viewStyle = {
		transform: `translateX(${left}px)`,
		transition: canAnimate ? null : 'none',
		width,
	};

	return <TabIndicatorView role="presentation" style={viewStyle} />;
}

export default React.memo(TabIndicator);
