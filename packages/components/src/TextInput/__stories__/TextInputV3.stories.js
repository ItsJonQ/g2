import {
	add,
	is,
	mergeEventHandlers,
	normalizeArrowKey,
	roundClampString,
	subtract,
	useUpdateEffect,
} from '@wp-g2/utils';
import { isNil, noop } from 'lodash';
import React from 'react';

import { useBaseDragHandlers } from '../useTextInputState.utils';

export default {
	title: 'Components/TextInputV3',
};

/**
 *
 * @param {object} props
 * @param {string|number} props.value
 * @param {(string|number) => void} props.onChange
 */
function useControlledValue({ onChange, value: valueProp }) {
	const [state, setState] = React.useState(valueProp);
	const hasValue = !isNil(valueProp);

	const value = hasValue ? valueProp : state;
	const setValue = hasValue && !isNil(onChange) ? onChange : setState;

	return [value, setValue];
}

function useCommitValue({ value }) {
	const [commitValue, setCommitValue] = React.useState(null);
	const resetCommitValue = React.useCallback(() => setCommitValue(null), []);

	React.useEffect(resetCommitValue, [value]);

	return [commitValue, setCommitValue, resetCommitValue];
}

function useShiftStep({ isShiftStepEnabled = true, shiftStep = 10 }) {
	const [on, setOn] = React.useState(false);
	React.useEffect(() => {
		const handleOnKeyDown = (event) => {
			if (!isShiftStepEnabled) return;
			if (event.shiftKey) setOn(true);
		};
		const handleOnKeyUp = (event) => {
			if (!isShiftStepEnabled) return;
			if (!event.shiftKey) setOn(false);
		};

		window.addEventListener('keydown', handleOnKeyDown);
		window.addEventListener('keyup', handleOnKeyUp);

		return () => {
			window.removeEventListener('keydown', handleOnKeyDown);
			window.removeEventListener('keyup', handleOnKeyUp);
		};
	}, [isShiftStepEnabled]);

	return isShiftStepEnabled && on ? shiftStep : 1;
}

function useFocusedState({ isFocused: isFocusedProp = false }) {
	const [isFocused, setFocused] = React.useState(isFocusedProp);

	React.useEffect(() => {
		setFocused(isFocusedProp);
	}, [isFocusedProp]);

	return [isFocused, setFocused];
}

function useChangeHandlers({ onChange }) {
	const handleOnChange = React.useCallback(
		(event) => {
			onChange(event.target.value);
		},
		[onChange],
	);

	return {
		onChange: handleOnChange,
	};
}

function useFocusHandlers({ onChange, setFocused }) {
	const handleOnBlur = React.useCallback(
		(event) => {
			onChange(event.target.value);
			setFocused(false);
		},
		[onChange, setFocused],
	);

	const handleOnFocus = React.useCallback(() => {
		setFocused(true);
	}, [setFocused]);

	return {
		onBlur: handleOnBlur,
		onFocus: handleOnFocus,
	};
}

function useKeyboardHandlers({ onChange }) {
	const keyboardHandlers = React.useMemo(
		() => ({
			Enter(/** @type {import('react').KeyboardEvent} */ event) {
				if (event.isDefaultPrevented()) return;
				onChange(event.target.value);
			},
		}),
		[onChange],
	);

	const handleOnKeyDown = React.useCallback(
		(/** @type {import('react').KeyboardEvent}} */ event) => {
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
}

function useNumberActions({
	incrementFromNonNumericValue,
	isShiftStepEnabled,
	max,
	min,
	onChange,
	shiftStep: shiftStepProp = 10,
	step = 1,
	type,
	value,
}) {
	const shiftStep = useShiftStep({
		isShiftStepEnabled,
		shiftStep: shiftStepProp,
	});

	const isInputTypeNumeric = type === 'number';
	const isValueNumeric = is.numeric(value);

	const skipAction =
		!isInputTypeNumeric && !isValueNumeric && !incrementFromNonNumericValue;

	const increment = React.useCallback(
		(/** @type {number} */ jumpStep = 0) => {
			if (skipAction) return;

			const baseValue = is.numeric(value) ? value : 0;
			const nextValue = add(jumpStep * step, shiftStep);

			const next = roundClampString(
				add(baseValue, nextValue),
				min,
				max,
				shiftStep,
			);

			onChange(next);
		},
		[skipAction, value, step, shiftStep, min, max, onChange],
	);

	const decrement = React.useCallback(
		(/** @type {number} */ jumpStep = 0) => {
			if (skipAction) return;

			const baseValue = is.numeric(value) ? value : 0;
			const nextValue = add(jumpStep * step, shiftStep);

			const next = roundClampString(
				subtract(baseValue, nextValue),
				min,
				max,
				shiftStep,
			);

			onChange(next);
		},
		[skipAction, value, step, shiftStep, min, max, onChange],
	);

	return { increment, decrement };
}

function useNumberKeyboardHandlers({
	decrement,
	increment,
	isTypeNumeric,
	stopIfEventDefaultPrevented = true,
}) {
	const keyboardHandlers = React.useMemo(
		() => ({
			ArrowUp(event) {
				if (!isTypeNumeric) return;

				if (stopIfEventDefaultPrevented && event.isDefaultPrevented())
					return;

				event.preventDefault();

				increment();
			},
			ArrowDown(event) {
				if (!isTypeNumeric) return;

				if (stopIfEventDefaultPrevented && event.isDefaultPrevented())
					return;

				event.preventDefault();

				decrement();
			},
		}),
		[decrement, increment, isTypeNumeric, stopIfEventDefaultPrevented],
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
}

const useScrollHandlers = ({ decrement, increment, isTypeNumeric }) => {
	const handleOnWheel = React.useCallback(
		(event) => {
			if (!isTypeNumeric) return;
			if (event?.deltaY === 0) return;

			const isScrollUp = event?.deltaY < 0;
			console.log(isScrollUp, event?.deltaY);
			if (isScrollUp) {
				increment();
			} else {
				decrement();
			}
		},
		[decrement, increment, isTypeNumeric],
	);

	return {
		onWheel: handleOnWheel,
	};
};

function useDragHandlers({ decrement, dragAxis, increment, isTypeNumeric }) {
	return useBaseDragHandlers({
		dragAxis,
		isTypeNumeric,
		increment,
		decrement,
	});
}

function useTextInput(props) {
	const {
		dragAxis = 'y',
		incrementFromNonNumericValue = false,
		isCommitOnBlurOrEnter = true,
		isFocused: isFocusedProp = false,
		onChange: onChangeProp = noop,
		value: valueProp,
		min,
		max,
		step = 1,
		validate,
		isShiftStepEnabled = true,
		shiftStep = 10,
		type,
		format,
		...otherProps
	} = props;

	const [value, onChange] = useControlledValue({
		value: valueProp,
		onChange: onChangeProp,
	});

	const isInputTypeNumeric = type === 'number';
	const isTypeNumeric = format === 'number' || isInputTypeNumeric;

	const [commitValue, setCommitValue, resetCommitValue] = useCommitValue(
		value,
	);
	const inputValue = isNil(commitValue) ? value : commitValue;

	const [isFocused, setFocused] = useFocusedState({ value: isFocusedProp });

	const handleOnCommit = React.useCallback(
		(next) => {
			let isValid = true;
			const hasValidation = typeof validate === 'function';

			if (hasValidation) {
				// @ts-ignore We checked `validate` above for `hasValidation`
				isValid = validate(next, value) !== false;
			}

			if (isValid) {
				onChange(next);
				resetCommitValue();
			} else {
				resetCommitValue();
			}
		},
		[onChange, resetCommitValue, validate, value],
	);

	const { decrement, increment } = useNumberActions({
		min,
		max,
		step,
		incrementFromNonNumericValue,
		isShiftStepEnabled,
		shiftStep,
		type,
		onChange,
		value,
	});

	const changeHandlers = useChangeHandlers({
		onChange: isCommitOnBlurOrEnter ? setCommitValue : onChange,
	});

	const focusHandlers = useFocusHandlers({
		onChange: isCommitOnBlurOrEnter ? handleOnCommit : noop,
		setFocused,
	});

	const dragHandlers = useDragHandlers({
		increment,
		decrement,
		isTypeNumeric,
		dragAxis,
	});

	const baseKeyboardHandlers = useKeyboardHandlers({
		onChange: isCommitOnBlurOrEnter ? handleOnCommit : noop,
	});

	const numberKeyboardHandlers = useNumberKeyboardHandlers({
		increment,
		decrement,
		isTypeNumeric,
	});

	const keyboardHandlers = mergeEventHandlers(
		baseKeyboardHandlers,
		numberKeyboardHandlers,
	);

	const scrollHandlers = useScrollHandlers({
		increment,
		decrement,
		isTypeNumeric,
	});

	const handlers = {
		...changeHandlers,
		...dragHandlers,
		...focusHandlers,
		...keyboardHandlers,
		...scrollHandlers,
	};

	return {
		...handlers,
		...otherProps,
		value: inputValue,
		isFocused,
		min,
		max,
		step,
		type,
	};
}

function TextInput(props) {
	const { isFocused, ...textInput } = useTextInput(props);

	return (
		<input
			{...textInput}
			style={{ background: isFocused ? 'yellow' : null }}
		/>
	);
}

export const Default = () => {
	const [state, setState] = React.useState(1);
	return (
		<>
			Value: {state}
			<br />
			<TextInput format="number" onChange={setState} value={state} />
			<TextInput format="number" onChange={setState} value={state} />
		</>
	);
};
