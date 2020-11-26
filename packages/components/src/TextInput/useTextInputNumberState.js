import {
	add,
	is,
	normalizeArrowKey,
	roundClampString,
	subtract,
} from '@wp-g2/utils';
import React from 'react';

/**
 *
 * @param {object} options
 * @param {number} options.max
 * @param {number} options.min
 * @param {import('./useTextInputstate.utils').ShiftStepState} options.shiftStepStore
 * @param {import('./useTextInputState').TextInputState} options.store
 */
export const useNumberActions = ({ max, min, shiftStepStore, store }) => {
	const increment = React.useCallback(
		(/** @type {number} */ jumpStep = 0) => {
			const { increment, value } = store.getState();

			if (!is.numeric(value)) return;

			const { getShiftValue, step } = shiftStepStore.getState();
			const shiftStep = getShiftValue();
			const nextValue = add(jumpStep * step, shiftStep);

			const next = roundClampString(
				add(value, nextValue),
				min,
				max,
				shiftStep,
			);

			increment(next);
		},
		[max, min, shiftStepStore, store],
	);

	const decrement = React.useCallback(
		(/** @type {number} */ jumpStep = 0) => {
			const { decrement, value } = store.getState();

			if (!is.numeric(value)) return;

			const { getShiftValue, step } = shiftStepStore.getState();
			const shiftStep = getShiftValue();
			const nextValue = add(jumpStep * step, shiftStep);

			const next = roundClampString(
				subtract(value, nextValue),
				min,
				max,
				shiftStep,
			);

			decrement(next);
		},
		[max, min, shiftStepStore, store],
	);

	return {
		increment,
		decrement,
	};
};

export const useNumberKeyboardHandlers = ({
	decrement,
	increment,
	stopIfEventDefaultPrevented = true,
	store,
}) => {
	const keyboardHandlers = React.useMemo(
		() => ({
			ArrowUp(event) {
				if (!store.getState().isTypeNumeric) return;

				if (stopIfEventDefaultPrevented && event.isDefaultPrevented())
					return;

				event.preventDefault();

				increment();
			},
			ArrowDown(event) {
				if (!store.getState().isTypeNumeric) return;

				if (stopIfEventDefaultPrevented && event.isDefaultPrevented())
					return;

				event.preventDefault();

				decrement();
			},
		}),
		[decrement, increment, stopIfEventDefaultPrevented, store],
	);

	const handleOnKeyDown = React.useCallback(
		(event) => {
			const key = normalizeArrowKey(event);
			if (key && keyboardHandlers[key]) {
				keyboardHandlers[key](event);
			}
		},
		[keyboardHandlers],
	);

	return {
		onKeyDown: handleOnKeyDown,
	};
};
