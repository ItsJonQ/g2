import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { createStore, useSubState } from '@wp-g2/substate';
import { add, is, noop, useSealedState } from '@wp-g2/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { useBaseField } from '../BaseField';
import { useFormGroupContextId } from '../FormGroup';
import * as styles from './TextInput.styles';

const KEYS = {
	ENTER: 13,
	Z: 90,
	UP: 38,
	DOWN: 40,
};

const useTextInputSubState = (
	value,
	{ initialValue: initialValueProp, type, onValueSync = noop },
) => {
	const initialValue = is.defined(value) ? value : initialValueProp;

	const store = useSubState((set) => ({
		lastValue: initialValue,
		value: initialValue,
		type,
		inputRef: null,

		setValue: (next) => set({ value: next }),
		setLastValue: (next) => set({ lastValue: next }),
		resetValue: () => set((prev) => ({ value: prev.lastValue })),

		increment: (boost = 0) => {
			set((prev) => {
				if (prev.type !== 'number') return prev;
				if (!prev.inputRef) return prev;

				const step = jumpStepStore.getState().step;
				const nextValue = add(boost, step);

				prev.inputRef.stepUp(nextValue);

				return { value: prev.inputRef.value.toString() };
			});
		},
		decrement: (boost = 0) => {
			set((prev) => {
				if (prev.type !== 'number') return prev;
				if (!prev.inputRef) return prev;

				const step = jumpStepStore.getState().step;
				const nextValue = add(boost, step);

				prev.inputRef.stepDown(nextValue);

				return { value: prev.inputRef.value.toString() };
			});
		},
	}));

	useEffect(() => {
		if (is.defined(value) && value !== store.getState().value) {
			store.getState().setValue(value);
			onValueSync();
		}
	}, [onValueSync, store, value]);

	return store;
};

const jumpStepStore = createStore((set) => ({
	isShiftKey: false,
	setIsShiftKey: (next) =>
		set((prev) => {
			if (prev.isShiftKey === next) return prev;
			return { isShiftKey: next };
		}),
	step: 1,
}));

/**
 * A custom hook that calculates a step value (used by elements like input
 * [type="number"]). This value can be modified based on whether the Shift
 * key is being held down.
 *
 * For example, a shiftStep of 10, and a step of 1...
 * Starting from 10, the next incremented value will be 11.
 *
 * Holding down shift...
 * Starting from 10, the next incremented value will be 20.
 */
export function useJumpStep({
	isShiftStepEnabled: isShiftStepEnabledProp = true,
	shiftStep: shiftStepProp = 10,
	step: stepProp = 1,
}) {
	const { isShiftKey } = jumpStepStore();

	const isShiftStepEnabled = useSealedState(isShiftStepEnabledProp);
	const shiftStep = useSealedState(shiftStepProp);
	const step = useSealedState(stepProp);

	useEffect(() => {
		const handleOnKeyPress = (event) => {
			const { shiftKey } = event;
			if (jumpStepStore.getState().isShiftKey !== shiftKey) {
				const isEnabled = isShiftStepEnabled && shiftKey;
				const nextStep = isEnabled ? shiftStep * step : step;

				jumpStepStore.setState({
					isShiftKey: shiftKey,
					step: nextStep,
				});
			}
		};

		window.addEventListener('keydown', handleOnKeyPress);
		window.addEventListener('keyup', handleOnKeyPress);

		return () => {
			window.removeEventListener('keydown', handleOnKeyPress);
			window.removeEventListener('keyup', handleOnKeyPress);
		};
	}, [isShiftKey, isShiftStepEnabled, shiftStep, step]);
}

function useUndoTimeout() {
	const undoTimeoutRef = useRef();

	const setUndoTimeout = useCallback((fn) => {
		if (undoTimeoutRef.current) {
			clearTimeout(undoTimeoutRef.current);
		}

		undoTimeoutRef.current = setTimeout(fn, 60);
	}, []);

	useEffect(() => {
		const undoTimeout = undoTimeoutRef.current;
		return () => {
			if (undoTimeout) {
				clearTimeout(undoTimeout);
			}
		};
	}, []);

	return { undoTimeoutRef, setUndoTimeout };
}

function useFocusHandlers({
	isCommitOnBlurOrEnter = true,
	onCommitChange = noop,
	onBlur = noop,
	onFocus = noop,
}) {
	const [isFocused, setIsFocused] = useState(false);

	const handleOnBlur = useCallback(
		(event) => {
			if (isCommitOnBlurOrEnter) {
				onCommitChange();
			}
			onBlur(event);
			setIsFocused(false);
		},
		[isCommitOnBlurOrEnter, onBlur, onCommitChange],
	);

	const handleOnFocus = useCallback(
		(event) => {
			onFocus(event);
			setIsFocused(true);
		},
		[onFocus],
	);

	return {
		isFocused,
		onBlur: handleOnBlur,
		onFocus: handleOnFocus,
	};
}

function useKeyboardHandlers({
	onChange = noop,
	onCommitChange = noop,
	multiline = false,
	onKeyDown = noop,
	onEnterKeyDown = noop,
	store,
}) {
	const { setUndoTimeout } = useUndoTimeout();

	const handleOnKeyDown = useCallback(
		(event) => {
			const isNumberInput = store.getState().type === 'number';

			switch (event.keyCode) {
				case KEYS.ENTER:
					if (!multiline) {
						event.preventDefault();
						onCommitChange();
					}
					onEnterKeyDown(event);
					break;

				case KEYS.Z:
					if (event.metaKey || event.ctrlKey) {
						event.persist();
						setUndoTimeout(() => {
							onChange(event);
						});
					}
					break;

				case KEYS.UP:
					if (isNumberInput) {
						event.preventDefault();
						store.getState().increment();
						onCommitChange();
					}
					break;

				case KEYS.DOWN:
					if (isNumberInput) {
						event.preventDefault();
						store.getState().decrement();
						onCommitChange();
					}
					break;

				default:
					break;
			}

			onKeyDown(event);
		},
		[
			store,
			onKeyDown,
			multiline,
			onEnterKeyDown,
			onCommitChange,
			setUndoTimeout,
			onChange,
		],
	);

	return { onKeyDown: handleOnKeyDown };
}

function useChangeHandlers({
	isCommitOnBlurOrEnter,
	onChange = noop,
	store,
	validate,
}) {
	const handleOnChange = useCallback(
		(event) => {
			const { setValue } = store.getState();
			const next = event.target.value;
			setValue(next);

			if (!isCommitOnBlurOrEnter) {
				onChange(event.target.value, { event });
			}
		},
		[isCommitOnBlurOrEnter, onChange, store],
	);

	const handleOnCommitChange = useCallback(() => {
		const {
			lastValue: prev,
			resetValue,
			setLastValue,
			value: next,
		} = store.getState();

		if (prev === next) return;

		if (validate) {
			try {
				if (is.function(validate)) {
					if (validate(next)) {
						onChange(next);
						setLastValue(next);
					} else {
						resetValue();
					}
				}

				const regex = new RegExp(validate);
				if (regex.test(next)) {
					onChange(next);
					setLastValue(next);
				} else {
					resetValue();
				}
			} catch (err) {
				resetValue();
			}
		} else {
			setLastValue(next);
			onChange(next);
		}
	}, [onChange, store, validate]);

	return { onChange: handleOnChange, onCommitChange: handleOnCommitChange };
}

export function useTextInput(props) {
	const {
		align,
		className,
		dragAxis,
		defaultValue = '',
		disabled,
		gap = 2.5,
		id: idProp,
		isCommitOnBlurOrEnter = true,
		isResizable = false,
		isShiftStepEnabled = true,
		justify,
		multiline = false,
		onBlur = noop,
		onChange = noop,
		onFocus = noop,
		onKeyDown = noop,
		onEnterKeyDown = noop,
		onValueSync = noop,
		shiftStep = 10,
		size = 'medium',
		step,
		type = 'text',
		validate,
		value: valueProp,
		...otherProps
	} = useContextSystem(props, 'TextInput');

	const id = useFormGroupContextId(idProp);

	const store = useTextInputSubState(valueProp, {
		initialValue: defaultValue,
		onValueSync,
		type,
	});
	const { value } = store();

	const inputRef = useRef();

	useEffect(() => {
		if (inputRef.current) {
			store.setState({ inputRef: inputRef.current });
		}
	}, [store]);

	useJumpStep({
		isShiftStepEnabled,
		shiftStep,
		step,
	});

	const { onChange: handleOnChange, onCommitChange } = useChangeHandlers({
		isCommitOnBlurOrEnter,
		onChange,
		store,
		validate,
	});

	const {
		isFocused,
		onBlur: handleOnBlur,
		onFocus: handleOnFocus,
	} = useFocusHandlers({
		isCommitOnBlurOrEnter,
		onBlur,
		onFocus,
		onCommitChange,
	});

	const { onKeyDown: handleOnKeyDown } = useKeyboardHandlers({
		onCommitChange,
		onChange: handleOnChange,
		onEnterKeyDown,
		onKeyDown,
		multiline,
		store,
	});

	const handleOnRootClick = useCallback(() => {
		inputRef.current.focus();
	}, []);

	const baseFieldProps = useBaseField({
		align,
		disabled,
		gap,
		isFocused,
		justify,
	});

	const InputComponent = multiline ? TextareaAutosize : 'input';

	const classes = cx(
		baseFieldProps.className,
		multiline && styles.multiline,
		className,
	);

	const inputClasses = cx(
		styles.Input,
		styles[size],
		multiline && styles.inputMultiline,
		isResizable && styles.resizable,
		multiline && styles.scrollableScrollbar,
	);

	const inputProps = {
		as: InputComponent,
		...otherProps,
		className: inputClasses,
		id,
		onBlur: handleOnBlur,
		onChange: handleOnChange,
		onFocus: handleOnFocus,
		onKeyDown: handleOnKeyDown,
		step,
		type,
		value,
	};

	return {
		...baseFieldProps,
		__store: store,
		dragAxis,
		inputProps,
		inputRef,
		onClick: handleOnRootClick,
		onCommitChange,
		className: classes,
	};
}
