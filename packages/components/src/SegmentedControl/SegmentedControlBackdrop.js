import { ns } from '@wp-g2/context';
import React, { useEffect, useState } from 'react';

import * as styles from './SegmentedControl.styles';

const { BackdropView } = styles;

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
		const borderWidth = 1;
		const offsetLeft = x - parentX - borderWidth;

		setLeft(offsetLeft);
		setWidth(offsetWidth);

		if (!canAnimate) {
			requestAnimationFrame(() => {
				setCanAnimate(true);
			});
		}
	}, [canAnimate, containerRef, containerWidth, state]);

	return (
		<BackdropView
			role="presentation"
			{...ns('SegmentedControlBackdrop')}
			style={{
				transform: `translateX(${left}px)`,
				transition: canAnimate ? null : 'none',
				width,
			}}
		/>
	);
}

export default SegmentedControlBackdrop;
