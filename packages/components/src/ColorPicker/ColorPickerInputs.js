import { __ } from '@wordpress/i18n';
import { interpolate, is, roundClamp } from '@wp-g2/utils';
import React from 'react';

import { FormGroup } from '../FormGroup';
import { Grid } from '../Grid';
import { Slider } from '../Slider';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { VStack } from '../VStack';
import { useColorPickerContext } from './ColorPicker.Context';
import * as styles from './ColorPicker.styles';
import { ColorInputHex } from './ColorPickerInputHex';

export const ColorInputSliderAlpha = React.memo(
	({ label = __('Alpha'), type = 'rgb', ...otherProps }) => {
		const parse = React.useCallback((next) => {
			return interpolate(next, [0, 1], [0, 100]);
		}, []);

		const serialize = React.useCallback((next) => {
			return interpolate(next, [100, 0], [1, 0]);
		}, []);

		const suffix = (
			<Text className={styles.suffixText} isBlock variant="muted">
				%
			</Text>
		);

		return (
			<ColorInputSlider
				label={label}
				max={100}
				min={0}
				parse={parse}
				prop="a"
				serialize={serialize}
				step={1}
				suffix={suffix}
				type={type}
				{...otherProps}
			/>
		);
	},
);

export const ColorInputSlider = React.memo(
	({
		label,
		max = 255,
		min = 0,
		parse,
		prop,
		serialize,
		step = 1,
		type = 'rgb',
		...otherProps
	}) => {
		const {
			changeValues,
			colorValues,
			disableAlpha,
		} = useColorPickerContext();
		const value = colorValues[type]()[prop];
		const setValue = changeValues[type];

		const handleOnChange = React.useCallback(
			(next) => {
				let changeValue = next;
				if (typeof serialize === 'function') {
					changeValue = serialize(changeValue);
				}
				setValue({ [prop]: changeValue });
			},
			[prop, serialize, setValue],
		);

		let parsedValue = value;

		if (typeof parse === 'function') {
			parsedValue = parse(value);
		}

		parsedValue = is.numeric(parsedValue)
			? roundClamp(parsedValue, min, max, step)
			: parsedValue;

		if (prop === 'a' && disableAlpha) return null;

		return (
			<FormGroup horizontal label={label}>
				<Grid>
					<TextInput
						{...otherProps}
						max={max}
						min={min}
						onChange={handleOnChange}
						step={step}
						type="number"
						value={parsedValue}
					/>
					<Slider
						{...otherProps}
						max={max}
						min={min}
						onChange={handleOnChange}
						step={step}
						value={parsedValue}
					/>
				</Grid>
			</FormGroup>
		);
	},
);

export const ColorPickerRGBInputs = React.memo(() => {
	return (
		<VStack>
			<ColorInputSlider label="Red" prop="r" type="rgb" />
			<ColorInputSlider label="Green" prop="g" type="rgb" />
			<ColorInputSlider label="Blue" prop="b" type="rgb" />
			<ColorInputSliderAlpha label="Alpha" type="rgb" />
		</VStack>
	);
});

export const ColorPickerHSLInputs = React.memo(() => {
	const parse = React.useCallback((next) => {
		return interpolate(next, [0, 1], [0, 100]);
	}, []);

	const serialize = React.useCallback((next) => {
		return interpolate(next, [100, 0], [1, 0]);
	}, []);

	const degrees = (
		<Text className={styles.suffixText} isBlock variant="muted">
			°
		</Text>
	);
	const percentage = (
		<Text className={styles.suffixText} isBlock variant="muted">
			%
		</Text>
	);

	return (
		<VStack>
			<ColorInputSlider
				label="Hue"
				max={360}
				min={0}
				prop="h"
				step={1}
				suffix={degrees}
				type="hsl"
			/>
			<ColorInputSlider
				label="Saturation"
				max={100}
				min={0}
				parse={parse}
				prop="s"
				serialize={serialize}
				suffix={percentage}
				type="hsl"
			/>
			<ColorInputSlider
				label="Luminance"
				max={100}
				min={0}
				parse={parse}
				prop="l"
				serialize={serialize}
				suffix={percentage}
				type="hsl"
			/>
			<ColorInputSliderAlpha label="Alpha" type="hsl" />
		</VStack>
	);
});

export const ColorPickerHexInputs = React.memo(() => {
	return (
		<VStack>
			<ColorInputHex />
		</VStack>
	);
});

export const ColorPickerInputs = React.memo(() => {
	const { inputType } = useColorPickerContext();

	switch (inputType) {
		case 'hex':
			return <ColorPickerHexInputs />;
		case 'rgb':
			return <ColorPickerRGBInputs />;
		case 'hsl':
			return <ColorPickerHSLInputs />;
		default:
			return null;
	}
});
