import { contextConnect } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import { mergeRefs } from '@wp-g2/utils';
import React from 'react';

import { FlexItem } from '../Flex';
import { View } from '../View';
import TextInputArrows from './TextInputArrows';
import { useTextInput } from './useTextInput';

function TextInput(props, forwardedRef) {
	const {
		__store,
		decrement,
		disabled,
		hideArrows = false,
		increment,
		inputProps,
		inputRef,
		isTypeNumeric,
		prefix,
		suffix,
		...otherProps
	} = useTextInput(props);

	const showTextInputArrows = !hideArrows && isTypeNumeric;

	return (
		<View {...otherProps} disabled={disabled} {...ui.$('TextInputWrapper')}>
			{prefix && (
				<FlexItem {...ui.$('TextInputPrefix')}>{prefix}</FlexItem>
			)}
			<View
				autoComplete="off"
				spellCheck={false}
				{...inputProps}
				disabled={disabled}
				ref={mergeRefs([inputRef, forwardedRef])}
				{...ui.$('TextInput')}
			/>
			{showTextInputArrows && (
				<TextInputArrows
					__store={__store}
					decrement={decrement}
					increment={increment}
				/>
			)}
			{suffix && (
				<FlexItem {...ui.$('TextInputSuffix')}>{suffix}</FlexItem>
			)}
		</View>
	);
}

export default contextConnect(TextInput, 'TextInput');
