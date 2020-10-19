import { contextConnect, useContextSystem } from '@wp-g2/context';
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
		innerContent,
		inputProps,
		inputRef,
		isTypeNumeric,
		prefix,
		suffix,
		typeAhead,
		...otherProps
	} = useUnitInput(props);

	const showTextInputArrows = !hideArrows && isTypeNumeric;

	const enhancedInnerContent = (
		<>
			<UnitInputSelect
				inputRef={inputRef}
				store={__store}
				unitStore={__unitStore}
			/>
			{innerContent}
		</>
	);

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
			{enhancedInnerContent}
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
