import { contextConnect } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import { mergeRefs } from '@wp-g2/utils';
import React from 'react';

import { FlexItem } from '../Flex';
import { TextInputArrows } from '../TextInput';
import { UnitInputSelect } from '../UnitInput';
import { View } from '../View';
import PresetInputSelect from './PresetInputSelect';
import PresetInputTypeAhead from './PresetInputTypeAhead';
import { usePresetInput } from './usePresetInput';

function PresetInput(props, forwardedRef) {
	const {
		__presetStore,
		__store,
		__unitStore,
		decrement,
		disabled,
		hideArrows = true,
		increment,
		inputProps,
		inputRef,
		isTypeNumeric,
		prefix,
		suffix,
		...otherProps
	} = usePresetInput(props);

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
			<PresetInputTypeAhead presetStore={__presetStore} store={__store} />
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
			<PresetInputSelect presetStore={__presetStore} store={__store} />
		</View>
	);
}

export default contextConnect(PresetInput, 'PresetInput');
