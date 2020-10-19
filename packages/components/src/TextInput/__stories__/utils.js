import { useDrag } from '@wp-g2/gestures';
import { shallowCompare, useSubState } from '@wp-g2/substate';
import { is, noop } from '@wp-g2/utils';
import React from 'react';

import * as styles from '../TextInput.styles';

export function clearSelection() {
	/**
	 * Clear selection
	 */
	if (window.getSelection) {
		if (window.getSelection().empty) {
			// Chrome
			window.getSelection().empty();
		} else if (window.getSelection().removeAllRanges) {
			// Firefox
			window.getSelection().removeAllRanges();
		}
	} else if (document.selection) {
		// IE?
		document.selection.empty();
	}
}

export function normalizeArrowKey(event) {
	const { key, keyCode } = event;
	/* istanbul ignore next (ie) */
	if (keyCode >= 37 && keyCode <= 40 && key.indexOf('Arrow') !== 0) {
		return `Arrow${key}`;
	}
	return key;
}

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

export function mergeEvent(handler, extraHandler) {
	if (!is.function(handler) || !is.function(extraHandler)) return handler;

	return (event) => {
		handler(event);
		extraHandler(event);
	};
}

export function mergeEventHandlers(handlers = {}, extraHandlers = {}) {
	const mergedHandlers = { ...handlers };

	for (const [key, handler] of Object.entries(mergedHandlers)) {
		if (is.function(extraHandlers[key])) {
			mergedHandlers[key] = mergeEvent(handler, extraHandlers[key]);
		}
	}

	return mergedHandlers;
}

export function useControlledValue({ store, value: incomingValue }) {
	React.useEffect(() => {
		if (incomingValue === store.getState().value) return;
		store.getState().changeSync(incomingValue);
	}, [incomingValue, store]);

	const value = store((state) => state.value, shallowCompare);

	return {
		value,
	};
}

export function useDragHandlers({ decrement, increment, store }) {
	const [dragState, setDragState] = React.useState(false);
	const { dragAxis, isTypeNumeric } = store.getState();

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
					store.getState().commit();
				} else {
					decrement(boost);
					store.getState().commit();
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
