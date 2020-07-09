import { connect } from '@wp-g2/provider';
import { cx } from '@wp-g2/styled';
import { mergeRefs, noop } from '@wp-g2/utils';
import React, { useRef, useState } from 'react';

import { useControlGroupContext } from '../ControlGroup';
import { FlexBlock, FlexItem } from '../Flex';
import { InputView, RootView, TextAreaView } from './TextInput.styles';

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

	const classes = cx(className);
	const InputComponent = multiline ? TextAreaView : InputView;

	return (
		<RootView
			align={align}
			className={classes}
			gap={gap}
			isFirst={isFirst}
			isFocused={isFocused}
			isLast={isLast}
			isMiddle={isMiddle}
			isRounded={isRounded}
			isSeamless={isSeamless}
			justify={justify}
			multiline={multiline}
			onClick={handleOnRootClick}
			size={size}
		>
			{prefix && <FlexItem>{prefix}</FlexItem>}
			<FlexBlock>
				<InputComponent
					isResizable={isResizable}
					onBlur={handleOnBlur}
					onChange={onChange}
					onFocus={handleOnFocus}
					ref={mergeRefs([inputRef, forwardedRef])}
					size={size}
					{...props}
				/>
			</FlexBlock>
			{suffix && <FlexItem>{suffix}</FlexItem>}
		</RootView>
	);
}

export default connect(TextInput);
