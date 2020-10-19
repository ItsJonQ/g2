import { add, roundClampString, subtract } from '@wp-g2/utils';
import React from 'react';

import { HStack } from '../../HStack';
import { View } from '../../View';
import { useTextInput } from './TextInput';
import { TextInputArrows } from './TextInputArrows';
import {
	mergeEventHandlers,
	normalizeArrowKey,
	useDragHandlers,
	useShiftStepState,
} from './utils';

const useNumberActions = ({ max, min, shiftStepStore, store }) => {
	const increment = React.useCallback(
		(jumpStep = 0) => {
			const { change, commit, value } = store.getState();

			const shiftStep = shiftStepStore.getState().getShiftValue();
			const nextValue = add(jumpStep, shiftStep);

			const next = roundClampString(
				add(value, nextValue),
				min,
				max,
				shiftStep,
			);

			change(next);
			commit();
		},
		[max, min, shiftStepStore, store],
	);

	const decrement = React.useCallback(
		(jumpStep = 0) => {
			const { change, commit, value } = store.getState();

			const shiftStep = shiftStepStore.getState().getShiftValue();
			const nextValue = add(jumpStep, shiftStep);

			const next = roundClampString(
				subtract(value, nextValue),
				min,
				max,
				shiftStep,
			);

			change(next);
			commit();
		},
		[max, min, shiftStepStore, store],
	);

	return {
		increment,
		decrement,
	};
};

const useNumberKeyboardHandlers = ({ decrement, increment }) => {
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

const useNumberEventHandlers = ({ decrement, increment, store }) => {
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

export const useTextInputNumber = (props) => {
	const { max, min, step } = props;
	const { store, ...textInput } = useTextInput({
		format: 'number',
		type: 'number',
		...props,
	});

	const { shiftStepStore } = useShiftStepState({
		step: store.getState().step,
		shiftStep: store.getState().shiftStep,
	});

	const { decrement, increment } = useNumberActions({
		max,
		min,
		shiftStepStore,
		store,
	});

	const eventHandlers = useNumberEventHandlers({
		store,
		decrement,
		increment,
	});

	const mergedEventHandlers = mergeEventHandlers(eventHandlers, textInput);

	return {
		store,
		...textInput,
		...mergedEventHandlers,
		decrement,
		increment,
		min,
		max,
		step,
	};
};

export const NumberInput = React.memo((props) => {
	const { decrement, increment, store, ...textInput } = useTextInputNumber(
		props,
	);

	return (
		<HStack>
			<View as="input" type="number" {...textInput} />
			<TextInputArrows decrement={decrement} increment={increment} />
		</HStack>
	);
});
