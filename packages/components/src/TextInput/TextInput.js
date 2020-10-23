import { contextConnect } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import { mergeRefs } from '@wp-g2/utils';
import React from 'react';

import { View } from '../View';
import TextInputArrows from './TextInputArrows';
import TextInputSteppers from './TextInputSteppers';
import { useTextInput } from './useTextInput';

function TextInput(props, forwardedRef) {
	const {
		__store,
		arrows,
		decrement,
		disabled,
		increment,
		inputProps,
		inputRef,
		isTypeNumeric,
		prefix,
		suffix,
		...otherProps
	} = useTextInput(props);

	const showTextInputArrows = arrows === true && isTypeNumeric;
	const showTextInputSteppers = arrows === 'stepper' && isTypeNumeric;

	return (
		<View {...otherProps} disabled={disabled} {...ui.$('TextInputWrapper')}>
			{prefix}
			<View
				autoComplete="off"
				spellCheck={false}
				{...inputProps}
				disabled={disabled}
				ref={mergeRefs([inputRef, forwardedRef])}
				{...ui.$('TextInput')}
			/>
			{suffix}
			{showTextInputArrows && (
				<TextInputArrows
					__store={__store}
					decrement={decrement}
					increment={increment}
				/>
			)}
			{showTextInputSteppers && (
				<TextInputSteppers
					__store={__store}
					decrement={decrement}
					increment={increment}
				/>
			)}
		</View>
	);
}

export default contextConnect(TextInput, 'TextInput');
