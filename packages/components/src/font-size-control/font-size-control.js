import { __ } from '@wordpress/i18n';
import { contextConnect } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
import { VisuallyHidden } from '../VisuallyHidden';
import { VStack } from '../VStack';
import FontSizeControlSelect from './font-size-control-select';
import FontSizeControlSlider from './font-size-control-slider';
import { useFontSizeControl } from './use-font-size-control';

function FontSizeControl(props, forwardedRef) {
	const {
		customLabel = __('Custom'),
		disableCustomFontSizes,
		disabled,
		label,
		max,
		min,
		options,
		inputValue,
		isDefaultValue,
		value,
		onChange,
		onReset,
		onInputChange,
		size,
		withSlider,
		withNumberInput,
		withSelect,
		...otherProps
	} = useFontSizeControl(props);

	if (!options) return null;

	return (
		<View as="fieldset" {...otherProps}>
			<VisuallyHidden as="legend">{label}</VisuallyHidden>
			<VStack spacing={3}>
				<FontSizeControlSelect
					customLabel={customLabel}
					disabled={disabled}
					inputValue={inputValue}
					isDefaultValue={isDefaultValue}
					label={label}
					max={max}
					min={min}
					onChange={onChange}
					onInputChange={onInputChange}
					onReset={onReset}
					options={options}
					ref={forwardedRef}
					size={size}
					value={value}
					withNumberInput={withNumberInput}
					withSelect={withSelect}
				/>
				<FontSizeControlSlider
					disabled={disabled}
					max={max}
					min={min}
					onChange={onInputChange}
					size={size}
					value={inputValue}
					withSlider={withSlider}
				/>
			</VStack>
		</View>
	);
}

export default contextConnect(FontSizeControl, 'FontSizeControl');
