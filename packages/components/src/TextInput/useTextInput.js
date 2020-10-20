import { useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { useCallback, useMemo } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { useBaseField } from '../BaseField';
import { useFormGroupContextId } from '../FormGroup';
import * as styles from './TextInput.styles';
import { useTextInputState } from './useTextInputState';

const useRootEventHandlers = ({ inputRef }) => {
	const handleOnClick = useCallback(() => {
		inputRef.current.focus();
	}, [inputRef]);

	const handleOnTouchStart = useCallback(() => {
		inputRef.current.focus();
	}, [inputRef]);

	return {
		onClick: handleOnClick,
		onTouchStart: handleOnTouchStart,
	};
};

export function useTextInput(props) {
	const combinedProps = useContextSystem(props, 'TextInput');
	const {
		align,
		className,
		defaultValue = '',
		disabled,
		dragAxis,
		format,
		gap = 2.5,
		hideArrows = false,
		id: idProp,
		innerContent,
		isResizable = false,
		isShiftStepEnabled = true,
		justify,
		max,
		min,
		multiline = false,
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
		format,
		initialValue: defaultValue,
		isShiftStepEnabled,
		max,
		min,
		shiftStep,
		step,
		value: valueProp,
		validate,
		type,
	});

	const { inputRef, isFocused, isTypeNumeric, value } = store();

	const rootEventHandlers = useRootEventHandlers({ inputRef });

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
		className: classes,
		dragAxis,
		decrement,
		increment,
		format,
		hideArrows,
		innerContent,
		inputProps,
		inputRef,
		isTypeNumeric,
		prefix,
		suffix,
	};
}
