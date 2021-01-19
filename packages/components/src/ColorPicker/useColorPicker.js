import { useContextSystem } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import { noop } from 'lodash';
import { useCallback, useState } from 'react';

/**
 * @typedef {('hex'|'rgb'|'hsl')} InputType
 */

/**
 * @typedef ColorValues
 * @property {string} hex
 * @property {string} hsl
 * @property {string} rgb
 */

/**
 * @typedef ChangeValues
 * @property {(color: string) => void} hex
 * @property {(color: string) => void} hsl
 * @property {(color: string) => void} rgb
 */

/**
 * @typedef ColorPickerStore
 * @property {ChangeValues} changeValues
 * @property {string} color
 * @property {string} colorRgb
 * @property {ColorValues} colorValues
 * @property {boolean} disableAlpha
 * @property {InputType} inputType
 * @property {() => void} increment
 * @property {() => void} decrement
 * @property {(color: string) => void} onChange
 * @property {(inputType: InputType) => void} setInputType
 * @property {boolean} showPreview
 */

/**
 * Retrieves the color using the primary color translation format.
 *
 * @param {string} color color to transform.
 * @returns {string} The color.
 */
function getColor(color) {
	return ui.color(color).toRgbString();
}

/**
 * Retrieves the color value for a particular inputType.
 * @param {string} color
 * @param {InputType} inputType
 * @return {string | undefined} The formatted color value.
 */
const getColorValue = (color, inputType) => {
	let colorValue = color;

	switch (inputType) {
		case 'hex':
			colorValue = ui.color(color).toHexString();
			break;
		case 'rgb':
			colorValue = ui.color(color).toRgbString();
			break;
		case 'hsl':
			colorValue = ui.color(color).toHslString();
			break;
		default:
			break;
	}

	return colorValue;
};

/**
 * @typedef ColorPickerProps
 * @property {number} alpha
 * @property {string} color
 * @property {boolean} disableAlpha
 * @property {InputType} format
 * @property {InputType} inputType
 * @property {(color: string, data: object) => void} onChange
 * @property {boolean} showPreview
 * @property {number|string} width
 */

/**
 * @param {import('@wp-g2/create-styles').ViewOwnProps<ColorPickerProps, 'div'>} props
 */
export function useColorPicker(props) {
	const {
		// @todo: Add support to interpret initial alpha + color.
		alpha,
		color,
		disableAlpha = true,
		format = 'rgb',
		inputType: initialInputType = 'hex',
		onChange = noop,
		showPreview = true,
		width = '100%',
		...otherProps
	} = useContextSystem(props, 'ColorPicker');

	const [inputType, setInputType] = useState(initialInputType);

	const handleOnChange = useCallback(
		(next) => {
			let result = ui.color(next).toHexString();
			let data = result;

			switch (format) {
				case 'rgb':
					result = ui.color(next).toRgbString();
					data = ui.color(next).toRgb();
					break;
				case 'hsl':
					result = ui.color(next).toHslString();
					data = ui.color(next).toHsl();
					break;
				case 'hex':
					result = ui.color(next).toHexString();
					break;
				default:
					break;
			}

			onChange(result, data);
		},
		[format, onChange],
	);

	const colorValues = {
		rgb: () => ui.color(color).toRgb(),
		hex: () => ui.color(color).toHex(),
		hsl: () => ui.color(color).toHsl(),
	};

	const changeValues = {
		rgb: (next) => {
			let nextState = { ...colorValues.rgb(), ...next };
			nextState = getColor(nextState);
			handleOnChange(nextState);
		},
		hex: (next) => {
			const nextState = getColor(next);
			handleOnChange(nextState);
		},
		hsl: (next) => {
			let nextState = { ...colorValues.hsl(), ...next };
			nextState = getColor(nextState);
			handleOnChange(nextState);
		},
	};

	const increment = () => {
		const { b, g, r } = colorValues.rgb(color);
		const next = { r, g, b };

		switch (true) {
			case b < 255:
				next.b = b + 1;
				break;
			case g < 255:
				next.g = g + 1;
				break;
			case r < 255:
				next.r = r + 1;
				break;
			default:
				break;
		}
		return changeValues.rgb(next);
	};

	const decrement = () => {
		const { b, g, r } = colorValues.rgb(color);
		const next = { r, g, b };

		switch (true) {
			case b > 0:
				next.b = b - 1;
				break;
			case g > 0:
				next.g = g - 1;
				break;
			case r > 0:
				next.r = r - 1;
				break;
			default:
				break;
		}
		return changeValues.rgb(next);
	};

	return {
		...otherProps,
		width,
		store: {
			changeValues,
			color: getColor(color),
			colorRgb: ui.color(color).toRgb(),
			colorValue: getColorValue(color, inputType),
			colorValues,
			decrement,
			disableAlpha,
			increment,
			inputType,
			onChange: handleOnChange,
			setInputType,
			showPreview,
		},
	};
}
