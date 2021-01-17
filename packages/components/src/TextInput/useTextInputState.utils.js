import { clearSelection } from '@wp-g2/utils';
import { noop } from 'lodash';
import React from 'react';
import { useDrag } from 'react-use-gesture';

import * as styles from './TextInput.styles';

export function useBaseDragHandlers({
	decrement,
	dragAxis,
	increment,
	isTypeNumeric = true,
}) {
	const [dragState, setDragState] = React.useState(
		/** @type {undefined | 'x' | 'y'} */ (undefined),
	);

	/** @type {import('react').MutableRefObject<number | undefined>} */
	const dragRef = React.useRef();
	const threshold = 10;

	React.useEffect(() => {
		if (dragState) {
			clearSelection();

			if (dragState === 'x') {
				document.documentElement.classList.add(styles.globalDraggableX);
				document.documentElement.classList.remove(
					styles.globalDraggableY,
				);
			} else {
				document.documentElement.classList.remove(
					styles.globalDraggableX,
				);
				document.documentElement.classList.add(styles.globalDraggableY);
			}
		} else {
			document.documentElement.classList.remove(styles.globalDraggableX);
			document.documentElement.classList.remove(styles.globalDraggableY);
		}
	}, [dragState]);

	React.useEffect(() => {
		return () => {
			if (!dragRef.current) return;

			cancelAnimationFrame(dragRef.current);
		};
	}, []);

	const dragGestures = useDrag(
		(state) => {
			const [x, y] = state.delta;
			setDragState(state.dragging ? state.axis : undefined);

			const isMovementY = state.axis === 'y';
			let movement = isMovementY ? y * -1 : x;

			if (Math.abs(movement) === 0) return;

			const shouldIncrement = movement > 0;

			let boost = movement === threshold ? 0 : movement;
			boost = shouldIncrement ? boost : boost * -1;
			boost = boost - 1;

			if (dragRef.current) {
				cancelAnimationFrame(dragRef.current);
			}

			dragRef.current = requestAnimationFrame(() => {
				if (shouldIncrement) {
					increment(boost);
				} else {
					decrement(boost);
				}
			});
		},
		{ axis: dragAxis, threshold },
	);

	const gestures = isTypeNumeric
		? dragGestures()
		: { onMouseDown: noop, onTouchStart: noop };

	return gestures;
}
