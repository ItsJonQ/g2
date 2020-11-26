import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { noop } from '@wp-g2/utils';
import { useCallback, useMemo } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { useBaseField } from '../BaseField';
import { useFormGroupContextId } from '../FormGroup';
import * as styles from './TextInput.styles';
import { useTextInputState } from './useTextInputState';
import { useDragHandlers } from './useTextInputState.utils';

const useRootEventHandlers = ({ decrement, increment, inputRef, store }) => {
	const dragHandlers = useDragHandlers({ store, increment, decrement });

	const handleOnClick = useCallback(() => {
		inputRef.current.focus();
	}, [inputRef]);

	const handleOnTouchStart = useCallback(() => {
		inputRef.current.focus();
	}, [inputRef]);

	return {
		...dragHandlers,
		onClick: handleOnClick,
		onTouchStart: handleOnTouchStart,
	};
};

/**
 *
 * @param {import('@wp-g2/create-styles').ViewOwnProps<import('./types').Props, 'input'>} props
 */
export function useTextInput(props) {
	const combinedProps = useContextSystem(props, 'TextInput');
	const {
		__debugger = false,
		align,
		arrows = true,
		className,
		defaultValue = '',
		disabled,
		dragAxis,
		error = false,
		format,
		gap = 2.5,
		id: idProp,
		isInline = false,
		isFocused: isFocusedProp,
		isCommitOnBlurOrEnter = true,
		isResizable = false,
		isShiftStepEnabled = true,
		justify,
		max,
		min,
		multiline = false,
		onValueChange = noop,
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

	const {
		decrement,
		increment,
		store,
		...textInputState
	} = useTextInputState({
		...otherProps,
		__debugger,
		format,
		initialValue: defaultValue,
		isCommitOnBlurOrEnter,
		isFocused: isFocusedProp,
		isShiftStepEnabled,
		max,
		min,
		onValueChange,
		shiftStep,
		step,
		value: valueProp,
		validate,
		type,
	});

	const { inputRef, isFocused, isTypeNumeric, value } = store();

	const rootEventHandlers = useRootEventHandlers({
		inputRef,
		decrement,
		increment,
		store,
	});

	const baseFieldProps = useBaseField({
		align,
		disabled,
		error,
		gap,
		isFocused,
		isInline,
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
		...textInputState,
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
		...rootEventHandlers,
		__store: store,
		arrows,
		className: classes,
		dragAxis,
		decrement,
		increment,
		format,
		inputProps,
		inputRef,
		isTypeNumeric,
		prefix,
		suffix,
		disabled,
	};
}
