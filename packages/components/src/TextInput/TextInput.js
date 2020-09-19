import { connect } from '@wp-g2/context';
import { cx, ui } from '@wp-g2/styles';
import { mergeRefs, noop, useControlledState } from '@wp-g2/utils';
import React, { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { BaseField } from '../BaseField';
import { FlexBlock, FlexItem } from '../Flex';
import { useFormGroupContext } from '../FormGroup';
import * as styles from './TextInput.styles';

const { InputView } = styles;

function TextInput({
	align,
	className,
	disabled,
	defaultValue,
	forwardedRef,
	gap = 2.5,
	id: idProp,
	isRounded = false,
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
	...props
}) {
	const [value, setValue] = useControlledState(valueProp, {
		initial: defaultValue,
	});
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef();

	const { id: contextId } = useFormGroupContext();
	const id = idProp || contextId;

	const handleOnRootClick = () => {
		inputRef.current.focus();
	};

	const handleOnBlur = (event) => {
		onBlur(event);
		setIsFocused(false);
	};

	const handleOnFocus = (event) => {
		onFocus(event);
		setIsFocused(true);
	};

	const handleOnChange = (event) => {
		const next = event.target.value;
		setValue(next);
		onChange(event.target.value, { event });
	};

	const InputComponent = multiline ? TextareaAutosize : 'input';

	const classes = cx([multiline && styles.multiline, className]);

	const inputCx = [
		styles[size],
		multiline && styles.inputMultiline,
		isResizable && styles.resizable,
		multiline && styles.scrollableScrollbar,
	];

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
			<FlexBlock {...ui.$('TextInputContent')}>
				<InputView
					as={InputComponent}
					cx={inputCx}
					disabled={disabled}
					id={id}
					onBlur={handleOnBlur}
					onChange={handleOnChange}
					onFocus={handleOnFocus}
					ref={mergeRefs([inputRef, forwardedRef])}
					value={value}
					{...props}
					{...ui.$('TextInput')}
				/>
			</FlexBlock>
			{suffix && (
				<FlexItem {...ui.$('TextInputSuffix')}>{suffix}</FlexItem>
			)}
		</BaseField>
	);
}

export default connect(TextInput, 'TextInput');
