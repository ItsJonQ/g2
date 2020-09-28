import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx, ui } from '@wp-g2/styles';
import { mergeRefs, noop, useControlledState } from '@wp-g2/utils';
import React, { useCallback, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { BaseField } from '../BaseField';
import { FlexItem } from '../Flex';
import { useFormGroupContext } from '../FormGroup';
import { View } from '../View';
import * as styles from './TextInput.styles';

function TextInput(props, forwardedRef) {
	const {
		__onBeforeChange = defaultOnBeforeChange,
		align,
		className,
		disabled,
		defaultValue = '',
		gap = 2.5,
		id: idProp,
		isResizable = false,
		justify,
		onBlur = noop,
		onFocus = noop,
		onChange = noop,
		multiline = false,
		prefix,
		size = 'medium',
		suffix,
		value: valueProp,
		...otherProps
	} = useContextSystem(props, 'TextInput');

	const [value, setValue] = useControlledState(valueProp, {
		initial: defaultValue,
	});
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef();

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

	const classes = cx([multiline && styles.multiline, className]);

	const inputCx = cx([
		styles.Input,
		styles[size],
		multiline && styles.inputMultiline,
		isResizable && styles.resizable,
		multiline && styles.scrollableScrollbar,
	]);

	return (
		<BaseField
			align={align}
			className={classes}
			disabled={disabled}
			gap={gap}
			isFocused={isFocused}
			justify={justify}
			onClick={handleOnRootClick}
			{...ui.$('TextInputWrapper')}
		>
			{prefix && (
				<FlexItem {...ui.$('TextInputPrefix')}>{prefix}</FlexItem>
			)}
			<View
				as={InputComponent}
				cx={inputCx}
				disabled={disabled}
				id={id}
				onBlur={handleOnBlur}
				onChange={handleOnChange}
				onFocus={handleOnFocus}
				ref={mergeRefs([inputRef, forwardedRef])}
				value={value}
				{...otherProps}
				{...ui.$('TextInput')}
			/>
			{suffix && (
				<FlexItem {...ui.$('TextInputSuffix')}>{suffix}</FlexItem>
			)}
		</BaseField>
	);
}

function defaultOnBeforeChange(event) {
	return event?.target?.value;
}

export default contextConnect(TextInput, 'TextInput');
