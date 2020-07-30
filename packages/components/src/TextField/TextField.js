import { connect } from '@wp-g2/provider';
import { cx } from '@wp-g2/styles';
import { mergeRefs, noop } from '@wp-g2/utils';
import React, { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { BaseField } from '../BaseField';
import { Flex, FlexBlock, FlexItem } from '../Flex';
import * as styles from './TextField.styles';

const { InputView } = styles;

function TextField({
	align,
	className,
	disabled,
	forwardedRef,
	gap = 2.5,
	isRounded = false,
	isSeamless = false,
	isResizable = false,
	justify,
	onBlur = noop,
	onFocus = noop,
	onChange = noop,
	multiline = false,
	prefix,
	size = 'medium',
	suffix,
	...props
}) {
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef();

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
			as={Flex}
			className={classes}
			disabled={disabled}
			gap={gap}
			isFocused={isFocused}
			justify={justify}
			onClick={handleOnRootClick}
		>
			{prefix && <FlexItem>{prefix}</FlexItem>}
			<FlexBlock>
				<InputView
					as={InputComponent}
					cx={inputCx}
					disabled={disabled}
					onBlur={handleOnBlur}
					onChange={onChange}
					onFocus={handleOnFocus}
					ref={mergeRefs([inputRef, forwardedRef])}
					{...props}
				/>
			</FlexBlock>
			{suffix && <FlexItem>{suffix}</FlexItem>}
		</BaseField>
	);
}

export default connect(TextField);
