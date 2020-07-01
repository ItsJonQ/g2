import React, { useRef, useState } from 'react';
import { cx } from '@g2/css';
import { connect } from '@g2/provider';
import { noop } from '@g2/utils';
import { FlexItem } from '../Flex';
import { RootView, InputView } from './InputControl.styles';

function InputControl({
	align,
	className,
	gap = 2.5,
	isRounded = false,
	isSeamless = false,
	justify,
	onBlur = noop,
	onFocus = noop,
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

	const classes = cx(className);

	return (
		<RootView
			align={align}
			className={classes}
			gap={gap}
			isFocused={isFocused}
			isRounded={isRounded}
			isSeamless={isSeamless}
			justify={justify}
			onClick={handleOnRootClick}
			size={size}
		>
			{prefix && <FlexItem>{prefix}</FlexItem>}
			<InputView
				as="input"
				onBlur={handleOnBlur}
				onFocus={handleOnFocus}
				ref={inputRef}
				size={size}
				{...props}
			/>
			{suffix && <FlexItem>{suffix}</FlexItem>}
		</RootView>
	);
}

export default connect(InputControl);
