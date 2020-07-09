import colorize from 'tinycolor2';
export { default as colorize } from 'tinycolor2';

export function rgba(hexValue = '', alpha = 1) {
	const { b, g, r } = colorize(hexValue).toRgb();
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
