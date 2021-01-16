import { useContextSystem } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import { noop } from 'lodash';
import { useCallback, useState } from 'react';

export function getColor(color) {
	return ui.color(color).toRgbString();
}

/**
 * @param {State} state
 * @return {string}
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

export function useColorPicker(props) {
	const {
		// @todo: Add support to interpret initial alpha + color.
		alpha,
		color,
		disableAlpha = true,
		inputType: initialInputType = 'hex',
		onChange = noop,
		showPreview = true,
		width = '100%',
		...otherProps
	} = useContextSystem(props, 'ColorPicker');

	const [inputType, setInputType] = useState(initialInputType);

	const handleOnChange = useCallback(
		(next) => {
			onChange(next);
		},
		[onChange],
	);

	const colorValues = {
		rgb: () => ui.color(color).toRgb(),
		hex: () => ui.color(color).toHex(),
		hsl: () => ui.color(color).toHsl(),
	};

	const changeValues = {
		rgb: (next) => {
			let nextState = { ...colorValues.rgb(), ...next };
			nextState = getColor(nextState, disableAlpha);
			handleOnChange(nextState);
		},
		hex: (next) => {
			const nextState = getColor(next, disableAlpha);
			handleOnChange(nextState);
		},
		hsl: (next) => {
			let nextState = { ...colorValues.hsl(), ...next };
			nextState = getColor(nextState, disableAlpha);
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
			color: getColor(color),
			colorValue: getColorValue(color, inputType),
			disableAlpha,
			inputType,
			increment,
			decrement,
			onChange: handleOnChange,
			setInputType,
			showPreview,
			colorValues,
			changeValues,
		},
	};
}
