import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { createStore, useSubState } from '@wp-g2/substate';
import {
	add,
	is,
	noop,
	roundClampString,
	useSealedState,
	useUpdateEffect,
} from '@wp-g2/utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { useBaseField } from '../BaseField';
import { useFormGroupContextId } from '../FormGroup';
import * as styles from './TextInput.styles';

const KEYS = {
	ENTER: 13,
	ESC: 27,
	Z: 90,
	UP: 38,
	DOWN: 40,
};

const useTextInputSubState = (
	value,
	{ initialValue: initialValueProp, min, max, type, onValueSync = noop },
) => {
	const initialValue = is.defined(value) ? value : initialValueProp;

	const store = useSubState((set) => ({
		incomingValue: initialValue,
		lastValue: initialValue,
		value: initialValue,
		type,
		min,
		max,
		inputRef: null,

		setValue: (next) => set({ value: next }),
		setIncomingValue: (next) => set({ incomingValue: next }),
		setLastValue: (next) => set({ lastValue: next }),
		commitValue: () => set((prev) => ({ lastValue: prev.value })),
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
		if (is.defined(value)) {
			store.setState((prev) => {
				const next = { incomingValue: value };
				if (value !== prev.value) {
					next.value = value;
					onValueSync();
				}

				return next;
			});
		}
	}, [onValueSync, store, value]);

	useUpdateEffect(() => store.setState({ min }), [min]);
	useUpdateEffect(() => store.setState({ max }), [max]);

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

function useInputRef({ store }) {
	const inputRef = useRef();

	useEffect(() => {
		if (inputRef.current) {
			store.setState({ inputRef: inputRef.current });
		}
	}, [store]);

	return inputRef;
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
	onBlur = noop,
	onFocus = noop,
	store,
}) {
	const [isFocused, setIsFocused] = useState(false);

	const handleOnBlur = useCallback(
		(event) => {
			const { commitValue } = store.getState();
			if (isCommitOnBlurOrEnter) {
				commitValue();
			}
			onBlur(event);
			setIsFocused(false);
		},
		[isCommitOnBlurOrEnter, onBlur, store],
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
	multiline = false,
	onKeyDown = noop,
	onEnterKeyDown = noop,
	store,
}) {
	const { setUndoTimeout } = useUndoTimeout();

	const handleOnKeyUp = useCallback(
		(event) => {
			const { commitValue, resetValue } = store.getState();

			switch (event.keyCode) {
				case KEYS.ENTER:
					if (!multiline) {
						event.preventDefault();
						commitValue();
					}
					onEnterKeyDown(event);
					break;

				case KEYS.ESC:
					resetValue();
					commitValue();
					onEnterKeyDown(event);
					break;
				default:
					break;
			}
		},
		[multiline, onEnterKeyDown, store],
	);

	const handleOnKeyDown = useCallback(
		(event) => {
			const { commitValue } = store.getState();
			const isNumberInput = store.getState().type === 'number';

			switch (event.keyCode) {
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
						commitValue();
					}
					break;

				case KEYS.DOWN:
					if (isNumberInput) {
						event.preventDefault();
						store.getState().decrement();
						commitValue();
					}
					break;

				default:
					break;
			}

			onKeyDown(event);
		},
		[store, onKeyDown, setUndoTimeout, onChange],
	);

	return { onKeyUp: handleOnKeyUp, onKeyDown: handleOnKeyDown };
}

function useChangeHandlers({
	isCommitOnBlurOrEnter,
	onChange = noop,
	store,
	validate,
}) {
	const handleOnFinalizeChange = useCallback(
		(next) => {
			const { setLastValue, setValue } = store.getState();

			setLastValue(next);
			setValue(next);
			onChange(next);
		},
		[store, onChange],
	);

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
		const { step } = jumpStepStore.getState();
		const {
			incomingValue,
			max,
			min,
			resetValue,
			type,
			value,
		} = store.getState();
		let next = value;

		if (incomingValue === next) return;

		if (type === 'number') {
			next = roundClampString(next, min, max, step);
		}

		if (!validate) {
			handleOnFinalizeChange(next);
		}

		try {
			let shouldFinalize = true;

			if (is.function(validate)) {
				shouldFinalize = validate(next);
			} else {
				shouldFinalize = new RegExp(validate).test(next);
			}

			if (shouldFinalize) {
				handleOnFinalizeChange(next);
			} else {
				resetValue();
			}
		} catch (err) {
			resetValue();
		}
	}, [handleOnFinalizeChange, store, validate]);

	/**
	 * Subscribes the onCommitChange handler to fire when lastValue updates.
	 * lastValue is the only updated when TextInput is ready to broadcast
	 * it's changes to the onChange (prop) handler.
	 */
	useEffect(() => {
		const unsub = store.subscribe(
			handleOnCommitChange,
			(state) => state.lastValue,
		);

		return unsub;
	}, [handleOnCommitChange, store]);

	return {
		onChange: handleOnChange,
	};
}

function useEventHandlers(props) {
	const {
		isCommitOnBlurOrEnter = true,
		multiline = false,
		onBlur = noop,
		onChange = noop,
		onFocus = noop,
		onKeyUp = noop,
		onKeyDown = noop,
		onEnterKeyDown = noop,
		validate,
		store,
	} = props;

	const { onChange: handleOnChange } = useChangeHandlers({
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
		store,
	});

	const {
		onKeyDown: handleOnKeyDown,
		onKeyUp: handleOnKeyUp,
	} = useKeyboardHandlers({
		onChange: handleOnChange,
		onEnterKeyDown,
		onKeyDown,
		onKeyUp,
		multiline,
		store,
	});

	return {
		isFocused,
		onBlur: handleOnBlur,
		onChange: handleOnChange,
		onFocus: handleOnFocus,
		onKeyDown: handleOnKeyDown,
		onKeyUp: handleOnKeyUp,
	};
}

export function useTextInput(props) {
	const combinedProps = useContextSystem(props, 'TextInput');
	const {
		align,
		className,
		dragAxis,
		defaultValue = '',
		disabled,
		gap = 2.5,
		id: idProp,
		isResizable = false,
		isShiftStepEnabled = true,
		justify,
		min,
		max,
		multiline = false,
		onValueSync = noop,
		shiftStep = 10,
		size = 'medium',
		step,
		type = 'text',
		validate,
		value: valueProp,
		...otherProps
	} = combinedProps;

	const id = useFormGroupContextId(idProp);

	const store = useTextInputSubState(valueProp, {
		initialValue: defaultValue,
		max,
		min,
		onValueSync,
		type,
	});
	const { value } = store();

	useJumpStep({
		isShiftStepEnabled,
		shiftStep,
		step,
	});

	const inputRef = useInputRef({ store });

	const { isFocused, ...eventHandlers } = useEventHandlers({
		...combinedProps,
		store,
	});

	const handleOnRootClick = useCallback(() => {
		inputRef.current.focus();
	}, [inputRef]);

	const baseFieldProps = useBaseField({
		align,
		disabled,
		gap,
		isFocused,
		justify,
	});

	const InputComponent = multiline ? TextareaAutosize : 'input';

	const classes = useMemo(
		() =>
			cx(
				baseFieldProps.className,
				multiline && styles.multiline,
				className,
			),
		[baseFieldProps.className, className, multiline],
	);

	const inputClasses = useMemo(
		() =>
			cx(
				styles.Input,
				styles[size],
				multiline && styles.inputMultiline,
				isResizable && styles.resizable,
				multiline && styles.scrollableScrollbar,
			),
		[isResizable, multiline, size],
	);

	const inputProps = {
		as: InputComponent,
		...otherProps,
		...eventHandlers,
		className: inputClasses,
		id,
		min,
		max,
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
		className: classes,
	};
}
