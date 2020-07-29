import { BaseView } from '@wp-g2/styles';
import React, { useEffect, useState } from 'react';

import * as styles from './SegmentedControl.styles';

function SegmentedControlBackdrop({
	containerRef,
	containerWidth,
	currentId,
	items,
	state,
	...props
}) {
	const [left, setLeft] = useState(0);
	const [width, setWidth] = useState(0);
	const [canAnimate, setCanAnimate] = useState(false);

	useEffect(() => {
		const containerNode = containerRef?.current;
		if (!containerNode) return;

		/**
		 * Workaround for Reakit
		 */
		const targetNode = containerNode.querySelector(
			`[data-value="${state}"]`,
		);
		if (!targetNode) return;

		const { x: parentX } = containerNode.getBoundingClientRect();
		const { width: offsetWidth, x } = targetNode.getBoundingClientRect();
		const offsetLeft = x - parentX;

		setLeft(offsetLeft);
		setWidth(offsetWidth);

		if (!canAnimate) {
			requestAnimationFrame(() => {
				setCanAnimate(true);
			});
		}
	}, [canAnimate, containerRef, containerWidth, state]);

	const cx = [styles.Backdrop];

	return (
		<BaseView
			cx={cx}
			role="presentation"
			style={{
				transform: `translateX(${left}px)`,
				transition: canAnimate ? null : 'none',
				width,
			}}
		/>
	);
}

export default SegmentedControlBackdrop;
