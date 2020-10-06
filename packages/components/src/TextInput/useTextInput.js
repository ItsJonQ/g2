import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { useSubState } from '@wp-g2/substate';
import {
	add,
	is,
	noop,
	roundClamp,
	subtract,
	useControlledState,
} from '@wp-g2/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { useBaseField } from '../BaseField';
import { useFormGroupContext } from '../FormGroup';
import * as styles from './TextInput.styles';
import { useJumpStep } from './useJumpStep';

function defaultOnBeforeChange(event) {
	return event?.target?.value;
}

export function useTextInput(props) {
	const {
		__onBeforeChange = defaultOnBeforeChange,
		__store,
		jumpStep,
		align,
		className,
		onCommitChange = noop,
		disabled,
		defaultValue = '',
		enriched = false,
		gap = 2.5,
		id: idProp,
		isResizable = false,
		justify,
		onBlur = noop,
		onFocus = noop,
		onChange = noop,
		multiline = false,
		size = 'medium',
		value: valueProp,
		...otherProps
	} = useContextSystem(props, 'TextInput');

	const [value, setValue] = useControlledState(valueProp, {
		initial: defaultValue,
	});
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef();

	const baseFieldProps = useBaseField({
		align,
		disabled,
		gap,
		isFocused,
		justify,
	});

	const { id: contextId } = useFormGroupContext();
	const id = idProp || contextId;

	const handleOnRootClick = useCallback(() => {
		inputRef.current.focus();
	}, []);

	const handleOnBlur = useCallback(
		(event) => {
			onBlur(event);
			setIsFocused(false);
		},
		[onBlur],
	);

	const handleOnFocus = useCallback(
		(event) => {
			onFocus(event);
			setIsFocused(true);
		},
		[onFocus],
	);

	const handleOnChange = useCallback(
		(event) => {
			const next = event.target.value;
			setValue(next);
			onChange(__onBeforeChange(event), { event });
		},
		[__onBeforeChange, onChange, setValue],
	);

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
		...otherProps,
		as: InputComponent,
		id,
		className: inputClasses,
		onFocus: handleOnFocus,
		onChange: handleOnChange,
		onBlur: handleOnBlur,
		value,
	};

	return {
		...baseFieldProps,
		__store,
		enriched,
		inputProps,
		jumpStep,
		inputRef,
		onClick: handleOnRootClick,
		onCommitChange,
		className: classes,
	};
}

export function useEnrichedTextInput({
	onBlur = noop,
	onChange = noop,
	isCommitOnBlurOrEnter = true,
	isShiftStepEnabled = true,
	validate,
	value: initialValue,
	onKeyDown = noop,
	max = Infinity,
	min = -Infinity,
	shiftStep = 10,
	step = 1,
	type = 'text',
}) {
	const inputRef = useRef();
	const isNumberInput = type === 'number';

	const jumpStep = useJumpStep({
		isShiftStepEnabled,
		shiftStep,
		step,
	});

	const store = useSubState((set) => ({
		__step: step,
		value: initialValue,
		setValue: (next) => set({ value: next }),
		increment: (bump) =>
			set((prev) => {
				let nextValue = add(prev.value, bump);
				nextValue = roundClamp(nextValue, min, max, bump);
				return { value: nextValue.toString() };
			}),
		decrement: (bump) =>
			set((prev) => {
				let nextValue = subtract(prev.value, bump);
				nextValue = roundClamp(nextValue, min, max, bump);
				return { value: nextValue.toString() };
			}),
	}));

	const { setValue, value } = store();
	const undoTimeoutRef = useRef();

	useEffect(() => {
		if (initialValue !== store.getState().value) {
			store.setState({ value: initialValue });
		}
	}, [initialValue, store]);

	useEffect(() => {
		return () => {
			if (undoTimeoutRef.current) {
				clearTimeout(undoTimeoutRef.curremt);
			}
		};
	}, []);

	const commitChange = useCallback(() => {
		const next = store.getState().value;

		if (next === initialValue && isCommitOnBlurOrEnter) {
			return;
		}

		if (validate) {
			try {
				const regex = new RegExp(validate);

				if (is.function(validate)) {
					if (validate(next)) {
						onChange(next);
					} else {
						store.setState({ value: initialValue });
					}
					return;
				}

				if (regex.test(next)) {
					onChange(next);
				} else {
					store.setState({ value: initialValue });
				}
			} catch (err) {
				store.setState({ value: initialValue });
			}
		} else {
			onChange(next);
		}
	}, [initialValue, isCommitOnBlurOrEnter, onChange, store, validate]);

	const handleOnKeyDown = useCallback(
		(event) => {
			// Enter press
			if (event.keyCode === 13) {
				event.preventDefault();
				commitChange();
			}

			// Undo press
			if (event.keyCode === 90 && (event.metaKey || event.ctrlKey)) {
				if (undoTimeoutRef.current) {
					clearTimeout(undoTimeoutRef.current);
				}
				event.persist();
				undoTimeoutRef.current = setTimeout(() => {
					onChange(event.target.value);
				}, 60);
			}

			// Arrow handling
			if (isNumberInput) {
				if (event.keyCode === 38 || event.keyCode === 40) {
					event.preventDefault();
					if (event.keyCode === 38) {
						store.getState().increment(jumpStep);
					} else {
						store.getState().decrement(jumpStep);
					}
					commitChange();
				}
			}

			onKeyDown(event);
		},
		[isNumberInput, onKeyDown, commitChange, onChange, store, jumpStep],
	);

	const handleOnBlur = useCallback(
		(event) => {
			commitChange();
			onBlur(event);
		},
		[commitChange, onBlur],
	);

	const handleOnChange = useCallback(
		(next) => {
			setValue(next);
		},
		[setValue],
	);

	return {
		onBlur: handleOnBlur,
		onKeyDown: handleOnKeyDown,
		onChange: handleOnChange,
		onCommitChange: commitChange,
		jumpStep,
		type,
		value,
		min,
		max,
		step,
		inputRef,
		__store: store,
	};
}
