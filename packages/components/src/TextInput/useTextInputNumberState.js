import {
	add,
	is,
	normalizeArrowKey,
	roundClampString,
	subtract,
} from '@wp-g2/utils';
import React from 'react';

import { useDragHandlers } from './useTextInputState.utils';

export const useNumberActions = ({ max, min, shiftStepStore, store }) => {
	const increment = React.useCallback(
		(jumpStep = 0) => {
			const { increment, value } = store.getState();

			if (!is.numeric(value)) return;

			const shiftStep = shiftStepStore.getState().getShiftValue();
			const nextValue = add(jumpStep, shiftStep);

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
		(jumpStep = 0) => {
			const { decrement, value } = store.getState();

			if (!is.numeric(value)) return;

			const shiftStep = shiftStepStore.getState().getShiftValue();
			const nextValue = add(jumpStep, shiftStep);

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

export const useNumberKeyboardHandlers = ({ decrement, increment }) => {
	const keyboardHandlers = React.useMemo(
		() => ({
			ArrowUp(event) {
				if (event.isDefaultPrevented()) return;
				event.preventDefault();

				increment();
			},
			ArrowDown(event) {
				if (event.isDefaultPrevented()) return;
				event.preventDefault();

				decrement();
			},
		}),
		[decrement, increment],
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

export const useNumberEventHandlers = ({ decrement, increment, store }) => {
	const dragHandlers = useDragHandlers({ store, decrement, increment });

	const keyboardHandlers = useNumberKeyboardHandlers({
		decrement,
		increment,
	});

	return {
		...dragHandlers,
		...keyboardHandlers,
	};
};
