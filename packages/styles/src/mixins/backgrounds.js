import { upperFirst } from '@wp-g2/utils';

import { css } from '../style-system';
import { get } from '../system';
import { colorBlindMode } from './colorBlindMode';

const SUPPORTED_COLORS = ['blue', 'red', 'purple', 'green', 'yellow', 'orange'];

export function getBackgroundColor(color) {
	if (!SUPPORTED_COLORS.includes(color)) return '';

	const baseColor = css({
		background: get(`colorBackground${upperFirst(color)}`),
	});
	const colorBlindShade = `Rgba10`;
	let colorBlindColor;

	if (color === 'green') {
		colorBlindColor = css({
			backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, ${get(
				`colorBackgroundGreen`,
			)} 10px, ${get(`colorBackgroundGreen`)} 20px)`,
		});
	}

	if (color === 'red') {
		colorBlindColor = css({
			backgroundImage: `linear-gradient(45deg, ${get(
				`red${colorBlindShade}`,
			)} 25%, transparent 25%, transparent 75%, ${get(
				`red${colorBlindShade}`,
			)} 75%, ${get(`red${colorBlindShade}`)}),
            linear-gradient(-45deg, ${get(
				`red${colorBlindShade}`,
			)} 25%, transparent 25%, transparent 75%, ${get(
				`red${colorBlindShade}`,
			)} 75%, ${get(`red${colorBlindShade}`)})`,
			backgroundSize: '10px 10px',
		});
	}

	if (color === 'yellow') {
		colorBlindColor = css({
			backgroundImage: `linear-gradient(45deg, ${get(
				`yellow${colorBlindShade}`,
			)} 25%, transparent 25%, transparent 75%, ${get(
				`yellow${colorBlindShade}`,
			)} 75%, ${get(`yellow${colorBlindShade}`)}),
            linear-gradient(-45deg, ${get(
				`yellow${colorBlindShade}`,
			)} 25%, transparent 25%, transparent 75%, ${get(
				`yellow${colorBlindShade}`,
			)} 75%, ${get(`yellow${colorBlindShade}`)})`,
			backgroundSize: '10px 10px',
		});
	}

	return css`
		${baseColor};
		${colorBlindMode(colorBlindColor)};
	`;
}
