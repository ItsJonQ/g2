import { shallowCompare, useSubState } from '@wp-g2/substate';
import { clearSelection, noop, useUpdateEffect } from '@wp-g2/utils';
import React from 'react';
import { useDrag } from 'react-use-gesture';

import * as styles from './TextInput.styles';

export const useShiftStepState = ({ shiftStep = 10, step = 1 }) => {
	const shiftStepStore = useSubState(() => ({
		isShiftKey: false,
		step,
		shiftStep,

		// Selectors
		getShiftValue: () => {
			const isShiftKey = shiftStepStore.getState().isShiftKey;
			return isShiftKey ? shiftStep * step : step;
		},
	}));

	React.useEffect(() => {
		const handleOnKeyPress = (event) => {
			const { shiftKey } = event;
			if (shiftStepStore.getState().isShiftKey !== shiftKey) {
				shiftStepStore.setState({
					isShiftKey: shiftKey,
				});
			}
		};

		window.addEventListener('keydown', handleOnKeyPress);
		window.addEventListener('keyup', handleOnKeyPress);

		return () => {
			window.removeEventListener('keydown', handleOnKeyPress);
			window.removeEventListener('keyup', handleOnKeyPress);
		};
	}, [shiftStepStore]);

	const isShiftKey = shiftStepStore(
		(state) => state.isShiftKey,
		shallowCompare,
	);

	return {
		shiftStepStore,
		isShiftKey,
	};
};

export function useControlledValue({ store, value: incomingValue }) {
	useUpdateEffect(() => {
		if (incomingValue === store.getState().value) return;
		store.getState().changeSync(incomingValue);
	}, [incomingValue, store]);

	const value = store((state) => state.value, shallowCompare);

	return {
		value,
	};
}

export function useBaseDragHandlers({
	decrement,
	dragAxis,
	enableTouchGestures = false,
	increment,
	isTypeNumeric = true,
}) {
	const [dragState, setDragState] = React.useState(false);

	const dragRaf = React.useRef();
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
			cancelAnimationFrame(dragRaf.current);
		};
	}, []);

	const dragGestures = useDrag(
		(state) => {
			const [x, y] = state.delta;
			setDragState(state.dragging ? state.axis : false);

			const isMovementY = state.axis === 'y';
			let movement = isMovementY ? y * -1 : x;

			if (Math.abs(movement) === 0) return;

			const shouldIncrement = movement > 0;

			let boost = movement === threshold ? 0 : movement;
			boost = shouldIncrement ? boost : boost * -1;
			boost = boost - 1;

			if (dragRaf.current) {
				cancelAnimationFrame(dragRaf.current);
			}

			dragRaf.current = requestAnimationFrame(() => {
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

	if (!enableTouchGestures) {
		gestures.onTouchStart = noop;
	}

	return gestures;
}

export function useDragHandlers({
	decrement,
	enableTouchGestures,
	increment,
	store,
}) {
	const { dragAxis, isTypeNumeric } = store.getState();

	return useBaseDragHandlers({
		enableTouchGestures,
		dragAxis,
		isTypeNumeric,
		increment,
		decrement,
	});
}
