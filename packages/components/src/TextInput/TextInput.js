import { connect } from '@wp-g2/provider';
import { cx } from '@wp-g2/styles';
import { mergeRefs, noop } from '@wp-g2/utils';
import React, { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { useControlGroupContext } from '../ControlGroup';
import { Flex, FlexBlock, FlexItem } from '../Flex';
import * as styles from './TextInput.styles';

const { InputView } = styles;

function TextInput({
	align,
	className,
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
	const { isFirst, isLast, isMiddle } = useControlGroupContext();

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

	const classes = cx([
		styles.Root,
		isFirst && styles.first,
		isMiddle && styles.middle,
		isLast && styles.last,
		isFocused && styles.focus,
		multiline && styles.multiline,
		className,
	]);

	const inputCx = [
		styles[size],
		multiline && styles.inputMultiline,
		isResizable && styles.resizable,
		styles.scrollableScrollbar,
	];

	return (
		<Flex
			align={align}
			className={classes}
			gap={gap}
			justify={justify}
			onClick={handleOnRootClick}
		>
			{prefix && <FlexItem>{prefix}</FlexItem>}
			<FlexBlock>
				<InputView
					as={InputComponent}
					cx={inputCx}
					isResizable={isResizable}
					onBlur={handleOnBlur}
					onChange={onChange}
					onFocus={handleOnFocus}
					ref={mergeRefs([inputRef, forwardedRef])}
					{...props}
				/>
			</FlexBlock>
			{suffix && <FlexItem>{suffix}</FlexItem>}
		</Flex>
	);
}

export default connect(TextInput);
