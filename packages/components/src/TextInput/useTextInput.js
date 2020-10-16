import { useContextSystem } from '@wp-g2/context';
import { useDrag } from '@wp-g2/gestures';
import { cx } from '@wp-g2/styles';
import { createStore, useSubState } from '@wp-g2/substate';
import {
	add,
	is,
	noop,
	roundClampString,
	subtract,
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
	{
		format,
		initialValue: initialValueProp,
		max,
		min,
		onIncrement,
		onDecrement,
		onValueSync = noop,
		shiftStep = 10,
		step = 1,
		type,
	},
) => {
	const initialValue = is.defined(value) ? value : initialValueProp;

	const store = useSubState((set) => ({
		format,
		incomingValue: initialValue,
		inputRef: null,
		lastValue: initialValue,
		max,
		min,
		shiftStep,
		step,
		type,
		value: initialValue,

		setValue: (next) => set({ value: next }),
		setIncomingValue: (next) => set({ incomingValue: next }),
		setLastValue: (next) => set({ lastValue: next }),
		commitValue: () => set((prev) => ({ lastValue: prev.value })),
		resetValue: () => set((prev) => ({ value: prev.lastValue })),

		increment: (boost = 0) => {
			set((prev) => {
				if (prev.type !== 'number' && prev.format !== 'number')
					return prev;
				if (!prev.inputRef) return prev;

				const { isShiftKey } = jumpStepStore.getState();

				if (onIncrement) {
					return onIncrement({ ...prev, boost, isShiftKey });
				}

				const step = isShiftKey
					? prev.step * prev.shiftStep
					: prev.step;

				const nextValue = add(boost, step);
				const final = roundClampString(
					add(nextValue, prev.value),
					prev.min,
					prev.max,
					prev.step,
				);

				return { value: final };
			});
		},
		decrement: (boost = 0) => {
			set((prev) => {
				if (prev.type !== 'number' && prev.format !== 'number')
					return prev;
				if (!prev.inputRef) return prev;

				const { isShiftKey } = jumpStepStore.getState();

				if (onDecrement) {
					return onDecrement({ ...prev, boost, isShiftKey });
				}

				const step = isShiftKey
					? prev.step * prev.shiftStep
					: prev.step;

				const nextValue = add(boost, step);
				const final = roundClampString(
					subtract(prev.value, nextValue),
					prev.min,
					prev.max,
					prev.step,
				);

				return { value: final };
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

	useJumpStep();

	return store;
};

export const jumpStepStore = createStore((set) => ({
	isShiftKey: false,
	setIsShiftKey: (next) =>
		set((prev) => {
			if (prev.isShiftKey === next) return prev;
			return { isShiftKey: next };
		}),
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
export function useJumpStep() {
	useEffect(() => {
		const handleOnKeyPress = (event) => {
			const { shiftKey } = event;
			if (jumpStepStore.getState().isShiftKey !== shiftKey) {
				jumpStepStore.setState({
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
	}, []);
}

export function useInputRef({ store }) {
	const inputRef = useRef();

	useEffect(() => {
		if (inputRef.current) {
			store.setState({ inputRef: inputRef.current });
		}
	}, [store]);

	return inputRef;
}

export function useUndoTimeout() {
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

export function useKeyboardHandlers({
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
			const { commitValue, setValue } = store.getState();
			const { format, type } = store.getState();
			const isNumberInput = format === 'number' || type === 'number';

			switch (event.keyCode) {
				case KEYS.Z:
					if (event.metaKey || event.ctrlKey) {
						event.persist();
						setUndoTimeout(() => {
							setValue(event.target.value);
							commitValue();
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
		[store, onKeyDown, setUndoTimeout],
	);

	return { onKeyUp: handleOnKeyUp, onKeyDown: handleOnKeyDown };
}

function useChangeHandlers({
	isCommitOnBlurOrEnter,
	onChange = noop,
	onBeforeCommit,
	onValueChange = noop,
	store,
	validate,
}) {
	const handleOnFinalizeChange = useCallback(
		(next) => {
			const { setLastValue, setValue } = store.getState();
			let final = next;

			if (onBeforeCommit) {
				final = onBeforeCommit(next, store.getState());
			}

			setLastValue(final);
			setValue(final);
			onChange(final);
		},
		[store, onBeforeCommit, onChange],
	);

	const handleOnChange = useCallback(
		(event) => {
			const { setValue } = store.getState();

			let final = event.target.value;

			setValue(final);
			onValueChange(final);

			if (!isCommitOnBlurOrEnter) {
				if (onBeforeCommit) {
					final = onBeforeCommit(final, store.getState());
				}

				onChange(final, { event });
			}
		},
		[isCommitOnBlurOrEnter, onBeforeCommit, onChange, onValueChange, store],
	);

	const handleOnCommitChange = useCallback(() => {
		const {
			incomingValue,
			max,
			min,
			resetValue,
			step,
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

export function useDragHandlers({ dragAxis, store }) {
	const [dragState, setDragState] = useState(false);
	const threshold = 10;
	const dragRaf = useRef();

	useEffect(() => {
		if (dragState) {
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

	useEffect(() => {
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
					store.getState().increment(boost);
					store.getState().commitValue();
				} else {
					store.getState().decrement(boost);
					store.getState().commitValue();
				}
			});
		},
		{ axis: dragAxis, threshold },
	);

	return dragGestures();
}

export function useEventHandlers(props) {
	const {
		isCommitOnBlurOrEnter = true,
		multiline = false,
		onBeforeCommit,
		onBlur = noop,
		onChange = noop,
		onFocus = noop,
		onKeyUp = noop,
		onKeyDown = noop,
		onEnterKeyDown = noop,
		onValueChange = noop,
		validate,
		store,
	} = props;

	const { onChange: handleOnChange } = useChangeHandlers({
		isCommitOnBlurOrEnter,
		onBeforeCommit,
		onChange,
		onValueChange,
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
		defaultValue = '',
		disabled,
		dragAxis,
		gap = 2.5,
		format,
		hideArrows = false,
		id: idProp,
		innerContent,
		isResizable = false,
		isShiftStepEnabled = true,
		justify,
		max,
		min,
		multiline = false,
		onIncrement,
		onDecrement,
		onBeforeCommit,
		onValueChange,
		onValueSync = noop,
		prefix,
		shiftStep = 10,
		size = 'medium',
		step,
		suffix,
		type = 'text',
		validate,
		value: valueProp,
		...otherProps
	} = combinedProps;

	const id = useFormGroupContextId(idProp);

	const store = useTextInputSubState(valueProp, {
		format,
		initialValue: defaultValue,
		isShiftStepEnabled,
		max,
		min,
		onIncrement,
		onDecrement,
		onValueSync,
		shiftStep,
		step,
		type,
	});
	const { value } = store();

	const inputRef = useInputRef({ store });

	const { isFocused, ...eventHandlers } = useEventHandlers({
		...combinedProps,
		onBeforeCommit,
		onValueChange,
		store,
	});

	const dragHandlers = useDragHandlers({ dragAxis: 'y', store });

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
		...dragHandlers,
		__store: store,
		className: classes,
		dragAxis,
		format,
		hideArrows,
		innerContent,
		inputProps,
		inputRef,
		onClick: handleOnRootClick,
		prefix,
		suffix,
	};
}
