import _, { upperFirst } from 'lodash';

import { get } from '../core';
import { css } from '../style-system';
import { SUPPORTED_COLORS } from '../theme';
import { colorBlindMode } from './color-blind-mode';

/**
 * @param {any} color
 * @return {asserts color is import('../theme').SupportedColors}
 */
function assertIsSupportedColor(color) {
	if (!SUPPORTED_COLORS.includes(color)) {
		throw new Error(
			`'color' must be one of the supported colors: ${SUPPORTED_COLORS.join(
				', ',
			)}`,
		);
	}
}

/**
 *
 * @param {import('../theme').SupportedColors} color
 * @param {{ isBold?: boolean, isSubtle?: boolean }} options
 */
export function getBackgroundColor(color, options = {}) {
	assertIsSupportedColor(color);

	const { isBold, isSubtle } = options;

	const baseBackground = isBold
		? `${color}Rgba70`
		: isSubtle
		? `${color}Rgba10`
		: `${color}Rgba20`;

	const colorBlindShade = isBold ? `Rgba20` : `Rgba10`;
	let colorBlindColor;

	const baseColor = css({
		// @ts-ignore Generated string passed to `get`
		background: get(baseBackground),
	});

	if (color === 'green') {
		colorBlindColor = css({
			backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, ${get(
				`colorBackgroundGreen`,
			)} 10px, ${get(`colorBackgroundGreen`)} 20px)`,
		});
	}

	if (color === 'red') {
		colorBlindColor = css({
			backgroundImage: `linear-gradient(45deg, ${
				// @ts-ignore Generated string passed to `get`
				get(`red${colorBlindShade}`)
			} 25%, transparent 25%, transparent 75%, ${
				// @ts-ignore Generated string passed to `get`
				get(`red${colorBlindShade}`)
			} 75%, ${
				// @ts-ignore Generated string passed to `get`
				get(`red${colorBlindShade}`)
			}),
            linear-gradient(-45deg, ${
				// @ts-ignore Generated string passed to `get`
				get(`red${colorBlindShade}`)
			} 25%, transparent 25%, transparent 75%, ${
				// @ts-ignore Generated string passed to `get`
				get(`red${colorBlindShade}`)
			} 75%, ${
				// @ts-ignore Generated string passed to `get`
				get(`red${colorBlindShade}`)
			})`,
			backgroundSize: '10px 10px',
		});
	}

	if (color === 'yellow') {
		colorBlindColor = css({
			backgroundImage: `linear-gradient(45deg, ${
				// @ts-ignore Generated string passed to `get`
				get(`yellow${colorBlindShade}`)
			} 25%, transparent 25%, transparent 75%, ${
				// @ts-ignore Generated string passed to `get`
				get(`yellow${colorBlindShade}`)
			} 75%, ${
				// @ts-ignore Generated string passed to `get`
				get(`yellow${colorBlindShade}`)
			}),
            linear-gradient(-45deg, ${
				// @ts-ignore Generated string passed to `get`
				get(`yellow${colorBlindShade}`)
			} 25%, transparent 25%, transparent 75%, ${
				// @ts-ignore Generated string passed to `get`
				get(`yellow${colorBlindShade}`)
			} 75%, ${
				// @ts-ignore Generated string passed to `get`
				get(`yellow${colorBlindShade}`)
			})`,
			backgroundSize: '10px 10px',
		});
	}

	return css`
		${baseColor};
		${colorBlindMode`${colorBlindColor}`};
	`;
}

export function getBackgroundColorText(color, options = {}) {
	assertIsSupportedColor(color);

	const { isBold } = options;

	const value = isBold
		? get('white')
		: // @ts-ignore Generated string passed to `get`
		  get(`colorBackground${upperFirst(color)}Text`);

	return css`
		color: ${value};
	`;
}
