import { contextConnect } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import { mergeRefs } from '@wp-g2/utils';
import React from 'react';

import { FlexItem } from '../Flex';
import { TextInputArrows } from '../TextInput';
import { View } from '../View';
import UnitInputSelect from './UnitInputSelect';
import { useUnitInput } from './useUnitInput';

function UnitInput(props, forwardedRef) {
	const {
		__store,
		__unitStore,
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
	} = useUnitInput(props);

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
			<UnitInputSelect
				inputRef={inputRef}
				store={__store}
				unitStore={__unitStore}
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

export default contextConnect(UnitInput, 'UnitInput');
