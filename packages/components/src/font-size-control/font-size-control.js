import { __ } from '@wordpress/i18n';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { is } from '@wp-g2/utils';
import React from 'react';

import { Button } from '../Button';
import { ControlLabel } from '../ControlLabel';
import { FormGroup } from '../FormGroup';
import { Grid } from '../Grid';
import { SelectDropdown } from '../select-dropdown';
import { Slider } from '../Slider';
import { TextInput } from '../TextInput';
import { View } from '../View';
import { VisuallyHidden } from '../VisuallyHidden';
import { VStack } from '../VStack';
import * as styles from './font-size-control-styles';

const DEFAULT_FONT_SIZE = 'default';
const CUSTOM_FONT_SIZE = 'custom';
const MAX_FONT_SIZE_DISPLAY = '25px';

function getSelectValueFromFontSize(fontSizes, value) {
	if (value) {
		const fontSizeValue = fontSizes.find((font) => font.size === value);
		return fontSizeValue ? fontSizeValue.slug : CUSTOM_FONT_SIZE;
	}
	return DEFAULT_FONT_SIZE;
}

function getSelectOptions(optionsArray, disableCustomFontSizes) {
	if (disableCustomFontSizes && !optionsArray.length) {
		return null;
	}
	optionsArray = [
		{ slug: DEFAULT_FONT_SIZE, name: __('Default'), size: undefined },
		...optionsArray,
		...(disableCustomFontSizes
			? []
			: [{ slug: CUSTOM_FONT_SIZE, name: __('Custom') }]),
	];
	return optionsArray.map((option) => ({
		key: option.slug,
		name: option.name,
		size: option.size,
		style: {
			fontSize: `min( ${option.size}, ${MAX_FONT_SIZE_DISPLAY} )`,
		},
	}));
}

function FontSizeControl(props, forwardedRef) {
	const {
		customLabel = __('Custom'),
		disableCustomFontSizes,
		onChange,
		label = __('Font size'),
		fontSizes = [],
		value,
		withSlider,
		...otherProps
	} = useContextSystem(props);

	const hasUnits =
		is.string(value) || (fontSizes[0] && is.string(fontSizes[0].size));

	let noUnitsValue;
	if (!hasUnits) {
		noUnitsValue = value;
	} else {
		noUnitsValue = parseInt(value);
	}

	const isPixelValue =
		is.number(value) || (is.string(value) && value.endsWith('px'));

	const options = React.useMemo(
		() => getSelectOptions(fontSizes, disableCustomFontSizes),
		[fontSizes, disableCustomFontSizes],
	);

	if (!options) {
		return null;
	}

	const selectedFontSizeSlug = getSelectValueFromFontSize(fontSizes, value);

	const showSelectDropdown = fontSizes.length > 0;
	const showNumberInput = !withSlider && !disableCustomFontSizes;

	const handleOnInputChange = (next) => {
		if (!next && next !== 0) {
			onChange(undefined);
			return;
		}
		if (hasUnits) {
			onChange(next + 'px');
		} else {
			onChange(Number(next));
		}
	};

	const templateColumns = showNumberInput
		? 'minmax(0, 1fr) 1fr'
		: 'minmax(0, 2fr) 1fr';
	const subControlsTemplateColumns = showNumberInput ? '1fr 1fr' : '1fr';

	return (
		<View as="fieldset" className={styles.FontSizeControl}>
			<VisuallyHidden as="legend">{label}</VisuallyHidden>
			<VStack spacing={3}>
				<Grid alignment="bottom" templateColumns={templateColumns}>
					{showSelectDropdown && (
						<FormGroup label={label}>
							<SelectDropdown
								onChange={({ selectedItem }) => {
									if (hasUnits) {
										onChange(selectedItem.size);
									} else {
										if (is.defined(selectedItem.size)) {
											onChange(Number(selectedItem.size));
										} else {
											onChange(undefined);
										}
									}
								}}
								options={options}
								ref={forwardedRef}
								value={options.find(
									(option) =>
										option.key === selectedFontSizeSlug,
								)}
							/>
						</FormGroup>
					)}
					<Grid
						alignment="bottom"
						templateColumns={subControlsTemplateColumns}
					>
						{showNumberInput && (
							<FormGroup label={customLabel}>
								<TextInput
									min={1}
									onChange={handleOnInputChange}
									type="number"
									value={(isPixelValue && noUnitsValue) || ''}
								/>
							</FormGroup>
						)}
						<View>
							<Button
								disabled={value === undefined}
								isBlock
								onClick={() => {
									onChange(undefined);
								}}
							>
								{__('Reset')}
							</Button>
						</View>
					</Grid>
				</Grid>
				{withSlider && (
					<VStack spacing={0}>
						<ControlLabel>Custom Size</ControlLabel>
						<Grid templateColumns="2fr 1fr">
							<Slider
								onChange={handleOnInputChange}
								value={(isPixelValue && noUnitsValue) || ''}
							/>
							<TextInput
								onChange={handleOnInputChange}
								type="number"
								value={(isPixelValue && noUnitsValue) || ''}
							/>
						</Grid>
					</VStack>
				)}
			</VStack>
		</View>
	);
}

export default contextConnect(FontSizeControl, 'FontSizeControl');
